export type Level = 'Fundamentos' | 'Java aplicado' | 'Backend profesional' | 'Profundización senior' | 'Spring Boot + Kafka';
export type ThemePreference = 'system' | 'light' | 'dark';
export interface Resource { title: string; url: string }
export interface Lesson { id: string; unitId: number; title: string; description: string; minutes: number; tags: string[]; objectives: string[]; prerequisites: string[]; resources: Resource[] }
export interface Unit { id: number; order: number; title: string; description: string; level: Level; icon: string }
export interface StageDefinition { id: string; name: Level; description: string; topics: string; color: string }
export interface Question { id: string; unitId: number; lessonId: string; prompt: string; shortAnswer: string; answer: string; keyPoints: string[]; level: Level }
export interface QuizQuestion { id: string; unitId: number; lessonId: string; prompt: string; options: {text: string; explanation: string}[]; correctIndex: number }
export type StudyStatus = 'pendiente' | 'en-curso' | 'repasado' | 'reforzar';
export interface Progress { version: 1; statuses: Record<string, StudyStatus>; favorites: string[]; lastLesson?: string; quizResults: Record<string, number>; interviewResults: Record<string, 'repasar' | 'bien'> }
