import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StoreName } from '@/constants/store';
import { DesignElement } from '@/types/design-element';
import { ISender, IUserCursor } from '@/types/websocket';

interface IStateData {
  elements: DesignElement[];
  users: ISender[];
  userCursors: IUserCursor[];
  isConnectedToWebSocket: boolean;
}

interface IState extends IStateData {
  setElements: (elements: DesignElement[]) => void;
  addElement: (element: DesignElement) => void;
  updateElement: (
    elementId: string,
    updateFn: (element: DesignElement) => DesignElement,
  ) => void;
  removeElement: (elementId: string) => void;
  setUsers: (users: ISender[]) => void;
  addUsers: (users: ISender[]) => void;
  addUser: (user: ISender) => void;
  removeUser: (userId: string) => void;
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
  users: [],
  userCursors: [],
  isConnectedToWebSocket: false,
});

const defaultStateData: IStateData = initializeDesignProjectStore();

const useDesignProjectStore = create<IState>()(
  persist(
    (set, get) => ({
      ...defaultStateData,
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
      setUsers: (users) => {
        set({ users });
      },
      addUsers: (users) => {
        const { users: currentUsers } = get();
        const newUsers = users.filter(
          (user) => !currentUsers.some((u) => u.id === user.id),
        );
        set({ users: [...currentUsers, ...newUsers] });
      },
      addUser: (user) => {
        const { users } = get();
        const isUserAlreadyAdded = users.some((u) => u.id === user.id);
        if (isUserAlreadyAdded) return;

        set({ users: [...users, user] });
      },
      removeUser: (userId) => {
        const { users } = get();
        const updatedUsers = users.filter((user) => user.id !== userId);
        set({ users: updatedUsers });
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
        const updatedUserCursors = userCursors.map((cursor) =>
          cursor.user_id === userId ? updateFn(cursor) : cursor,
        );
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
      partialize: ({ elements, users, isConnectedToWebSocket }) => ({
        elements,
        users,
        isConnectedToWebSocket,
      }),
    },
  ),
);

export default useDesignProjectStore;
