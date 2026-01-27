import toast from 'react-hot-toast';

const COMMENT_TOAST_MESSAGE = {
  emptyContent: '댓글을 입력해주세요!',
  openFileError: '해당 파일이 삭제되어 마커를 찾을 수 없습니다.',
} as const;

export const commentToast = {
  emptyContent: () => toast.error(COMMENT_TOAST_MESSAGE.emptyContent),
  openFileError: () => toast.error(COMMENT_TOAST_MESSAGE.openFileError),
} as const;
