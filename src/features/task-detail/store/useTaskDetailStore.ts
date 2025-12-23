import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import type { PersonaType } from '@/features/comment/constants/personaConstants';

interface EditingCommentState {
  id: string;
  content: string;
  isAnonymous: boolean;
  fileInfo?: FileInfo | null;
}

type TaskDetailDataState = {
  selectedFile: FileInfo | null;

  currentPin: PinWithAuthor | null;
  pins: PinWithAuthor[];

  isPdfOpen: boolean;
  isEditingPin: boolean;
  isAnonymous: boolean;

  selectedCommentId: string | null;
  activePinCommentId: string | null;

  editingComment: EditingCommentState | null;
  persona: PersonaType | null;
};

type TaskDetailActions = {
  setPersona: (persona: PersonaType | null) => void;

  setSelectedFile: (fileInfo: FileInfo | null) => void;

  setCurrentPin: (pin: PinWithAuthor | null) => void;
  setPins: (pins: PinWithAuthor[]) => void;

  togglePdf: (open: boolean) => void;
  setIsEditingPin: (val: boolean) => void;
  setIsAnonymous: (val: boolean) => void;

  setSelectedCommentId: (id: string | null) => void;
  setActivePinCommentId: (id: string | null) => void;

  setEditingComment: (comment: EditingCommentState | null) => void;

  clearCurrentPin: () => void;
  clearFileState: () => void;
  resetAll: () => void;
};

export type TaskDetailState = TaskDetailDataState & TaskDetailActions;

const initialDataState: TaskDetailDataState = {
  selectedFile: null,
  currentPin: null,
  pins: [],
  isPdfOpen: false,
  isEditingPin: false,
  isAnonymous: false,
  selectedCommentId: null,
  activePinCommentId: null,
  editingComment: null,
  persona: null,
};

type FileSlice = Pick<TaskDetailState, 'selectedFile' | 'setSelectedFile' | 'clearFileState'>;
type PinSlice = Pick<
  TaskDetailState,
  | 'currentPin'
  | 'pins'
  | 'isEditingPin'
  | 'setCurrentPin'
  | 'setPins'
  | 'setIsEditingPin'
  | 'clearCurrentPin'
>;
type PdfSlice = Pick<TaskDetailState, 'isPdfOpen' | 'togglePdf'>;
type CommentSlice = Pick<
  TaskDetailState,
  | 'isAnonymous'
  | 'selectedCommentId'
  | 'activePinCommentId'
  | 'editingComment'
  | 'persona'
  | 'setPersona'
  | 'setIsAnonymous'
  | 'setSelectedCommentId'
  | 'setActivePinCommentId'
  | 'setEditingComment'
>;

const createFileSlice: StateCreator<TaskDetailState, [], [], FileSlice> = (set) => ({
  selectedFile: initialDataState.selectedFile,

  setSelectedFile: (selectedFile) => set({ selectedFile }),

  clearFileState: () =>
    set({
      selectedFile: null,
      isPdfOpen: false,
      currentPin: null,
      persona: null,
      isAnonymous: false,
      activePinCommentId: null,
      selectedCommentId: null,
    }),
});

const createPinSlice: StateCreator<TaskDetailState, [], [], PinSlice> = (set) => ({
  currentPin: initialDataState.currentPin,
  pins: initialDataState.pins,
  isEditingPin: initialDataState.isEditingPin,

  setCurrentPin: (currentPin) => set({ currentPin }),
  setPins: (pins) => set({ pins }),
  setIsEditingPin: (isEditingPin) => set({ isEditingPin }),

  clearCurrentPin: () => set({ currentPin: null }),
});

const createPdfSlice: StateCreator<TaskDetailState, [], [], PdfSlice> = (set) => ({
  isPdfOpen: initialDataState.isPdfOpen,
  togglePdf: (isPdfOpen) => set({ isPdfOpen }),
});

const createCommentSlice: StateCreator<TaskDetailState, [], [], CommentSlice> = (set) => ({
  isAnonymous: initialDataState.isAnonymous,
  selectedCommentId: initialDataState.selectedCommentId,
  activePinCommentId: initialDataState.activePinCommentId,
  editingComment: initialDataState.editingComment,
  persona: initialDataState.persona,

  setPersona: (persona) => set({ persona }),
  setIsAnonymous: (isAnonymous) => set({ isAnonymous }),

  setSelectedCommentId: (selectedCommentId) => set({ selectedCommentId }),
  setActivePinCommentId: (activePinCommentId) => set({ activePinCommentId }),

  setEditingComment: (comment) =>
    set((state) => ({
      editingComment: comment,
      activePinCommentId: comment ? null : state.activePinCommentId,
    })),
});

export const useTaskDetailStore = create<TaskDetailState>()((...a) => ({
  ...initialDataState,
  ...createFileSlice(...a),
  ...createPinSlice(...a),
  ...createPdfSlice(...a),
  ...createCommentSlice(...a),

  resetAll: () => a[0](initialDataState),
}));
