import { describe, it, expect } from 'vitest';
import { lessons as javaLessons, lessonLoaders, questions as javaQuestions, quizzes as javaQuizzes, units as javaUnits, stages as javaStages, loadLesson } from './index';
import { modules, getModule } from './catalog';
import { splitSections } from '../lib/study';

describe('integridad de los módulos publicados',()=>{
 it('conserva el catálogo Java y registra el recorrido AWS',()=>{
  const java=getModule('java');const aws=getModule('aws');
  expect(modules.map(module=>module.id)).toEqual(['java','aws']);
  expect(java.stages).toHaveLength(5);expect(java.units).toHaveLength(25);expect(java.lessons).toHaveLength(87);expect(java.questions).toHaveLength(195);expect(java.quizzes).toHaveLength(250);
  expect(aws.stages).toHaveLength(5);expect(aws.units).toHaveLength(13);expect(aws.lessons).toHaveLength(41);expect(aws.questions).toHaveLength(65);expect(aws.quizzes).toHaveLength(130);
  expect(javaStages).toHaveLength(5);expect(javaUnits).toHaveLength(25);expect(javaLessons).toHaveLength(87);expect(javaQuestions).toHaveLength(195);expect(javaQuizzes).toHaveLength(250);
  expect(aws.units.map(unit=>unit.id)).toEqual(Array.from({length:13},(_,index)=>index+26));
 });

 it('mantiene identificadores globales únicos y referencias válidas',()=>{
  const allLessons=modules.flatMap(module=>module.lessons);const allQuestions=modules.flatMap(module=>module.questions);const allQuizzes=modules.flatMap(module=>module.quizzes);const allUnits=modules.flatMap(module=>module.units);
  expect(new Set(allUnits.map(unit=>unit.id)).size).toBe(allUnits.length);
  expect(new Set(allLessons.map(lesson=>lesson.id)).size).toBe(allLessons.length);
  expect(new Set(allQuestions.map(question=>question.id)).size).toBe(allQuestions.length);
  expect(new Set(allQuizzes.map(question=>question.id)).size).toBe(allQuizzes.length);
  expect(new Set(allQuestions.map(question=>question.prompt)).size).toBe(allQuestions.length);
  expect(new Set(allQuizzes.map(question=>question.prompt)).size).toBe(allQuizzes.length);
  for(const module of modules){
   for(const item of [...module.questions,...module.quizzes]){
    const lesson=module.lessons.find(candidate=>candidate.id===item.lessonId);
    expect(lesson,item.id).toBeDefined();expect(lesson?.unitId,item.id).toBe(item.unitId);
    expect(module.units.some(unit=>unit.id===item.unitId),item.id).toBe(true);
   }
   for(const lesson of module.lessons){
    expect(module.units.some(unit=>unit.id===lesson.unitId),lesson.id).toBe(true);
    expect(lessonLoaders,lesson.id).toBeDefined();
   }
   for(const question of module.questions){
    expect(question.answer.length).toBeGreaterThan(50);expect(question.keyPoints.length).toBeGreaterThan(0);
    expect(question.level).toBe(module.units.find(unit=>unit.id===question.unitId)?.level);
   }
   for(const unit of module.units)expect(module.quizzes.filter(item=>item.unitId===unit.id),`unidad ${unit.id}`).toHaveLength(10);
  }
 });

 it('incluye una lección pedagógica, práctica y cargable por cada entrada',async()=>{
  for(const module of modules)for(const lesson of module.lessons){
   const text=await loadLesson(lesson.id);const headings=splitSections(text).map(section=>section.title);
   for(const title of ['Concepto','Ejemplo','En entrevista','Error frecuente','Práctica','Profundización'])expect(headings,`${lesson.id}: ${title}`).toContain(title);
   expect(text).toContain('### Pista');expect(text).toContain('### Solución');expect(text.split(/\s+/).length).toBeGreaterThan(230);
   expect((text.match(/^```/gm)||[]).length%2).toBe(0);
   expect(lesson.objectives.length).toBeGreaterThan(0);expect(lesson.resources.length).toBeGreaterThan(0);
   for(const resource of lesson.resources)expect(new URL(resource.url).protocol).toBe('https:');
  }
 });

 it('enseña explícitamente AWS, S3 y mantiene Floci como práctica opcional',async()=>{
  const aws=getModule('aws');
  const intro=await loadLesson('aws-u26-l1');
  const s3=await loadLesson('aws-u29-l1');
  expect(aws.lessons.find(item=>item.id==='aws-u26-l1')?.title).toMatch(/AWS/i);
  expect(intro).toMatch(/Amazon Web Services/);
  expect(intro).toMatch(/computación en la nube/i);
  expect(s3).toMatch(/bucket/i);expect(s3).toMatch(/objeto/i);expect(s3).toMatch(/clave/i);
  for(const lesson of aws.lessons.filter(item=>item.id!=='aws-u37-l2'&&item.unitId!==38)) expect(await loadLesson(lesson.id),lesson.id).not.toMatch(/floci/i);
  expect(aws.lessons.filter(item=>item.unitId===38)).toHaveLength(5);
  expect(aws.questions.filter(item=>item.unitId===38)).toHaveLength(5);
  expect(aws.quizzes.filter(item=>item.unitId===38)).toHaveLength(10);
 });

 it('valida respuestas de quiz con cuatro opciones y explicación por alternativa',()=>{
  for(const question of modules.flatMap(module=>module.quizzes)){
   expect(question.correctIndex).toBeGreaterThanOrEqual(0);expect(question.correctIndex).toBeLessThan(4);expect(question.options).toHaveLength(4);
   for(const option of question.options)expect(option.explanation.length).toBeGreaterThan(20);
  }
 });

 it('mantiene explicaciones de quizzes AWS específicas y no plantillas repetidas',()=>{
  const aws=getModule('aws');
  for(const question of aws.quizzes){
   expect(question.prompt,question.id).not.toMatch(/Una empresa prepara su primera arquitectura cloud|El equipo de plataforma revisa acceso y presupuesto|Una API de pedidos debe estar aislada y atender más tráfico/i);
   for(const option of question.options){
    expect(option.explanation,`${question.id}: ${option.text}`).not.toMatch(/sería pertinente si el caso tratara esa responsabilidad|plantea el escenario|requisito técnico del escenario actual/i);
   }
  }
 });

 it('mantiene cubierto el curso Kafka existente',()=>{
  expect(javaLessons.filter(lesson=>lesson.id.startsWith('kafka-'))).toHaveLength(22);
 });
});
