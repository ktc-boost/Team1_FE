import { create } from 'zustand';

interface MemoEditorStore {
  isDirty: boolean;
  setIsDirty: (isDirty: boolean) => void;
  reset: () => void;
}

export const useMemoEditorStore = create<MemoEditorStore>((set) => ({
  isDirty: false,
  setIsDirty: (isDirty) => set({ isDirty }),
  reset: () => set({ isDirty: false }),
}));
