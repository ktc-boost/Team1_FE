import axios, { type AxiosProgressEvent } from 'axios';

export const uploadToS3 = async (
  file: File,
  url: string,
  headers: Record<string, string>,
  onProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  await axios.put(url, file, {
    headers,
    onUploadProgress: onProgress,
  });
};
