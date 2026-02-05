import pptUrl from '@/shared/assets/images/file-icon/PPT.png';
import pdfUrl from '@/shared/assets/images/file-icon/pdf.png';
import csvUrl from '@/shared/assets/images/file-icon/CSV.png';
type FileIcon = {
  name: string;
  url: string;
};
const fileIcons: FileIcon[] = [
  { name: 'csv', url: csvUrl },
  { name: 'ppt', url: pptUrl },
  { name: 'pdf', url: pdfUrl },
];

export const getFileIcon = (type: string) => {
  const lowerType = type.toLowerCase();
  const extension = lowerType.split('.').pop() ?? lowerType;
  const match = fileIcons.find((icon) => extension.includes(icon.name));
  return match?.url ?? pdfUrl;
};
export const getTotalFileSize = (files: { sizeBytes: number }[]) => {
  const totalBytes = files.reduce((acc, file) => acc + file.sizeBytes, 0);
  return formatBytes(totalBytes);
};
export const formatBytes = (sizeBytes: number) => {
  if (sizeBytes < 1024) return `${sizeBytes} B`;
  if (sizeBytes < 1024 * 1024) return `${(sizeBytes / 1024).toFixed(2)} KB`;
  if (sizeBytes < 1024 * 1024 * 1024) return `${(sizeBytes / 1024 / 1024).toFixed(2)} MB`;
  return `${(sizeBytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
};
