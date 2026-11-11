import { useSyncExternalStore } from 'react';

const PREFIX = 'infralab:v1:';

export interface Store<T> {
  key: string;
  get: () => T;
  getServer: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (fn: () => void) => () => void;
  reset: () => void;
}

/** Store persistido em localStorage, compartilhado entre componentes e abas. */
export function createStore<T>(name: string, initial: T): Store<T> {
  const key = PREFIX + name;
  const listeners = new Set<() => void>();
  let cache: T = initial;
  let loaded = false;

  const read = (): T => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  };
  const ensure = () => {
    if (!loaded) {
      cache = read();
      loaded = true;
    }
  };
  const emit = () => listeners.forEach((l) => l());

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === key) {
        cache = read();
        loaded = true;
        emit();
      }
    });
  }

  const set: Store<T>['set'] = (next) => {
    ensure();
    cache = typeof next === 'function' ? (next as (p: T) => T)(cache) : next;
    try {
      localStorage.setItem(key, JSON.stringify(cache));
    } catch {
      /* armazenamento indisponível: mantém só em memória */
    }
    emit();
  };

  return {
    key,
    get: () => (ensure(), cache),
    getServer: () => initial,
    set,
    subscribe: (fn) => (listeners.add(fn), () => listeners.delete(fn)),
    reset: () => set(initial),
  };
}

export function useStore<T>(store: Store<T>): [T, Store<T>['set']] {
  const value = useSyncExternalStore(store.subscribe, store.get, store.getServer);
  return [value, store.set];
}

export function uid(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}
