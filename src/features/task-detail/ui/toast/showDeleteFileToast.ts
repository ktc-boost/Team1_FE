import toast from 'react-hot-toast';

export function showDeleteFileSuccessToast() {
  toast.success('파일이 삭제되었습니다.');
}

export function showDeleteFileErrorToast() {
  toast.error('파일 삭제에 실패했습니다.');
}
