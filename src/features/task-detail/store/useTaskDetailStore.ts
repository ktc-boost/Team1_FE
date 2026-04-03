import type {
  CommentSlice,
  FileSlice,
  PdfSlice,
  PinSlice,
  TaskDetailDataState,
  TaskDetailState,
} from '@/features/task-detail/types/TaskDetailStore.types';
import type { ServerFileType } from '@/features/task-detail/types/fileApiTypes';
import { create } from 'zustand';
import type { StateCreator } from 'zustand';

// 초기 상태
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
  isCommentDrawerOpen: false,
  files: [],
};

// 파일 관련 Slice
const createFileSlice: StateCreator<
  TaskDetailState,
  [],
  [],
  FileSlice & {
    files: ServerFileType[];
    setFiles: (files: ServerFileType[]) => void;
    removeFile: (fileId: string) => void;
  }
> = (set) => ({
  selectedFile: initialDataState.selectedFile,
  files: initialDataState.files,

  setSelectedFile: (selectedFile) => set({ selectedFile }),
  setFiles: (files) => set({ files }),
  removeFile: (fileId) => set((state) => ({ files: state.files.filter((f) => f.id !== fileId) })),

  clearFileState: () =>
    set({
      selectedFile: null,
      isPdfOpen: false,
      currentPin: null,
      persona: null,
      isAnonymous: false,
      activePinCommentId: null,
      selectedCommentId: null,
      files: [],
    }),
});

// 핀 관련 Slice
const createPinSlice: StateCreator<TaskDetailState, [], [], PinSlice> = (set) => ({
  currentPin: initialDataState.currentPin,
  pins: initialDataState.pins,
  isEditingPin: initialDataState.isEditingPin,

  setCurrentPin: (currentPin) => set({ currentPin }),
  setPins: (pins) => set({ pins }),
  setIsEditingPin: (isEditingPin) => set({ isEditingPin }),

  clearCurrentPin: () => set({ currentPin: null }),
});

// PDF 관련 Slice
const createPdfSlice: StateCreator<TaskDetailState, [], [], PdfSlice> = (set) => ({
  isPdfOpen: initialDataState.isPdfOpen,
  togglePdf: (isPdfOpen) => set({ isPdfOpen }),
});

// 댓글 관련 Slice
const createCommentSlice: StateCreator<TaskDetailState, [], [], CommentSlice> = (set) => ({
  isAnonymous: initialDataState.isAnonymous,
  selectedCommentId: initialDataState.selectedCommentId,
  activePinCommentId: initialDataState.activePinCommentId,
  editingComment: initialDataState.editingComment,
  persona: initialDataState.persona,
  isCommentDrawerOpen: initialDataState.isCommentDrawerOpen,

  setPersona: (persona) => set({ persona }),
  setIsAnonymous: (isAnonymous) => set({ isAnonymous }),

  setSelectedCommentId: (selectedCommentId) => set({ selectedCommentId }),
  setActivePinCommentId: (activePinCommentId) => set({ activePinCommentId }),

  setEditingComment: (comment) =>
    set((state) => ({
      editingComment: comment,
      activePinCommentId: comment ? null : state.activePinCommentId,
    })),
  openCommentDrawer: () => set({ isCommentDrawerOpen: true }),
  closeCommentDrawer: () => set({ isCommentDrawerOpen: false }),
  setCommentDrawerOpen: (open: boolean) => set({ isCommentDrawerOpen: open }),
});

// 할 일 상세 스토어
export const useTaskDetailStore = create<TaskDetailState>()((...a) => ({
  ...initialDataState,
  ...createFileSlice(...a),
  ...createPinSlice(...a),
  ...createPdfSlice(...a),
  ...createCommentSlice(...a),

  resetAll: () => a[0](initialDataState),
}));
