import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileUploadApi } from '@/features/task-detail/api/fileUploadApi';
import { uploadToS3 } from '@/features/task-detail/utils/fileUploadUtil';
import toast from 'react-hot-toast';
import { formatBytes } from '@/features/file/utils/fileUtils';
import { v4 as uuidv4 } from 'uuid';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import { isAxiosError } from 'axios';
import type { FileItemType } from '@/features/file/types/fileTypes';
import type { FileStatus } from '@/features/task-detail/types/taskDetailType';
import { TASK_DETAIL_FILES_QUERY_KEY } from '@/features/task-detail/constants/taskDetailQueryKey';

export const useUploadFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, taskId }: { file: File; taskId: string }) => {
      // 1️⃣ presigned URL 요청
      const presigned = await fileUploadApi.fetchFileUploadUrl({
        filename: file.name,
        contentType: file.type,
        sizeBytes: file.size,
      });

      // 2️⃣ S3에 실제 업로드
      await uploadToS3(file, presigned.url, presigned.headers);

      // 3️⃣ 업로드 완료 콜백 (서버에 알림)
      await fileUploadApi.completeFileUpload({
        fileId: presigned.fileId,
        taskId,
        filename: file.name,
        contentType: file.type,
        sizeBytes: file.size,
      });

      // 4️⃣ 다운로드 URL 요청
      const downloadUrlRes = await fetchFileDownloadUrl(presigned.fileId);
      return { fileId: presigned.fileId, downloadUrl: downloadUrlRes.url };
    },

    onMutate: async (variables) => {
      const { taskId } = variables;
      await queryClient.cancelQueries({ queryKey: TASK_DETAIL_FILES_QUERY_KEY.list(taskId) });
      const prevFiles = queryClient.getQueryData<FileItemType[]>(
        TASK_DETAIL_FILES_QUERY_KEY.list(taskId),
      );
      const tempId = uuidv4();
      const newFile: FileItemType = {
        fileId: tempId,
        fileName: variables.file.name,
        fileUrl: '',
        fileSize: formatBytes(variables.file.size),
        timeLeft: '방금',
        status: 'uploading' as FileStatus,
      };
      queryClient.setQueryData(
        TASK_DETAIL_FILES_QUERY_KEY.list(taskId),
        (old: FileItemType[] = []) => [...old, newFile],
      );
      return { prevFiles, tempId, taskId };
    },

    onSuccess: (data, { taskId }, context) => {
      queryClient.setQueryData(
        TASK_DETAIL_FILES_QUERY_KEY.list(taskId),
        (old: FileItemType[] = []) =>
          old.map((file) =>
            file.fileId === context?.tempId
              ? {
                  ...file,
                  status: 'success',
                  fileId: data.fileId,
                  fileUrl: data.downloadUrl,
                }
              : file,
          ),
      );
    },

    onError: (error, variables, context) => {
      const { taskId } = variables;

      console.error('파일 업로드 실패:', error);

      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          toast.error('PDF 파일만 업로드할 수 있습니다.');
        } else if (status === 403) {
          toast.error('담당자만 파일을 업로드할 수 있습니다.');
        } else if (status === 413) {
          toast.error('파일 크기가 너무 커서 업로드할 수 없습니다.');
        } else {
          toast.error('파일 업로드에 실패했습니다.');
        }
      } else {
        toast.error('파일 업로드에 실패했습니다.');
      }

      if (context?.prevFiles) {
        queryClient.setQueryData(TASK_DETAIL_FILES_QUERY_KEY.list(taskId), context.prevFiles);
      } else {
        queryClient.setQueryData(
          TASK_DETAIL_FILES_QUERY_KEY.list(taskId),
          (old: FileItemType[] = []) => old.filter((file) => file.fileId !== context?.tempId),
        );
      }
    },
  });
};
