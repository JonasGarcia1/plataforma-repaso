import { useEffect, useState, type FormEvent } from 'react';
import { NavLink, Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, BookOpen, ChevronDown, Compass, Download, GraduationCap, LayoutDashboard, Menu, MessageCircle, Search, X, Zap } from 'lucide-react';
import { Home } from './pages/Home';
import { Roadmap } from './pages/Roadmap';
import { LessonPage } from './pages/Lesson';
import { QuestionsPage } from './pages/Questions';
import { PracticePage } from './pages/Practice';
import { ResourcesPage } from './pages/Resources';
import { SearchPage } from './pages/Search';
import { ProgressPage } from './pages/Progress';
import { lessons, units } from './content';
import { ProgressBar } from './components/ui';
import { useProgress } from './lib/progress';
import { ThemeToggle } from './lib/theme';
const nav=[{to:'/',label:'Mi espacio',icon:LayoutDashboard},{to:'/roadmap',label:'Roadmap Java',icon:Compass},{to:'/preguntas',label:'Preguntas',icon:MessageCircle},{to:'/practica',label:'Zona de práctica',icon:Zap},{to:'/recursos',label:'Recursos y glosario',icon:BookOpen}];
export default function App() {
 const [menu,setMenu]=useState(false);const [query,setQuery]=useState('');const location=useLocation();const navigate=useNavigate();const {progress,warning}=useProgress();
 const done=lessons.filter(l=>progress.statuses[l.id]==='repasado').length;
 useEffect(()=>{setMenu(false);window.scrollTo({top:0});document.querySelector<HTMLElement>('#main-content')?.focus({preventScroll:true});if(!location.pathname.startsWith('/leccion/'))document.title=(nav.find(n=>n.to===location.pathname)?.label||'Backend Java')+' · Repaso';},[location.pathname]);
 useEffect(()=>{const listener=(event:KeyboardEvent)=>{if((event.ctrlKey||event.metaKey)&&event.key==='k'){event.preventDefault();document.getElementById('global-search')?.focus();}if(event.key==='Escape')setMenu(false);};window.addEventListener('keydown',listener);return()=>window.removeEventListener('keydown',listener);},[]);
 function search(e:FormEvent){e.preventDefault();navigate(`/buscar?q=${encodeURIComponent(query)}`);}
 return <><a className="skip-link" href="#main-content">Saltar al contenido</a>{menu&&<button className="menu-overlay" aria-label="Cerrar menú" onClick={()=>setMenu(false)}/>}
 <aside className={`sidebar ${menu?'open':''}`} aria-label="Navegación principal"><Link to="/" className="brand"><span className="brand-mark">r.</span><span>repaso<span className="brand-dot">.</span></span></Link><button className="close-menu icon-button" onClick={()=>setMenu(false)} aria-label="Cerrar navegación"><X/></button>
 <div className="workspace-label">TU RUTA DE APRENDIZAJE</div><Link to="/roadmap" className="module-switch"><span className="java-icon"><BracesIcon/></span><span><strong>Backend Java</strong><small>De las bases a la arquitectura</small></span><ChevronDown size={16}/></Link>
 <nav>{nav.map(item=><NavLink end={item.to==='/'} key={item.to} to={item.to}><item.icon size={19} strokeWidth={1.8}/>{item.label}{item.to==='/roadmap'&&<span className="nav-count">{units.length}</span>}</NavLink>)}</nav>
 <div className="sidebar-future"><span className="workspace-label">MÁS ADELANTE</span><div><span>Frontend & React</span><span className="soon">Próximamente</span></div><div><span>AWS & Cloud</span><span className="soon">Próximamente</span></div></div>
 <div className="sidebar-bottom"><div className="sidebar-progress"><div><strong>Tu recorrido</strong><span>{Math.round(done/lessons.length*100)}%</span></div><ProgressBar value={done} total={lessons.length}/><small>{done} de {lessons.length} lecciones repasadas</small></div><Link to="/progreso" className="manage-progress"><Download size={16}/> Guardar y recuperar progreso <ArrowUpRight size={14}/></Link><div className="local-note"><span/>Tu progreso queda en este navegador</div></div></aside>
 <div className="app-shell" inert={menu}><header className="topbar"><div className="topbar-context"><button className="menu-button icon-button" onClick={()=>setMenu(!menu)} aria-label="Abrir navegación" aria-expanded={menu}><Menu/></button><GraduationCap size={19}/><span>Mi aprendizaje</span><span className="breadcrumb-slash">/</span><strong>Backend Java</strong></div><form className="global-search" onSubmit={search}><Search size={17}/><input id="global-search" aria-label="Buscar en toda la plataforma" placeholder="Buscar un concepto…" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>Ctrl K</kbd></form><span className="profile-avatar" aria-label="Espacio personal">J</span><ThemeToggle/></header>
 <main id="main-content" tabIndex={-1}>{warning&&<div role="status" className="notice warning">{warning} <Link to="/progreso">Gestionar progreso</Link></div>}<Routes><Route path="/" element={<Home/>}/><Route path="/roadmap" element={<Roadmap/>}/><Route path="/leccion/:id" element={<LessonPage/>}/><Route path="/preguntas" element={<QuestionsPage/>}/><Route path="/practica" element={<PracticePage/>}/><Route path="/recursos" element={<ResourcesPage/>}/><Route path="/buscar" element={<SearchPage/>}/><Route path="/progreso" element={<ProgressPage/>}/><Route path="*" element={<div className="empty-state"><h1>Esta página no está en el recorrido</h1><Link className="button primary" to="/roadmap">Volver al roadmap</Link></div>}/></Routes></main><footer className="footer"><span>Aprendé. Practicá. Explicalo con tus palabras.</span><span>Hecho para volver a lo importante.</span></footer></div></>;
}
function BracesIcon(){return <span aria-hidden="true">{'{ }'}</span>;}
