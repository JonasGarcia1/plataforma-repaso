import type { Progress, StudyStatus, Question } from '../types';
export const STORAGE_KEY = 'repaso-java-progress-v1';
export const AWS_QUIZ_REVISION = 2;
export const statusLabels: Record<StudyStatus,string> = { pendiente:'Pendiente', 'en-curso':'En curso', repasado:'Repasado', reforzar:'Necesito reforzar' };
export const emptyProgress = (): Progress => ({ version:1, awsQuizRevision:AWS_QUIZ_REVISION, statuses:{}, favorites:[], quizResults:{}, interviewResults:{} });
export const normalize = (value:string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').trim();
export function matches(query:string, ...values:string[]) {
 const text=normalize(values.join(' '));
 return normalize(query).split(/\s+/).every(word=>text.includes(word));
}
const record = (value: unknown): value is Record<string,unknown> => typeof value==='object' && value!==null && !Array.isArray(value);
const validId = (value:string) => /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}$/.test(value) && !['__proto__','constructor','prototype'].includes(value);
export function parseProgress(text:string):Progress {
 if(text.length>2_000_000) throw new Error('El archivo es demasiado grande (máximo 2 MB).');
 let input:unknown;
 try { input=JSON.parse(text); } catch { throw new Error('El archivo no contiene JSON válido.'); }
 if(!record(input) || input.version!==1 || !record(input.statuses) || !Array.isArray(input.favorites) || !record(input.quizResults) || !record(input.interviewResults)) throw new Error('El archivo no tiene el formato de progreso de Repaso (versión 1).');
 const statuses:Record<string,StudyStatus>={};
 for(const [key,value] of Object.entries(input.statuses)) {
  if(!validId(key) || typeof value!=='string' || !Object.keys(statusLabels).includes(value)) throw new Error('El archivo contiene un estado de estudio inválido.');
  statuses[key]=value as StudyStatus;
 }
 if(!input.favorites.every(v=>typeof v==='string' && validId(v))) throw new Error('La lista de favoritos no es válida.');
 const quizResults:Record<string,number>={};
 for(const [key,value] of Object.entries(input.quizResults)) {
  if(!validId(key) || typeof value!=='number' || !Number.isInteger(value) || value<0 || value>20) throw new Error('Hay una respuesta de quiz inválida.');
  quizResults[key]=value;
 }
 const interviewResults:Progress['interviewResults']={};
 for(const [key,value] of Object.entries(input.interviewResults)) {
  if(!validId(key) || (value!=='bien' && value!=='repasar')) throw new Error('Hay una autoevaluación inválida.');
  interviewResults[key]=value;
 }
 if(input.lastLesson!==undefined && (typeof input.lastLesson!=='string' || !validId(input.lastLesson))) throw new Error('La última lección no es válida.');
 const savedAwsQuizRevision=typeof input.awsQuizRevision==='number'&&Number.isInteger(input.awsQuizRevision)?input.awsQuizRevision:1;
 const currentQuizResults=savedAwsQuizRevision<AWS_QUIZ_REVISION?Object.fromEntries(Object.entries(quizResults).filter(([id])=>!id.startsWith('aws-quiz-'))):quizResults;
 return {version:1,awsQuizRevision:AWS_QUIZ_REVISION,statuses,favorites:[...new Set(input.favorites as string[])],quizResults:currentQuizResults,interviewResults,lastLesson:input.lastLesson as string|undefined};
}
export function readProgress(storage:Pick<Storage,'getItem'>):{progress:Progress;warning:string;migrated:boolean} {
 try {
  const data=storage.getItem(STORAGE_KEY);
  if(!data)return {progress:emptyProgress(),warning:'',migrated:false};
  const oldValue=JSON.parse(data) as {awsQuizRevision?:unknown};
  const progress=parseProgress(data);
  return {progress,warning:'',migrated:oldValue.awsQuizRevision!==AWS_QUIZ_REVISION};
 }
 catch { return {progress:emptyProgress(),warning:'No pudimos recuperar el progreso guardado. Podés seguir estudiando o importar una copia. El dato anterior no se reemplaza hasta que hagas un cambio.',migrated:false}; }
}
export function sampleUnique<T extends {id:string}>(items:T[], count:number, random= Math.random):T[] {
 const pool=[...new Map(items.map(item=>[item.id,item])).values()];
 for(let i=pool.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
 return pool.slice(0,Math.max(0,count));
}
export function filterQuestions(items:Question[],query:string,unitId:string,level:string,favorites?:string[]) {
 return items.filter(q=>(!unitId || q.unitId===Number(unitId)) && (!level || q.level===level) && (!favorites || favorites.includes(q.id)) && matches(query,q.prompt,q.shortAnswer,...q.keyPoints));
}
export interface MarkdownSection { title:string; body:string }
export function splitSections(markdown:string):MarkdownSection[] {
 const sections:MarkdownSection[]=[]; let current:MarkdownSection={title:'Introducción',body:''}; let fenced=false;
 for(const line of markdown.split('\n')) {
  if(/^\s*```/.test(line)) fenced=!fenced;
  if(!fenced && /^## /.test(line)) { if(current.body.trim()) sections.push(current); current={title:line.slice(3).trim(),body:''}; }
  else current.body+=line+'\n';
 }
 if(current.body.trim()) sections.push(current);
 return sections;
}
