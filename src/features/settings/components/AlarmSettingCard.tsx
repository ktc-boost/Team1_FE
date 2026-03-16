import { useEffect, useState } from 'react';
import { Switch } from '@/shared/components/shadcn/switch';
import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';
import { Card } from '@/shared/components/shadcn/card';
import { cn } from '@/shared/lib/utils';
import { useProjectsQuery } from '@/features/project/hooks/query/useProjectsQuery';
import { useUpdateNotificationSettingsMutation } from '@/features/settings/hooks/useUpdateNotificationSettingsMutation';
import { useUpdateProjectNotificationSettingsMutation } from '@/features/settings/hooks/useUpdateProjectNotificationSettingsMutation';
import { useMyInfoQuery } from '@/features/settings/hooks/useMyInfoQuery';
import { Button } from '@/shared/components/shadcn/button';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/routePaths';

const AlarmSettingCard = () => {
  const [isServiceAlarmOn, setIsServiceAlarmOn] = useState(true);
  const [projectAlarms, setProjectAlarms] = useState<Record<string, boolean>>({});
  const { data: myInfo } = useMyInfoQuery();
  const { data: projectsData } = useProjectsQuery();
  const navigate = useNavigate();

  const resetProjectAlarms = () => setProjectAlarms({});

  const { mutate: updateServiceAlarm } = useUpdateNotificationSettingsMutation(
    setIsServiceAlarmOn,
    resetProjectAlarms,
  );

  useEffect(() => {
    if (myInfo) {
      setIsServiceAlarmOn(myInfo.notificationEnabled);
    }
  }, [myInfo]);

  const { mutate: updateProjectAlarm } =
    useUpdateProjectNotificationSettingsMutation(setProjectAlarms);
  useEffect(() => {
    if (!projectsData) return;

    const initialState: Record<string, boolean> = {};
    projectsData.forEach((project) => {
      initialState[project.id] = project.isNotificationEnabled ?? false;
    });

    setProjectAlarms(initialState);
  }, [projectsData]);

  const handleProjectToggle = (projectId: string, value: boolean) => {
    updateProjectAlarm({ projectId, enabled: value });
  };

  const handleServiceToggle = (value: boolean) => {
    updateServiceAlarm(value);
  };

  return (
    <SettingsSectionCard
      title="웹푸시 알림 설정"
      desc="서비스 알림과 프로젝트별 알림을 관리할 수 있습니다 🔔"
    >
      {/* 기기 등록 버튼 */}
      <div className="px-1 mb-4 sm:mb-7">
        <Button
          variant="defaultBoost"
          className="!label2-regular sm:!label1-regular"
          onClick={() => navigate(ROUTE_PATH.ALARM_SETUP, { state: { from: ROUTE_PATH.SETTINGS } })}
        >
          새로운 기기 등록하기
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:gap-7">
        {/* 서비스 알림 섹션 */}
        <Card className="p-4 bg-gray-50 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="body2-regular sm:body1-regular ">서비스 알림</span>
              <span className="label2-regular text-gray-500">
                모든 프로젝트 알림을 한번에 제어합니다
              </span>
            </div>
            <Switch checked={isServiceAlarmOn} onCheckedChange={handleServiceToggle} />
          </div>
        </Card>

        {/* 프로젝트별 알림 섹션 */}
        <div
          className={cn(
            'px-4 flex flex-col gap-3 transition-opacity duration-300',
            !isServiceAlarmOn && 'opacity-60 pointer-events-none',
          )}
        >
          <p className="body2-regular sm:body1-regular px-1">프로젝트별 알림</p>

          {projectsData && projectsData.length === 0 && (
            <div className="flex items-center justify-center py-8 text-gray-500 body2-regular">
              참여 중인 프로젝트가 없습니다
            </div>
          )}

          {projectsData?.map((project) => {
            const enabled = projectAlarms[project.id] ?? false;
            return (
              <div
                key={project.id}
                className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3"
              >
                <span
                  className={cn(
                    'label2-regular sm:label1-regular transition-colors',
                    !enabled ? 'text-gray-400' : 'text-gray-900',
                  )}
                >
                  {project.name}
                </span>
                <Switch
                  checked={enabled}
                  onCheckedChange={(val) => handleProjectToggle(project.id, val)}
                  disabled={!isServiceAlarmOn}
                />
              </div>
            );
          })}
        </div>
      </div>
    </SettingsSectionCard>
  );
};

export default AlarmSettingCard;
