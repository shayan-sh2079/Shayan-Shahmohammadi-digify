import { create } from "zustand";

interface SearchedValueState {
  value: string;
  setValue: (value: string) => void;
}

const useSearchedValue = create<SearchedValueState>((set) => ({
  value: "",
  setValue: (value) => set(() => ({ value })),
}));

export default useSearchedValue;
