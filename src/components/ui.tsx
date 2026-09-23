import { lazy, Suspense, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Braces, Check, ChevronRight, Cpu, Database, FileCode2, Globe2, Layers3, Leaf, Network, Puzzle, ShieldCheck, Terminal, TestTube2, Workflow, Blocks, Bookmark, Clock3 } from 'lucide-react';
import type { Lesson, StudyStatus } from '../types';
import type { ModuleId } from '../types';
import { modulePath } from './module';
import { useProgress } from '../lib/progress';
import { statusLabels, splitSections } from '../lib/study';
export const iconMap={terminal:Terminal,braces:Braces,layers:Layers3,network:Network,file:FileCode2,workflow:Workflow,cpu:Cpu,puzzle:Puzzle,globe:Globe2,leaf:Leaf,database:Database,test:TestTube2,blocks:Blocks,shield:ShieldCheck};
export function UnitIcon({name,size=22}:{name:string;size?:number}) { const Icon=iconMap[name as keyof typeof iconMap]||BookOpen;return <Icon size={size} strokeWidth={1.7} aria-hidden="true"/>; }
export function PageHeading({eyebrow,title,description,action}:{eyebrow:string;title:string;description:string;action?:ReactNode}) {return <header className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</header>;}
export function ProgressBar({value,total,label}:{value:number;total:number;label?:string}) {return <div className="progress-track" role="progressbar" aria-label={label||'Lecciones repasadas'} aria-valuemin={0} aria-valuemax={total||1} aria-valuenow={value}><span style={{width:`${total?value/total*100:0}%`}}/></div>;}
export function StatusBadge({status='pendiente'}:{status?:StudyStatus}) {return <span className={`status ${status}`}>{status==='repasado'?<Check size={12}/>:<span/>}{statusLabels[status]}</span>;}
export function Favorite({id}:{id:string}) {const {progress,update}=useProgress();const active=progress.favorites.includes(id);return <button type="button" className={`icon-button favorite ${active?'is-favorite':''}`} aria-label={active?'Quitar de favoritos':'Guardar en favoritos'} aria-pressed={active} onClick={()=>update(p=>({...p,favorites:active?p.favorites.filter(x=>x!==id):[...p.favorites,id]}))}><Bookmark size={18} fill={active?'currentColor':'none'}/></button>;}
export function LessonRow({lesson,index,moduleId}:{lesson:Lesson;index?:number;moduleId?:ModuleId}) {const {progress}=useProgress();const activeModule=moduleId||(lesson.id.startsWith('aws-')?'aws':'java');return <div className="lesson-row"><span className="lesson-number">{index!==undefined?String(index+1).padStart(2,'0'):<BookOpen size={17}/>}</span><Link to={modulePath(activeModule,`/leccion/${lesson.id}`)} className="lesson-row-main"><strong>{lesson.title}</strong><span>{lesson.description}</span></Link><div className="lesson-row-meta"><span className="time"><Clock3 size={13}/>{lesson.minutes} min</span><StatusBadge status={progress.statuses[lesson.id]}/></div><ChevronRight size={17} className="muted"/></div>;}
export function EmptyState({title,children}:{title:string;children:ReactNode}) {return <div className="empty-state"><BookOpen size={30}/><h3>{title}</h3><p>{children}</p></div>;}
const MarkdownContent=lazy(()=>import('./MarkdownContent'));
export function Prose({text}:{text:string}) {return <Suspense fallback={<p className="footnote">Cargando contenido…</p>}><MarkdownContent text={text}/></Suspense>;}
export function PracticeContent({text}:{text:string}) {
 const parts=text.split(/^### (Pista|Solución)\s*$/m);
 return <><Prose text={parts[0]}/>{parts.slice(1).reduce<ReactNode[]>((acc,part,i,arr)=>{if(i%2===0)acc.push(<details className="reveal" key={part}><summary>{part==='Pista'?'Necesito una pista':'Ver solución razonada'}</summary><Prose text={arr[i+1]||''}/></details>);return acc;},[])}</>;
}
export function LessonBody({text}:{text:string}) {return <>{splitSections(text).map((s,i)=><section className={`lesson-section ${s.title==='Error frecuente'?'pitfall':''}`} id={`section-${i}`} key={i}>{s.title==='Profundización'?<details className="advanced"><summary><span><span className="eyebrow">UN PASO MÁS</span><strong>Profundización</strong></span><ChevronRight size={20}/></summary><Prose text={s.body}/></details>:<><h2>{s.title}</h2>{s.title==='Práctica'?<PracticeContent text={s.body}/>:<Prose text={s.body}/>}</>}</section>)}</>;}
export function ExternalLink({href,children}:{href:string;children:ReactNode}) {return <a className="external-link" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16}/></a>;}

