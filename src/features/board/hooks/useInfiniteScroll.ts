import { useRef } from 'react';

interface infiniteScrollProps {
  isFetching: boolean;
  hasNextPage?: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({ isFetching, hasNextPage, onLoadMore }: infiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = (node: HTMLDivElement) => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        onLoadMore();
      }
    });

    if (node) observer.current.observe(node);
  };

  return lastItemRef;
};
