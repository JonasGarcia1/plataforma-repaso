// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { ProgressProvider } from '../lib/progress';
import { ThemeProvider } from '../lib/theme';
import { STORAGE_KEY } from '../lib/study';

function open(path:string) {
 return render(<ThemeProvider><MemoryRouter initialEntries={[path]}><ProgressProvider><App/></ProgressProvider></MemoryRouter></ThemeProvider>);
}
beforeEach(()=>{localStorage.clear();vi.spyOn(window,'scrollTo').mockImplementation(()=>{});});
afterEach(()=>{cleanup();vi.restoreAllMocks();});

describe('módulo AWS & Cloud',()=>{
 it('permite cambiar de Java a AWS desde la navegación y muestra sus unidades',()=>{
  open('/');
  fireEvent.click(screen.getByRole('link',{name:/AWS & Cloud/}));
  expect(screen.getByText('Roadmap AWS & Cloud')).toBeInTheDocument();
  expect(screen.getByRole('link',{name:/Qué es AWS y cómo funciona la nube/})).toHaveAttribute('href','/aws/leccion/aws-u26-l1');
  expect(screen.queryByText('Roadmap Java')).not.toBeInTheDocument();
 });

 it('carga una ruta de lección directa y conserva navegación dentro de AWS',async()=>{
  open('/aws/leccion/aws-u26-l1');
  expect(await screen.findByRole('heading',{name:'Qué es AWS y cómo funciona la nube',level:1})).toBeInTheDocument();
  await screen.findByRole('heading',{name:'Concepto',level:2});
  expect(screen.getByRole('link',{name:/SIGUIENTE/})).toHaveAttribute('href','/aws/leccion/aws-u26-l2');
  expect(screen.queryByRole('link',{name:/ANTERIOR/})).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Estado de esta lección'),{target:{value:'repasado'}});
  await waitFor(()=>expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).statuses['aws-u26-l1']).toBe('repasado'));
 });

 it('mantiene las preguntas y el quiz limitados a la unidad AWS elegida',()=>{
  open('/aws/preguntas?unidad=26');
  expect(screen.getByText('6 preguntas encontradas')).toBeInTheDocument();
  expect(screen.getAllByRole('button',{name:'Guardar en favoritos'})).toHaveLength(6);
  cleanup();
  open('/aws/practica');
  fireEvent.change(screen.getByLabelText('¿Qué querés practicar?'),{target:{value:'26'}});
  expect(screen.getByText('10 preguntas sin repetir')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Empezar quiz/}));
  expect(screen.getByText('Nube y arquitectura global')).toBeInTheDocument();
 });

 it('busca entre módulos y muestra el origen de cada resultado',()=>{
  open('/buscar?q=nube');
  expect(screen.getAllByText('AWS & Cloud').length).toBeGreaterThan(0);
  fireEvent.change(screen.getByLabelText('Filtrar búsqueda por módulo'),{target:{value:'aws'}});
  expect(screen.getByRole('link',{name:/Qué es AWS y cómo funciona la nube/})).toHaveAttribute('href','/aws/leccion/aws-u26-l1');
 });

 it('presenta progreso Java y AWS por separado',()=>{
  open('/progreso');
  expect(screen.getAllByText('Backend Java').length).toBeGreaterThan(0);
  expect(screen.getAllByText('AWS & Cloud').length).toBeGreaterThan(0);
  expect(screen.getByText('0 de 41 lecciones repasadas')).toBeInTheDocument();
 });

 it('muestra el laboratorio como quinta etapa y abre su primera lección',()=>{
  open('/aws');
  expect(screen.getByText('AWS & Cloud · 5 etapas')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link',{name:/Proyecto AWS con Floci/}));
  expect(screen.getByRole('link',{name:/Abrir .*Floci/})).toHaveAttribute('href','/aws/leccion/aws-u38-l1');
 });
});
