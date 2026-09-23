import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { getModule } from '../content/catalog';
import type { ModuleId } from '../types';
import { modulePath } from '../components/module';
import { PageHeading, ProgressBar, UnitIcon, LessonRow, EmptyState } from '../components/ui';
import { matches } from '../lib/study';
import { useProgress } from '../lib/progress';
export function Roadmap({moduleId='java'}:{moduleId?:ModuleId}) {
 const {title,lessons,stages,units}=getModule(moduleId);const path=(to:string)=>modulePath(moduleId,to);
 const [params,setParams]=useSearchParams();const [query,setQuery]=useState('');const [onlyPending,setOnlyPending]=useState(false);const {progress}=useProgress();
 const stage=params.get('etapa');
 const displayed=units.filter(u=>(stage===null||u.level===stages[Number(stage)]?.name)&&lessons.some(l=>l.unitId===u.id&&matches(query,u.title,l.title,...l.tags)&&(!onlyPending||progress.statuses[l.id]!=='repasado'))).sort((left,right)=>left.order-right.order);
 return <><PageHeading eyebrow="EL MAPA COMPLETO" title={`${title}, paso a paso`} description="Empezá por las bases o volvé al concepto que necesitás. Todas las etapas están abiertas."/><div className="stage-tabs" role="group" aria-label="Filtrar por etapa"><button className={stage===null?'active':''} onClick={()=>setParams({})}>Todo el recorrido</button>{stages.map((item,i)=><button key={item.id} className={stage===String(i)?'active':''} onClick={()=>setParams({etapa:String(i)})}>{String(i+1).padStart(2,'0')} · {item.name}</button>)}</div><div className="filter-bar"><label className="search-field"><Search size={18}/><input aria-label="Buscar lecciones del roadmap" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar un tema, por ejemplo: colecciones"/></label><label className="checkbox-label"><input type="checkbox" checked={onlyPending} onChange={e=>setOnlyPending(e.target.checked)}/>Ocultar repasadas</label></div>
 <div className="roadmap-list">{displayed.map(u=>{const group=lessons.filter(l=>l.unitId===u.id);const done=group.filter(l=>progress.statuses[l.id]==='repasado').length;const firstLesson=group[0];return <section className="unit-card" key={u.id}><Link className="unit-heading" to={path(`/leccion/${firstLesson.id}`)} aria-label={`Abrir ${u.title}: ${firstLesson.title}`}><span className={`unit-icon stage-${stages.findIndex(item=>item.name===u.level)}`}><UnitIcon name={u.icon}/></span><div><span className="eyebrow">UNIDAD {String(u.id).padStart(2,'0')} · {u.level}</span><h2>{u.title}</h2><p>{u.description}</p></div><div className="unit-progress"><span>{done} / {group.length} repasadas</span><ProgressBar value={done} total={group.length}/></div></Link><div className="unit-lessons">{group.filter(l=>matches(query,u.title,l.title,...l.tags)&&(!onlyPending||progress.statuses[l.id]!=='repasado')).map((l,i)=><LessonRow lesson={l} index={i} key={l.id} moduleId={moduleId}/>)}</div></section>;})}</div>{!displayed.length&&<EmptyState title="No encontramos lecciones con esos filtros">Probá otra búsqueda o mostrá las lecciones repasadas.</EmptyState>}<p className="footnote">Los niveles organizan la dificultad. La experiencia profesional se construye también resolviendo problemas reales.</p></>;
}

