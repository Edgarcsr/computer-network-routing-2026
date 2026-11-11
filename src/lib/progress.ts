import { createStore, useStore } from './storage';

/** Itens marcados em cada checklist: id -> índices. Persistido em localStorage. */
export const checksStore = createStore<Record<string, number[]>>('checks', {});
export const useChecks = () => useStore(checksStore)[0];

export const toggleCheck = (id: string, index: number) =>
  checksStore.set((p) => {
    const cur = p[id] ?? [];
    return { ...p, [id]: cur.includes(index) ? cur.filter((i) => i !== index) : [...cur, index] };
  });
