import type { ModuleDefinition, ModuleId } from '../types';
import { units as javaUnits, levels as javaLevels, stages as javaStages } from './units';
import { lessons as javaLessons } from './index';
import { questions as javaQuestions } from './questions';
import { quizzes as javaQuizzes } from './quizzes';
import { glossary as javaGlossary, cheatSheets as javaCheatSheets, labs as javaLabs } from './resources';
import { awsStages, awsUnits } from './aws/units';
import { awsLessons } from './aws/lessons';
import { awsQuestions } from './aws/questions';
import { awsQuizzes } from './aws/quizzes';
import { awsGlossary, awsLabs } from './aws/resources';

export const modules: ModuleDefinition[] = [
 {id:'java',title:'Backend Java',description:'De los fundamentos del lenguaje a APIs, arquitectura y mensajería.',levels:javaLevels,stages:javaStages,units:javaUnits,lessons:javaLessons,questions:javaQuestions,quizzes:javaQuizzes,glossary:javaGlossary,cheatSheets:javaCheatSheets,labs:javaLabs},
 {id:'aws',title:'AWS & Cloud',description:'De los conceptos de nube a servicios AWS aplicados con Java.',levels:awsStages.map(stage=>stage.name),stages:[...awsStages],units:awsUnits,lessons:awsLessons,questions:awsQuestions,quizzes:awsQuizzes,glossary:awsGlossary,cheatSheets:[],labs:awsLabs},
];
export const moduleById = new Map<ModuleId,ModuleDefinition>(modules.map(module=>[module.id,module]));
export function getModule(id:ModuleId='java'):ModuleDefinition {
 const module=moduleById.get(id);
 if(!module) throw new Error(`No existe el módulo ${id}.`);
 return module;
}
export function moduleForLesson(lessonId:string):ModuleDefinition {
 return modules.find(module=>module.lessons.some(lesson=>lesson.id===lessonId)) ?? getModule('java');
}
