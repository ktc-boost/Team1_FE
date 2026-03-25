import { useState, useEffect, useCallback } from 'react';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import { ERROR } from '@/shared/error/constants/error.constants';
import { ApiError } from '@/shared/error/types/apiError.types';

export const useJoinCode = (projectId: string) => {
  const [joinCode, setJoinCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadJoinCode = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);

    try {
      const codeInfo = await projectMembershipApi.fetchJoinCode(projectId).catch(async (error) => {
        if (error instanceof ApiError) {
          const isNotFound = error.type === ERROR.JOIN_CODE.NOT_FOUND.type;
          const isBadRequest = error.status === 400;

          if (isNotFound || isBadRequest) {
            return projectMembershipApi.createJoinCode(projectId);
          }
        }
        throw error;
      });

      setJoinCode(codeInfo.joinCode);
      setExpiresAt(codeInfo.expiresAt);
    } catch {
      setJoinCode(null);
      setExpiresAt(null);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadJoinCode();
  }, [loadJoinCode]);

  return { joinCode, expiresAt, loading, loadJoinCode };
};
