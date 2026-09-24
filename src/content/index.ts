import { fundamentalLessons } from './fundamentals';
import { backendLessons } from './backend';
import { kafkaLessons } from './kafka';
import { expansionLessons } from './expansion';
import { unitById } from './units';
export { units, levels, stages, unitById } from './units';
export { questions } from './questions';
export { quizzes } from './quizzes';
const lessonSource = [...fundamentalLessons, ...backendLessons, ...kafkaLessons, ...expansionLessons];
const originalPosition = new Map(lessonSource.map((lesson, index) => [lesson.id, index]));
export const lessons = [...lessonSource].sort((left, right) =>
 (unitById.get(left.unitId)?.order ?? Infinity) - (unitById.get(right.unitId)?.order ?? Infinity)
 || (originalPosition.get(left.id) ?? 0) - (originalPosition.get(right.id) ?? 0)
);
export const lessonLoaders = import.meta.glob<string>('./**/lessons/*.md', { query: '?raw', import: 'default' });
export async function loadLesson(id: string) {
 const path=id.startsWith('aws-')?`./aws/lessons/${id}.md`:`./lessons/${id}.md`;
 const loader = lessonLoaders[path];
 if (!loader) throw new Error('No se encontró el contenido de esta lección.');
 return loader();
}
