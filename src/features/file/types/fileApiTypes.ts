export interface FileDownloadUrlResponse {
  fileId: string;
  key: string;
  url: string;
  method: 'PUT' | 'GET';
  headers: Record<string, string>;
  expiresInSeconds: number;
}
export interface ProjectFile {
  fileId: string;
  taskId: string;
  filename: string;
  contentType: string;
  type: string;
  completedAt: string;
  sizeBytes: number;
}
export type ProjectFilesResponse = ProjectFile[];

export interface FileSummaryResponse {
  totalCount: number;
  totalSizeBytes: number;
}
