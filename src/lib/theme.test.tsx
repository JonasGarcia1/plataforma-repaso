// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { parseThemePreference, resolveTheme, ThemeProvider, ThemeToggle, THEME_STORAGE_KEY } from './theme';

let darkSystem = false;
let systemListeners: Set<() => void>;
function changeSystem(dark: boolean) {
  act(() => {
    darkSystem = dark;
    for (const listener of systemListeners) listener();
  });
}
function mount() { return render(<ThemeProvider><ThemeToggle/></ThemeProvider>); }

beforeEach(() => {
  localStorage.clear();
  darkSystem = false;
  systemListeners = new Set();
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    get matches() { return darkSystem; },
    addEventListener: (_event: string, listener: () => void) => systemListeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => systemListeners.delete(listener),
  })));
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  document.head.append(meta);
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  delete document.documentElement.dataset.theme;
  document.documentElement.style.colorScheme = '';
  document.querySelector('meta[name="theme-color"]')?.remove();
});

describe('apariencia persistente y accesible', () => {
  it('recupera valores inválidos y resuelve una preferencia explícita', () => {
    for (const value of [null, undefined, '{}', 'sepia', 2, 'system']) expect(parseThemePreference(value)).toBe('system');
    expect(parseThemePreference('light')).toBe('light');
    expect(parseThemePreference('dark')).toBe('dark');
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('primera visita sigue al sistema y responde a cambios sin guardar una elección implícita', () => {
    darkSystem = true;
    const view = mount();
    expect(screen.getByRole('button', { name: 'Activar modo claro' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#061821');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    changeSystem(false);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(document.documentElement.style.colorScheme).toBe('light');
    view.unmount();
    expect(systemListeners.size).toBe(0);
  });

  it('alterna entre claro y oscuro y conserva la elección manual al volver a abrir', () => {
    const view = mount();
    fireEvent.click(screen.getByRole('button', { name: 'Activar modo oscuro' }));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    changeSystem(true);
    changeSystem(false);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    view.unmount();
    mount();
    expect(screen.getByRole('button', { name: 'Activar modo claro' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Activar modo claro' }));
    changeSystem(true);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('una preferencia dañada usa el sistema sin afectar el resto del almacenamiento', () => {
    localStorage.setItem(THEME_STORAGE_KEY, '{dañado');
    localStorage.setItem('avance-ajeno', 'conservar');
    darkSystem = true;
    mount();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('button', { name: 'Activar modo claro' })).toBeInTheDocument();
    expect(localStorage.getItem('avance-ajeno')).toBe('conservar');
  });

  it('tolera acceso bloqueado y mantiene el cambio en la sesión si no puede guardarlo', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('Bloqueado'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('Bloqueado'); });
    mount();
    fireEvent.click(screen.getByRole('button', { name: 'Activar modo oscuro' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('status')).toHaveTextContent('se aplicó para esta sesión');
  });

  it('sincroniza otras pestañas y vuelve al sistema cuando se borra la preferencia', () => {
    mount();
    act(() => window.dispatchEvent(new StorageEvent('storage', { key: THEME_STORAGE_KEY, newValue: 'dark' })));
    expect(screen.getByRole('button', { name: 'Activar modo claro' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    act(() => window.dispatchEvent(new StorageEvent('storage', { key: THEME_STORAGE_KEY, newValue: null })));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(screen.getByRole('button', { name: 'Activar modo oscuro' })).toBeInTheDocument();
  });

  it('aplica el tema desde el HTML antes de que arranque React, incluso con almacenamiento bloqueado', () => {
    const html = readFileSync('index.html', 'utf8');
    const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
    expect(bootstrap).toBeTruthy();
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    new Function(bootstrap!)();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    darkSystem = true;
    new Function(bootstrap!)();
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('Bloqueado'); });
    new Function(bootstrap!)();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
