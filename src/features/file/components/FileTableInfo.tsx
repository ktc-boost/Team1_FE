import { useProjectFileSummaryQuery } from '@/features/file/hooks/useProjectFileSummaryQuery';
import { getTotalFileSize } from '@/features/file/utils/fileUtils';
import PaginationNav from '@/shared/components/ui/PaginationNav';
import { useParams } from 'react-router-dom';

interface FileTableInfoProps {
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageCount: number;
}

const FileTableInfo = ({ currentPage, setCurrentPage, pageCount }: FileTableInfoProps) => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: fileSummaryData } = useProjectFileSummaryQuery(projectId!);
  const totalSize = getTotalFileSize([{ sizeBytes: fileSummaryData?.totalSizeBytes ?? 0 }]);

  return (
    <div className="flex items-center justify-between label2-regular sm:label1-regular text-gray-500 px-2">
      <div className="flex items-center gap-4">
        <p>총 {fileSummaryData?.totalCount ?? 0}개 파일</p>
        <p className="hidden sm:block text-gray-300">|</p>
        <p className="hidden sm:block">전체 용량: {totalSize}</p>
      </div>

      <PaginationNav
        currentPage={currentPage}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default FileTableInfo;
