import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { modules } from '../content/catalog';
import type { ModuleId } from '../types';
import { matches } from '../lib/study';
import { LessonRow, PageHeading, EmptyState } from '../components/ui';
import { QuestionCard } from './Questions';

export function SearchPage() {
 const [params,setParams]=useSearchParams();const query=params.get('q')||'';const selected=params.get('modulo')||'';const [limit,setLimit]=useState(12);const active=selected?modules.filter(m=>m.id===selected):modules;
 const foundLessons=active.flatMap(m=>m.lessons.filter(l=>matches(query,l.title,l.description,...l.tags,m.units.find(u=>u.id===l.unitId)?.title||'')).map(lesson=>({lesson,moduleId:m.id as ModuleId,moduleTitle:m.title})));const foundQuestions=active.flatMap(m=>m.questions.filter(q=>matches(query,q.prompt,q.shortAnswer)).map(question=>({question,moduleId:m.id as ModuleId,moduleTitle:m.title})));
 function updateParam(key:string,value:string){const next=new URLSearchParams(params);value?next.set(key,value):next.delete(key);setParams(next,{replace:true});}
 return <><PageHeading eyebrow="ENCONTRÁ LA CONEXIÓN" title="Buscar en tu repaso" description="Lecciones, conceptos y preguntas de todos tus módulos."/><label className="search-field search-large"><Search size={20}/><input aria-label="Buscar conceptos y preguntas" value={query} onChange={e=>{updateParam('q',e.target.value);setLimit(12);}} placeholder="Por ejemplo: Optional, inyección, transacciones…"/></label><div className="filter-bar"><label className="field-label">Módulo<select aria-label="Filtrar búsqueda por módulo" value={selected} onChange={e=>updateParam('modulo',e.target.value)}><option value="">Todos los módulos</option>{modules.map(m=><option value={m.id} key={m.id}>{m.title}</option>)}</select></label></div>{!query.trim()?<EmptyState title="¿Qué querés repasar?">Escribí un concepto para buscar en las lecciones y en el banco de preguntas.</EmptyState>:<><div className="section-heading"><h2>Lecciones</h2><span>{foundLessons.length} resultados</span></div><div className="panel search-lessons">{foundLessons.slice(0,limit).map(({lesson,moduleId,moduleTitle})=><div key={lesson.id}><span className="eyebrow">{moduleTitle}</span><LessonRow lesson={lesson} moduleId={moduleId}/></div>)}{!foundLessons.length&&<p>No hay lecciones con esa búsqueda.</p>}</div><div className="section-heading"><h2>Preguntas</h2><span>{foundQuestions.length} resultados</span></div><div className="question-grid">{foundQuestions.slice(0,limit).map(({question,moduleId,moduleTitle})=><div key={question.id}><span className="eyebrow">{moduleTitle}</span><QuestionCard question={question} moduleId={moduleId}/></div>)}</div>{!foundQuestions.length&&<p>No hay preguntas con esa búsqueda.</p>}{Math.max(foundLessons.length,foundQuestions.length)>limit&&<div className="load-more"><button className="button secondary" onClick={()=>setLimit(n=>n+12)}>Mostrar más resultados</button></div>}</>}</>;
}

