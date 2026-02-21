import { useProjectFileSummaryQuery } from '@/features/file/hooks/useProjectFileSummaryQuery';
import { getTotalFileSize } from '@/features/file/utils/fileUtils';
import { useParams } from 'react-router-dom';

const FileTableInfo = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { data: fileSummaryData } = useProjectFileSummaryQuery(projectId!);

  return (
    <div className="flex items-center justify-between label2-regular sm:label1-regular  text-gray-500 px-2 py-3">
      <p>총 {fileSummaryData?.totalCount}개 파일</p>
      <p> 전체 용량 : {getTotalFileSize([{ sizeBytes: fileSummaryData?.totalSizeBytes ?? 0 }])}</p>
    </div>
  );
};

export default FileTableInfo;
