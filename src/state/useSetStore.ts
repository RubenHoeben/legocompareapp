import { create } from "zustand";

interface SetState {
  favorites: string[];
  owned: string[];
  compare: string[]; // max 2
  toggleFavorite: (id: string) => void;
  toggleOwned: (id: string) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
}

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

export const useSetStore = create<SetState>((set) => ({
  favorites: [],
  owned: [],
  compare: [],
  toggleFavorite: (id) => set((s) => ({ favorites: toggle(s.favorites, id) })),
  toggleOwned: (id) => set((s) => ({ owned: toggle(s.owned, id) })),
  toggleCompare: (id) =>
    set((s) => {
      if (s.compare.includes(id))
        return { compare: s.compare.filter((x) => x !== id) };
      const next = s.compare.length >= 2 ? s.compare.slice(1) : s.compare;
      return { compare: [...next, id] };
    }),
  clearCompare: () => set({ compare: [] }),
}));
