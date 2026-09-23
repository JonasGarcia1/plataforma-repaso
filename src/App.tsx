import { useEffect, useState, type FormEvent } from 'react';
import { NavLink, Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Compass, Download, GraduationCap, LayoutDashboard, Menu, MessageCircle, Search, X, Zap, Cloud, Braces } from 'lucide-react';
import { Home } from './pages/Home';
import { Roadmap } from './pages/Roadmap';
import { LessonPage } from './pages/Lesson';
import { QuestionsPage } from './pages/Questions';
import { PracticePage } from './pages/Practice';
import { ResourcesPage } from './pages/Resources';
import { SearchPage } from './pages/Search';
import { ProgressPage } from './pages/Progress';
import { modules, getModule } from './content/catalog';
import { ProgressBar } from './components/ui';
import { moduleFromPath, modulePath } from './components/module';
import { useProgress } from './lib/progress';
import { ThemeToggle } from './lib/theme';

const nav=[{to:'/',label:'Mi espacio',icon:LayoutDashboard},{to:'/roadmap',label:'Roadmap',icon:Compass},{to:'/preguntas',label:'Preguntas',icon:MessageCircle},{to:'/practica',label:'Zona de práctica',icon:Zap},{to:'/recursos',label:'Recursos y glosario',icon:BookOpen}];
export default function App() {
 const [menu,setMenu]=useState(false);const [query,setQuery]=useState('');const location=useLocation();const navigate=useNavigate();const {progress,warning}=useProgress();const activeModule=moduleFromPath(location.pathname);const module=getModule(activeModule);
 const done=module.lessons.filter(l=>progress.statuses[l.id]==='repasado').length;
 useEffect(()=>{setMenu(false);window.scrollTo({top:0});document.querySelector<HTMLElement>('#main-content')?.focus({preventScroll:true});if(!location.pathname.includes('/leccion/'))document.title=(nav.find(n=>modulePath(activeModule,n.to)===location.pathname)?.label||module.title)+' · Repaso';},[location.pathname,activeModule,module.title]);
 useEffect(()=>{const listener=(event:KeyboardEvent)=>{if((event.ctrlKey||event.metaKey)&&event.key==='k'){event.preventDefault();document.getElementById('global-search')?.focus();}if(event.key==='Escape')setMenu(false);};window.addEventListener('keydown',listener);return()=>window.removeEventListener('keydown',listener);},[]);
 function search(e:FormEvent){e.preventDefault();navigate(`/buscar?q=${encodeURIComponent(query)}`);}
 return <><a className="skip-link" href="#main-content">Saltar al contenido</a>{menu&&<button className="menu-overlay" aria-label="Cerrar menú" onClick={()=>setMenu(false)}/>}
 <aside className={`sidebar ${menu?'open':''}`} aria-label="Navegación principal"><Link to="/" className="brand"><span className="brand-mark">r.</span><span>repaso<span className="brand-dot">.</span></span></Link><button className="close-menu icon-button" onClick={()=>setMenu(false)} aria-label="Cerrar navegación"><X/></button>
 <div className="workspace-label">TU RUTA DE APRENDIZAJE</div><div className="module-list" aria-label="Elegir módulo">{modules.map(m=><Link key={m.id} to={modulePath(m.id,'/')} className={`module-switch ${activeModule===m.id?'active':''}`} aria-current={activeModule===m.id?'page':undefined}><span className="java-icon">{m.id==='aws'?<Cloud size={20}/>:<Braces size={20}/>}</span><span><strong>{m.title}</strong><small>{m.description}</small></span></Link>)}</div>
 <nav>{nav.map(item=><NavLink end={item.to==='/' } key={item.to} to={modulePath(activeModule,item.to)}><item.icon size={19} strokeWidth={1.8}/>{item.label}{item.to==='/roadmap'&&<span className="nav-count">{module.units.length}</span>}</NavLink>)}</nav>
 <div className="sidebar-future"><span className="workspace-label">MÁS ADELANTE</span><div><span>Frontend & React</span><span className="soon">Próximamente</span></div></div>
 <div className="sidebar-bottom"><div className="sidebar-progress"><div><strong>Tu recorrido</strong><span>{Math.round(done/module.lessons.length*100)||0}%</span></div><ProgressBar value={done} total={module.lessons.length}/><small>{done} de {module.lessons.length} lecciones repasadas</small></div><Link to="/progreso" className="manage-progress"><Download size={16}/> Guardar y recuperar progreso <ArrowUpRight size={14}/></Link><div className="local-note"><span/>Tu progreso queda en este navegador</div></div></aside>
 <div className="app-shell" inert={menu}><header className="topbar"><div className="topbar-context"><button className="menu-button icon-button" onClick={()=>setMenu(!menu)} aria-label="Abrir navegación" aria-expanded={menu}><Menu/></button><GraduationCap size={19}/><span>Mi aprendizaje</span><span className="breadcrumb-slash">/</span><strong>{module.title}</strong></div><form className="global-search" onSubmit={search}><Search size={17}/><input id="global-search" aria-label="Buscar en toda la plataforma" placeholder="Buscar un concepto…" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>Ctrl K</kbd></form><span className="profile-avatar" aria-label="Espacio personal">J</span><ThemeToggle/></header>
 <main id="main-content" tabIndex={-1}>{warning&&<div role="status" className="notice warning">{warning} <Link to="/progreso">Gestionar progreso</Link></div>}<Routes><Route path="/" element={<Home/>}/><Route path="/roadmap" element={<Roadmap/>}/><Route path="/leccion/:id" element={<LessonPage/>}/><Route path="/preguntas" element={<QuestionsPage/>}/><Route path="/practica" element={<PracticePage/>}/><Route path="/recursos" element={<ResourcesPage/>}/><Route path="/aws" element={<Home moduleId="aws"/>}/><Route path="/aws/roadmap" element={<Roadmap moduleId="aws"/>}/><Route path="/aws/leccion/:id" element={<LessonPage moduleId="aws"/>}/><Route path="/aws/preguntas" element={<QuestionsPage moduleId="aws"/>}/><Route path="/aws/practica" element={<PracticePage moduleId="aws"/>}/><Route path="/aws/recursos" element={<ResourcesPage moduleId="aws"/>}/><Route path="/buscar" element={<SearchPage/>}/><Route path="/progreso" element={<ProgressPage/>}/><Route path="*" element={<div className="empty-state"><h1>Esta página no está en el recorrido</h1><Link className="button primary" to={modulePath(activeModule,'/roadmap')}>Volver al roadmap</Link></div>}/></Routes></main><footer className="footer"><span>Aprendé. Practicá. Explicalo con tus palabras.</span><span>Hecho para volver a lo importante.</span></footer></div></>;
}
