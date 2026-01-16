interface TagEmptyStateProps {
  message: string;
}

const TagEmptyState = ({ message }: TagEmptyStateProps) => (
  <div className="px-3 py-8 text-center text-gray-400 label2-regular">{message}</div>
);

export default TagEmptyState;
