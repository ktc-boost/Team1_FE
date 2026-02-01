import { useState } from 'react';

export const useRowSelection = () => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleSelectAll = (ids: string[] = []) => {
    setSelectedRows((prev) => (prev.size === ids.length ? new Set() : new Set(ids)));
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  const clearSelected = () => {
    setSelectedRows(new Set());
  };

  const removeSelected = (ids: string[]) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  };

  return {
    selectedRows,
    toggleSelectAll,
    toggleSelectRow,
    clearSelected,
    removeSelected,
  };
};
