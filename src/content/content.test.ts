import { describe, it, expect } from 'vitest';
import { lessons as javaLessons, lessonLoaders, questions as javaQuestions, quizzes as javaQuizzes, units as javaUnits, stages as javaStages, loadLesson } from './index';
import { modules, getModule } from './catalog';
import { splitSections } from '../lib/study';

describe('integridad de los módulos publicados',()=>{
 it('conserva el catálogo Java y registra el recorrido AWS',()=>{
  const java=getModule('java');const aws=getModule('aws');
  expect(modules.map(module=>module.id)).toEqual(['java','aws']);
  expect(java.stages).toHaveLength(5);expect(java.units).toHaveLength(26);expect(java.lessons).toHaveLength(94);expect(java.questions).toHaveLength(201);expect(java.quizzes).toHaveLength(264);
  expect(aws.stages).toHaveLength(5);expect(aws.units).toHaveLength(13);expect(aws.lessons).toHaveLength(41);expect(aws.questions).toHaveLength(84);expect(aws.quizzes).toHaveLength(135);
  expect(javaStages).toHaveLength(5);expect(javaUnits).toHaveLength(26);expect(javaLessons).toHaveLength(94);expect(javaQuestions).toHaveLength(201);expect(javaQuizzes).toHaveLength(264);
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
   for(const unit of module.units)expect(module.quizzes.filter(item=>item.unitId===unit.id).length,`unidad ${unit.id}`).toBeGreaterThanOrEqual(10);
  }
 });

 it('incluye una lección pedagógica, práctica y cargable por cada entrada',async()=>{
  for(const module of modules)for(const lesson of module.lessons){
   const text=await loadLesson(lesson.id);const headings=splitSections(text).map(section=>section.title);
   for(const title of ['Concepto','Ejemplo','En entrevista','Error frecuente','Práctica','Profundización'])expect(headings,`${lesson.id}: ${title}`).toContain(title);
   const interview=splitSections(text).find(section=>section.title==='En entrevista')?.body??'';
   for(const [label,minLength] of [['Pregunta',12],['Breve',25],['Ampliada',50]] as const){
    const value=interview.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\s*\\*\\*(?:Pregunta|Breve|Ampliada):\\*\\*|$)`))?.[1]?.trim()??'';
    expect(value.length,`${lesson.id}: ${label} de entrevista`).toBeGreaterThanOrEqual(minLength);
   }
   expect(text).toContain('### Pista');expect(text).toContain('### Solución');expect(text.split(/\s+/).length).toBeGreaterThan(230);
   expect((text.match(/^```/gm)||[]).length%2).toBe(0);
   expect(lesson.objectives.length).toBeGreaterThan(0);expect(lesson.resources.length).toBeGreaterThan(0);
   for(const resource of lesson.resources)expect(new URL(resource.url).protocol).toBe('https:');
  }
 });

 it('incluye preguntas de entrevista específicas y sin duplicados en las 135 lecciones',async()=>{
  const lessons=modules.flatMap(module=>module.lessons);
  const prompts:string[]=[];const briefs:string[]=[];const extendedAnswers:string[]=[];
  for(const lesson of lessons){
   const text=await loadLesson(lesson.id);
   const interview=splitSections(text).find(section=>section.title==='En entrevista')?.body??'';
   const prompt=interview.match(/\*\*Pregunta:\*\*\s*([\s\S]*?)(?=\n\s*\*\*Breve:\*\*|$)/)?.[1]?.trim()??'';
   const brief=interview.match(/\*\*Breve:\*\*\s*([\s\S]*?)(?=\n\s*\*\*Ampliada:\*\*|$)/)?.[1]?.trim()??'';
   const extended=interview.match(/\*\*Ampliada:\*\*\s*([\s\S]*)$/)?.[1]?.trim()??'';
   prompts.push(prompt);
   briefs.push(brief);extendedAnswers.push(extended);
   expect(prompt,`${lesson.id}: pregunta específica`).not.toMatch(/^(?:Pregunta|Completar|Responder|Explicar)\.?$/i);
   expect(interview,`${lesson.id}: campos de entrevista`).toContain('**Breve:**');
   expect(interview,`${lesson.id}: campos de entrevista`).toContain('**Ampliada:**');
  }
  expect(lessons).toHaveLength(135);
  expect(new Set(prompts).size).toBe(lessons.length);
  expect(new Set(briefs).size).toBe(lessons.length);
  expect(new Set(extendedAnswers).size).toBe(lessons.length);
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
  expect(javaLessons.filter(lesson=>lesson.id.startsWith('kafka-'))).toHaveLength(27);
  for(const id of ['kafka-overview','kafka-core-concepts','kafka-install-kafka','kafka-create-spring','kafka-real-world','kafka-save-wikimedia'])
   expect(javaLessons.some(lesson=>lesson.id===id),id).toBe(true);
 });
 it('ordena los conceptos Kafka antes del entorno y conserva los IDs existentes',()=>{
  const kafkaUnits=javaUnits.filter(unit=>unit.level===javaStages[4].name);
  expect(kafkaUnits.map(unit=>unit.id)).toEqual([17,39,25,18,19,20]);
  const lessonUnits=javaLessons.filter(lesson=>kafkaUnits.some(unit=>unit.id===lesson.unitId)).map(lesson=>lesson.unitId);
  expect([...new Set(lessonUnits)]).toEqual([17,39,25,18,19,20]);
  expect(javaLessons.find(lesson=>lesson.id==='kafka-install-kafka')?.unitId).toBe(18);
  expect(javaLessons.find(lesson=>lesson.id==='kafka-create-spring')?.unitId).toBe(18);
  expect(javaLessons.find(lesson=>lesson.id==='u25-c')?.unitId).toBe(25);
  expect(javaQuizzes.filter(quiz=>quiz.unitId===17)).toHaveLength(10);
  expect(javaQuizzes.filter(quiz=>quiz.unitId===39)).toHaveLength(10);
  for(const lesson of javaLessons.filter(item=>[17,39,25].includes(item.unitId))){
   const position=javaLessons.findIndex(item=>item.id===lesson.id);
   for(const prerequisite of lesson.prerequisites){
    const earlier=javaLessons.findIndex(item=>item.id===prerequisite);
    if(earlier>=0)expect(earlier,`${lesson.id} requiere una lección posterior`).toBeLessThan(position);
   }
  }
 });
});
