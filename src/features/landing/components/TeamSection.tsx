import { CardDescription, CardContent, CardTitle, Card } from '@/shared/components/shadcn/card';
import AvatarLJH from '@/shared/assets/images/member-avatar/webp/ljh-avatar.webp';
import AvatarKWH from '@/shared/assets/images/member-avatar/webp/kwh-avatar.webp';
import AvatarKHM from '@/shared/assets/images/member-avatar/webp/khm-avatar.webp';
import AvatarSYJ from '@/shared/assets/images/member-avatar/webp/syj-avatar.webp';
import AvatarYDY from '@/shared/assets/images/member-avatar/webp/ydy-avatar.webp';
import { cn } from '@/shared/lib/utils';

const TeamSection = () => {
  const teamMembers = [
    { name: '이진호', role: 'Backend', img: AvatarLJH },
    { name: '김원호', role: 'Backend', img: AvatarKWH },
    { name: '김혜민', role: 'Frontend', img: AvatarKHM },
    { name: '서영진', role: 'Backend', img: AvatarSYJ },
    { name: '유다연', role: 'Frontend', img: AvatarYDY },
  ];

  return (
    <div className="py-35 bg-white">
      <div className="text-center mb-18">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">Boost Team</h2>
        <p className="mt-4 subtitle2-regular sm:text-lg text-gray-500">
          프로젝트를 열심히 이끌어주고 있는 Boost 팀원들입니다!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 sm:gap-6 px-4">
        {teamMembers.map((member, idx) => (
          <Card
            key={idx}
            className="border-gray-300 shadow-md rounded-xl flex flex-col items-center justify-center w-full h-full min-w-[180px] min-h-[220px] xl:min-w-[250px] xl:min-h-[300px] p-4 sm:p-6 transform transition hover:-translate-y-2 hover:shadow-xl"
          >
            <img
              src={member.img}
              className={cn('w-24 xl:w-30 rounded-full p-2.5', {
                'bg-boost-blue': member.role === 'Backend',
                'bg-boost-orange': member.role === 'Frontend',
              })}
              alt={member.name}
            />

            <CardContent className="text-center space-y-3 mt-4 flex-1">
              <CardTitle className="text-md sm:text-xl font-bold text-gray-800">
                {member.name}
              </CardTitle>
              <CardDescription className="text-sm sm:text-md text-gray-600">
                {member.role}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
