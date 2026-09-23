import type { ModuleId } from '../types';

export function modulePath(moduleId: ModuleId, path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return moduleId === 'aws' ? `/aws${normalized === '/' ? '' : normalized}` : normalized;
}

export function moduleFromPath(pathname: string): ModuleId {
  return pathname === '/aws' || pathname.startsWith('/aws/') ? 'aws' : 'java';
}

