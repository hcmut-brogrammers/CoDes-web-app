import { FC, useCallback, useEffect, useState } from 'react';
import { Layer, Stage, Text } from 'react-konva';
import { ReadyState } from 'react-use-websocket';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Shape, ShapeConfig } from 'konva/lib/Shape';

import DesignToolbar from '@/components/DesignToolbar/DesignToolbar';
import Element from '@/components/Element';
import { Keyboard } from '@/constants/enum';
import useDesignProjectWebSocket from '@/hooks/use-design-project-websocket';
import useFetchDesignElements from '@/hooks/use-fetch-design-elements';
import useAuthStore from '@/stores/auth-store';
import useDesignProjectStore from '@/stores/design-project-store';
import { uuidToHashedColor } from '@/styles/helper';
import { DesignElement } from '@/types/design-element';
import { IUserCursor } from '@/types/websocket';

interface IProps {}

const connectionStatuses = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

const getConnectionStatus = (readyState: ReadyState) =>
  connectionStatuses[readyState] || 'Unknown';

const CanvasPage: FC<IProps> = () => {
  const { tokenData } = useAuthStore();
  const { data: designElementsData, isFetched: isDesignElementsDataFetched } =
    useFetchDesignElements();
  const { userCursors, users, elements, setElements } = useDesignProjectStore();
  const {
    readyState,
    sendDeleteElementMessage,
    sendUpdateElementMessage,
    sendMoveCursorMessage,
  } = useDesignProjectWebSocket();

  const [selectedElementId, setSelectedElementId] =
    useState<Nullable<string>>(null);

  const otherUserCursors = userCursors.filter(
    (userCursor) => userCursor.user_id !== tokenData?.user_id,
  );

  const handleSelect = (elementId: string) => {
    setSelectedElementId(elementId);
  };

  const handleDeselect = (target: Shape<ShapeConfig> | Konva.Stage) => {
    const hasClickedOutside = target === target.getStage();
    if (hasClickedOutside) setSelectedElementId(null);
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    handleDeselect(e.target);
  };

  const handleTouchStart = (e: KonvaEventObject<TouchEvent>) => {
    handleDeselect(e.target);
  };

  const handleChange = (element: DesignElement) => {
    sendUpdateElementMessage(element.id, element);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (tokenData) {
        sendMoveCursorMessage({
          user_id: tokenData.user_id,
          username: tokenData.username,
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    [tokenData, sendMoveCursorMessage],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === Keyboard.Backspace && selectedElementId) {
        sendDeleteElementMessage(selectedElementId);
        setSelectedElementId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sendDeleteElementMessage, selectedElementId]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // NOTE: fetch design elements data for the first time
  useEffect(() => {
    if (!!designElementsData && isDesignElementsDataFetched) {
      setElements(designElementsData);
    }
  }, [designElementsData, isDesignElementsDataFetched, setElements]);

  return (
    <Box>
      <Typography>{`Number of users joined: ${users.length}`}</Typography>
      <Typography>{`WebSocket connection status: ${getConnectionStatus(
        readyState,
      )}`}</Typography>
      <Typography>{JSON.stringify(userCursors)}</Typography>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <Layer>
          <Text text="Click on the rectangle" />
          {elements.map((element) => (
            <Element
              key={element.id}
              isSelected={element.id === selectedElementId}
              element={element}
              onSelect={handleSelect}
              onChange={handleChange}
            />
          ))}
        </Layer>
      </Stage>
      <DesignToolbar />
      {otherUserCursors.length > 0 && (
        <UserCurors userCursors={otherUserCursors} />
      )}
    </Box>
  );
};

const UserCurors: FC<{ userCursors: IUserCursor[] }> = ({ userCursors }) => {
  return (
    <>
      {userCursors.map((userCursor) => (
        <UserCursor key={userCursor.user_id} userCursor={userCursor} />
      ))}
    </>
  );
};

const UserCursor: FC<{ userCursor: IUserCursor }> = ({ userCursor }) => {
  const { x, y, user_id, username } = userCursor;

  const color = uuidToHashedColor(user_id);
  return (
    <Box
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-2px, -2px)',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      {/* Cursor triangle (looks like a system pointer) */}
      <svg
        width="16"
        height="24"
        viewBox="0 0 16 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <path d="M0 0L16 8L9 14L11 24L6 21L5 14L0 0Z" fill={color} />
      </svg>

      {/* Optional name/label */}
      {username && (
        <Box
          style={{
            position: 'absolute',
            top: 24,
            left: 0,
            backgroundColor: 'white',
            color,
            fontSize: '12px',
            padding: '2px 4px',
            borderRadius: 4,
            border: `1px solid ${color}`,
            whiteSpace: 'nowrap',
            transform: 'translateX(-20%)',
          }}
        >
          {username}
        </Box>
      )}
    </Box>
  );
};

export default CanvasPage;
