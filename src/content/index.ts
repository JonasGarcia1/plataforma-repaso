import { fundamentalLessons } from './fundamentals';
import { backendLessons } from './backend';
import { kafkaLessons } from './kafka';
import { expansionLessons } from './expansion';
export { units, levels, stages, unitById } from './units';
export { questions } from './questions';
export { quizzes } from './quizzes';
export const lessons = [...fundamentalLessons, ...backendLessons, ...kafkaLessons, ...expansionLessons];
export const lessonLoaders = import.meta.glob<string>('./**/lessons/*.md', { query: '?raw', import: 'default' });
export async function loadLesson(id: string) {
 const path=id.startsWith('aws-')?`./aws/lessons/${id}.md`:`./lessons/${id}.md`;
 const loader = lessonLoaders[path];
 if (!loader) throw new Error('No se encontró el contenido de esta lección.');
 return loader();
}
