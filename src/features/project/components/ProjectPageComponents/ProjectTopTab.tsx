import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TopTab from '@/widgets/TopTab';
import { ROUTES } from '@/app/routes/routeHelpers';

const ProjectTopTab = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  if (!projectId)
    return <div className="flex justify-center items-center h-full">프로젝트 ID가 없습니다.</div>;

  const currentPath = location.pathname;

  let activeTab: '보드' | '파일' | '메모' = '보드';
  if (currentPath.includes('/file')) activeTab = '파일';
  else if (currentPath.includes('/memo')) activeTab = '메모';

  const handleChangeTab = (tab: '보드' | '파일' | '메모') => {
    if (tab === '보드') navigate(ROUTES.PROJECT_BOARD(projectId));
    if (tab === '파일') navigate(ROUTES.PROJECT_FILE(projectId));
    if (tab === '메모') navigate(ROUTES.PROJECT_MEMO_LIST(projectId));
  };

  if (currentPath === `/project/${projectId}`) {
    navigate(ROUTES.PROJECT_BOARD(projectId), { replace: true });
  }

  return <TopTab activeTab={activeTab} onChangeTab={handleChangeTab} showTabs={true} />;
};

export default ProjectTopTab;
