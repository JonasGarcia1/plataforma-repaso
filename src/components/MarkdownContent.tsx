import { useState, type ReactNode } from 'react';
import { Copy } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
export function CodeFrame({children}:{children?:ReactNode}) {const [message,setMessage]=useState('Copiar');return <div className="code-frame"><div className="code-toolbar"><span>Código de la lección</span><button onClick={async e=>{const code=e.currentTarget.closest('.code-frame')?.querySelector('code')?.textContent||'';try{await navigator.clipboard.writeText(code);setMessage('Copiado');}catch{setMessage('Seleccioná y copiá el código');} }}><Copy size={13}/>{message}</button></div><pre>{children}</pre></div>;}
export default function MarkdownContent({text}:{text:string}) {return <div className="prose"><Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={{pre:({children})=><CodeFrame>{children}</CodeFrame>,a:({href,children})=><a href={href} target={href?.startsWith('http')?'_blank':undefined} rel="noreferrer">{children}</a>,table:({children})=><div className="table-scroll"><table>{children}</table></div>}}>{text}</Markdown></div>;}
