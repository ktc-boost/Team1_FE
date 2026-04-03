import type { PersonaType } from '@/features/comment/constants/personaConstants';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';

type EditingCommentState = {
  id: string;
  content: string;
  isAnonymous: boolean;
  fileInfo?: FileInfo | null;
};

export type TaskDetailDataState = {
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
  isCommentDrawerOpen: boolean;
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
  openCommentDrawer: () => void;
  closeCommentDrawer: () => void;
  setCommentDrawerOpen: (open: boolean) => void;
  clearCurrentPin: () => void;
  clearFileState: () => void;
  resetAll: () => void;
};

export type TaskDetailState = TaskDetailDataState & TaskDetailActions;

// Slice 타입
export type FileSlice = Pick<
  TaskDetailState,
  'selectedFile' | 'setSelectedFile' | 'clearFileState'
>;

export type PinSlice = Pick<
  TaskDetailState,
  | 'currentPin'
  | 'pins'
  | 'isEditingPin'
  | 'setCurrentPin'
  | 'setPins'
  | 'setIsEditingPin'
  | 'clearCurrentPin'
>;

export type PdfSlice = Pick<TaskDetailState, 'isPdfOpen' | 'togglePdf'>;

export type CommentSlice = Pick<
  TaskDetailState,
  | 'isAnonymous'
  | 'selectedCommentId'
  | 'activePinCommentId'
  | 'editingComment'
  | 'persona'
  | 'isCommentDrawerOpen'
  | 'setPersona'
  | 'setIsAnonymous'
  | 'setSelectedCommentId'
  | 'setActivePinCommentId'
  | 'setEditingComment'
  | 'openCommentDrawer'
  | 'closeCommentDrawer'
  | 'setCommentDrawerOpen'
>;
