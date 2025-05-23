import { create } from "zustand";

interface TotalPagesState {
  totalPages: number | null;
  setTotalPages: (totalPages: number) => void;
}

const useTotalPages = create<TotalPagesState>((set) => ({
  totalPages: null,
  setTotalPages: (totalPages) => set(() => ({ totalPages })),
}));

export default useTotalPages;
