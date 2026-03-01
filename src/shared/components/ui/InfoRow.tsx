interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex flex-col gap-1 border-b border-gray-300 py-2 md:pb-2 md:pt-0">
    <span className="body2-bold md:subtitle1-bold">{label}</span>
    <div className="h-10 flex items-center gap-2 subtitle2-regular pl-1">
      <span className="text-gray-800">{value}</span>
    </div>
  </div>
);

export default InfoRow;
