import InlineLoader from '@/shared/components/ui/loading/InlineLoader';
import { ArrowDown } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeSectionProps {
  isPending: boolean;
  qrData: string;
  timeLeft: string;
}
const QRCodeSection = ({ isPending, qrData, timeLeft }: QRCodeSectionProps) => {
  return (
    <>
      {/* 상단 텍스트 */}
      <div aria-label="text" className="flex flex-col items-center gap-3">
        <div className="title1-bold text-center leading-tight">
          <span className="text-boost-blue-light">알림</span>을 허용해보세요!
        </div>
        <div className="mt-1 subtitle2-regular text-gray-600 text-center">
          모바일로 하단의 QR 코드를 스캔해주세요!
        </div>
        <ArrowDown className="text-boost-blue-light" />
      </div>

      {/* QR 코드 */}
      <div className="p-4 shadow-md rounded-md bg-white mt-[-20px]">
        {isPending ? (
          <div className="text-gray-500 body2-regular text-center w-40 h-40 flex items-center justify-center">
            <InlineLoader size={6} text="QR 코드 생성 중.." />
          </div>
        ) : qrData ? (
          <QRCodeSVG value={qrData} className="w-40 h-40" />
        ) : (
          <div className="text-gray-500 body2-regular text-center w-40 h-40 flex items-center justify-center">
            <InlineLoader size={6} text="QR 데이터 불러오는 중.." />
          </div>
        )}
      </div>

      {/* 남은 시간 */}
      <p className="text-gray-700 body2-regular">{timeLeft}</p>
    </>
  );
};

export default QRCodeSection;
