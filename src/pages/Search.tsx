import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { lessons, questions, units } from '../content';
import { matches } from '../lib/study';
import { LessonRow, PageHeading, EmptyState } from '../components/ui';
import { QuestionCard } from './Questions';
export function SearchPage() {
 const [params,setParams]=useSearchParams();const query=params.get('q')||'';const [limit,setLimit]=useState(12);
 const foundLessons=lessons.filter(l=>matches(query,l.title,l.description,...l.tags,units.find(u=>u.id===l.unitId)?.title||''));const foundQuestions=questions.filter(q=>matches(query,q.prompt,q.shortAnswer));
 return <><PageHeading eyebrow="ENCONTRÁ LA CONEXIÓN" title="Buscar en tu repaso" description="Lecciones, conceptos y preguntas en un mismo lugar."/><label className="search-field search-large"><Search size={20}/><input aria-label="Buscar conceptos y preguntas" value={query} onChange={e=>{setParams({q:e.target.value},{replace:true});setLimit(12);}} placeholder="Por ejemplo: Optional, inyección, transacciones…"/></label>{!query.trim()?<EmptyState title="¿Qué querés repasar?">Escribí un concepto para buscar en las lecciones y en el banco de preguntas.</EmptyState>:<><div className="section-heading"><h2>Lecciones</h2><span>{foundLessons.length} resultados</span></div><div className="panel search-lessons">{foundLessons.slice(0,limit).map(l=><LessonRow key={l.id} lesson={l}/>)}{!foundLessons.length&&<p>No hay lecciones con esa búsqueda.</p>}</div><div className="section-heading"><h2>Preguntas</h2><span>{foundQuestions.length} resultados</span></div><div className="question-grid">{foundQuestions.slice(0,limit).map(q=><QuestionCard key={q.id} question={q}/>)}</div>{!foundQuestions.length&&<p>No hay preguntas con esa búsqueda.</p>}{Math.max(foundLessons.length,foundQuestions.length)>limit&&<div className="load-more"><button className="button secondary" onClick={()=>setLimit(n=>n+12)}>Mostrar más resultados</button></div>}</>}</>;
}
