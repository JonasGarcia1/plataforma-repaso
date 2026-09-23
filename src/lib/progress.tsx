import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Progress } from '../types';
import { emptyProgress, readProgress, STORAGE_KEY } from './study';
interface Store { progress:Progress; update:(change:(current:Progress)=>Progress)=>void; warning:string }
const Context=createContext<Store|null>(null);
export function ProgressProvider({children}:{children:ReactNode}) {
 const [initial]=useState(()=>{try{return readProgress(window.localStorage);}catch{return {progress:emptyProgress(),warning:'Tu navegador no permite guardar datos. El progreso durará esta sesión; exportalo para conservarlo.',migrated:false};}});
 const [progress,setProgress]=useState(initial.progress); const [warning,setWarning]=useState(initial.warning); const [dirty,setDirty]=useState(initial.migrated);
 useEffect(()=>{if(!dirty)return; try{localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));setWarning('');}catch{setWarning('No se pudo guardar el progreso en este navegador. Exportá una copia para conservar los cambios.');}},[progress,dirty]);
 function update(change:(current:Progress)=>Progress) { setProgress(change);setDirty(true); }
 return <Context.Provider value={{progress,update,warning}}>{children}</Context.Provider>;
}
export function useProgress() { const store=useContext(Context);if(!store)throw new Error('Falta ProgressProvider');return store; }
