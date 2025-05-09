import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { AppRoute } from '@/constants/app-routes';
import useDesignProjectStore from '@/stores/design-project-store';
import useGlobalStore from '@/stores/global-store';

const useResetDesignProjectStoreListener = () => {
  const { currentDesignProjectId, setCurrentDesignProjectId } =
    useGlobalStore();
  const { isConnectedToWebSocket, resetStore: resetDesignProjectStore } =
    useDesignProjectStore();
  const location = useLocation();

  const shouldResetStore = useMemo(
    () =>
      currentDesignProjectId &&
      isConnectedToWebSocket &&
      location.pathname !== AppRoute.Canvas(),
    [location, currentDesignProjectId, isConnectedToWebSocket],
  );

  useEffect(() => {
    if (shouldResetStore) {
      setCurrentDesignProjectId('');
      resetDesignProjectStore();
    }
  }, [shouldResetStore, setCurrentDesignProjectId, resetDesignProjectStore]);
};

export default useResetDesignProjectStoreListener;
