import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { Moon, Sun } from 'lucide-react';
import type { ThemePreference } from '../types';

export type { ThemePreference } from '../types';
export type ResolvedTheme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'repaso.theme.v1';
export const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';

export function parseThemePreference(value: unknown): ThemePreference {
  return value === 'light' || value === 'dark' ? value : 'system';
}

export function readThemePreference(): ThemePreference {
  try { return parseThemePreference(window.localStorage.getItem(THEME_STORAGE_KEY)); }
  catch { return 'system'; }
}

export function resolveTheme(preference: ThemePreference, systemIsDark: boolean): ResolvedTheme {
  return preference === 'system' ? (systemIsDark ? 'dark' : 'light') : preference;
}

function systemIsDark(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(SYSTEM_THEME_QUERY).matches;
}

interface ThemeStore {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (value: ThemePreference) => void;
  warning: string;
}
const ThemeContext = createContext<ThemeStore | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState(readThemePreference);
  const [darkSystem, setDarkSystem] = useState(systemIsDark);
  const [warning, setWarning] = useState('');
  const resolved = resolveTheme(preference, darkSystem);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'dark' ? '#061821' : '#F4FAFD');
  }, [resolved]);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia(SYSTEM_THEME_QUERY);
    const update = () => setDarkSystem(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) {
        setPreferenceState(parseThemePreference(event.newValue));
        setWarning('');
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  function setPreference(value: ThemePreference) {
    const next = parseThemePreference(value);
    setPreferenceState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      setWarning('');
    } catch {
      setWarning('La apariencia se aplicó para esta sesión. El navegador no permitió guardarla.');
    }
  }

  return <ThemeContext.Provider value={{ preference, resolved, setPreference, warning }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const store = useContext(ThemeContext);
  if (!store) throw new Error('Falta ThemeProvider');
  return store;
}

export function ThemeToggle() {
  const { resolved, setPreference, warning } = useTheme();
  const nextTheme: ResolvedTheme = resolved === 'dark' ? 'light' : 'dark';
  const Icon = resolved === 'dark' ? Sun : Moon;
  const nextLabel = nextTheme === 'dark' ? 'oscuro' : 'claro';

  return <>
    <button type="button" className="icon-button theme-toggle" aria-label={`Activar modo ${nextLabel}`} title={`Activar modo ${nextLabel}`} aria-pressed={resolved === 'dark'} onClick={() => setPreference(nextTheme)}>
      <Icon size={18} aria-hidden="true" />
    </button>
    {warning && <span className="sr-only" role="status">{warning}</span>}
  </>;
}
