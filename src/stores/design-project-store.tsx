import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StoreName } from '@/constants/store';
import { DesignElement } from '@/types/design-element';
import { IUserCursor } from '@/types/websocket';

import useAuthStore from './auth-store';

interface IStateData {
  elements: DesignElement[];
  userCursors: IUserCursor[];
  isConnectedToWebSocket: boolean;
}

interface IState extends IStateData {
  getMyUserCursor: () => Nullable<IUserCursor>;
  getMySelectedElementId: () => Nullable<string>;
  getOtherSelectedElementIds: () => string[];
  getOtherUserCursors: () => IUserCursor[];
  setElements: (elements: DesignElement[]) => void;
  addElement: (element: DesignElement) => void;
  updateElement: (
    elementId: string,
    updateFn: (element: DesignElement) => DesignElement,
  ) => void;
  removeElement: (elementId: string) => void;
  setUserCursors: (userCursors: IUserCursor[]) => void;
  addUserCursors: (userCursors: IUserCursor[]) => void;
  addUserCursor: (userCursor: IUserCursor) => void;
  updateUserCursor: (
    userId: string,
    updateFn: (userCursor: IUserCursor) => IUserCursor,
  ) => void;
  removeUserCursor: (userId: string) => void;
  setIsConnectedToWebSocket: (isConnectedToWebSocket: boolean) => void;
  resetStore: () => void;
}

const initializeDesignProjectStore = (): IStateData => ({
  elements: [],
  userCursors: [],
  isConnectedToWebSocket: false,
});

const defaultStateData: IStateData = initializeDesignProjectStore();

const useDesignProjectStore = create<IState>()(
  persist(
    (set, get) => ({
      ...defaultStateData,
      getMyUserCursor: () => {
        const { tokenData } = useAuthStore.getState();
        if (!tokenData || !tokenData.user_id) return null;

        const { userCursors } = get();
        const targetUserCursor = userCursors.find(
          (userCursor) => userCursor.user_id === tokenData.user_id,
        );
        if (!targetUserCursor) return null;

        return targetUserCursor;
      },
      getMySelectedElementId: () => {
        const { tokenData } = useAuthStore.getState();
        if (!tokenData || !tokenData.user_id) return null;

        const { userCursors } = get();
        const targetUserCursor = userCursors.find(
          (userCursor) => userCursor.user_id === tokenData.user_id,
        );
        if (!targetUserCursor) return null;

        return targetUserCursor.selected_element_id;
      },
      getOtherSelectedElementIds: () => {
        const { tokenData } = useAuthStore.getState();
        if (!tokenData || !tokenData.user_id) return [];

        const { userCursors } = get();
        const otherUserCursors = userCursors.filter(
          (userCursor) => userCursor.user_id !== tokenData.user_id,
        );
        const selectedElementIds = otherUserCursors
          .map((userCursor) => userCursor.selected_element_id)
          .filter(Boolean);

        return selectedElementIds as string[];
      },
      getOtherUserCursors: () => {
        const { tokenData } = useAuthStore.getState();
        if (!tokenData || !tokenData.user_id) return [];

        const { userCursors } = get();
        const otherUserCursors = userCursors.filter(
          (userCursor) => userCursor.user_id !== tokenData.user_id,
        );

        return otherUserCursors;
      },
      setElements: (elements) => {
        set({ elements });
      },
      addElement: (element) => {
        const { elements } = get();
        set({ elements: [...elements, element] });
      },
      updateElement: (elementId, updateFn) => {
        const { elements } = get();
        const updatedElements = elements.map((element) =>
          element.id === elementId ? updateFn(element) : element,
        );
        set({ elements: updatedElements });
      },
      removeElement: (elementId) => {
        const { elements } = get();
        const updatedElements = elements.filter(
          (element) => element.id !== elementId,
        );
        set({ elements: updatedElements });
      },
      setUserCursors: (userCursors) => {
        set({ userCursors });
      },
      addUserCursors: (userCursors) => {
        const { userCursors: currentUserCursors } = get();
        const newUserCursors = userCursors.filter(
          (cursor) =>
            !currentUserCursors.some((c) => c.user_id === cursor.user_id),
        );
        set({ userCursors: [...currentUserCursors, ...newUserCursors] });
      },
      addUserCursor: (userCursor) => {
        const { userCursors } = get();
        const isUserCursorAlreadyAdded = userCursors.some(
          (cursor) => cursor.user_id === userCursor.user_id,
        );
        if (isUserCursorAlreadyAdded) return;

        set({ userCursors: [...userCursors, userCursor] });
      },
      updateUserCursor: (userId, updateFn) => {
        const { userCursors } = get();
        const targetUserCursorIndex = userCursors.findIndex(
          (cursor) => cursor.user_id === userId,
        );
        if (targetUserCursorIndex < 0) return;
        userCursors[targetUserCursorIndex] = updateFn(
          userCursors[targetUserCursorIndex],
        );

        const updatedUserCursors = [...userCursors];
        set({ userCursors: updatedUserCursors });
      },
      removeUserCursor: (userId) => {
        const { userCursors } = get();
        const updatedUserCursors = userCursors.filter(
          (cursor) => cursor.user_id !== userId,
        );
        set({ userCursors: updatedUserCursors });
      },
      setIsConnectedToWebSocket: (isConnectedToWebSocket) => {
        set({ isConnectedToWebSocket });
      },
      resetStore: () => {
        set({ ...defaultStateData });
      },
    }),
    {
      name: StoreName.DesignProjectStore,
      partialize: ({ elements, userCursors, isConnectedToWebSocket }) => ({
        elements,
        userCursors,
        isConnectedToWebSocket,
      }),
    },
  ),
);

export default useDesignProjectStore;
