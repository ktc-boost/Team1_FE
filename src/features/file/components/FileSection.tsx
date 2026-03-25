import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectFilesQuery } from '@/features/file/hooks/useProjectFilesQuery';
import { Table, TableBody } from '@/shared/components/shadcn/table';
import FileTableInfo from '@/features/file/components/FileTableInfo';
import FileTableHeader from '@/features/file/components/FileTableHeader';
import FileTableEmpty from '@/features/file/components/FileTableEmpty';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';
import { usePagination } from '@/features/memo/hooks/ui/usePagination';
import FileTableRow from '@/features/file/components/FileTableRow';
import { FILE_HEADER_HEIGHT, FILE_ROW_HEIGHT } from '@/features/file/constants/file.ui.constants';

const FileSection = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { data: allFiles = [], isLoading, error } = useProjectFilesQuery(projectId!);
  const { currentPage, setCurrentPage, pageSize, pageCount, currentData } = usePagination({
    data: allFiles,
    containerRef: tableContainerRef,
    headerHeight: FILE_HEADER_HEIGHT,
    rowHeight: FILE_ROW_HEIGHT,
  });

  if (isLoading) return <FullPageLoader />;
  if (error) return <p className="text-red-500 text-center">파일을 불러오지 못했습니다.</p>;

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg shadow-sm h-full overflow-hidden">
      <FileTableInfo
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />

      <div
        ref={tableContainerRef}
        className="flex-1 min-h-0 flex flex-col rounded-xl border border-gray-200  shadow-[0_0_6px_rgba(0,0,0,0.08)] overflow-hidden bg-white"
      >
        <Table className="min-w-full table-fixed border-collapse">
          <FileTableHeader />
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((file, index) => (
                <FileTableRow key={file.id} file={file} index={currentPage * pageSize + index} />
              ))
            ) : (
              <FileTableEmpty />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FileSection;
