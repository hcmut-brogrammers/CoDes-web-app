import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Box from '@mui/material/Box';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Shape, ShapeConfig } from 'konva/lib/Shape';
import { Vector2d } from 'konva/lib/types';

import { PropertiesDrawer } from '@/components/Canvas';
import ElementInspectDrawer from '@/components/Canvas/ElementInspectDrawer';
import DesignToolbar from '@/components/DesignToolbar/DesignToolbar';
import Element from '@/components/Element';
import UserCursor from '@/components/UserCursor';
import useAutoHighlightOtherSelectedElements from '@/hooks/use-auto-highlight-other-selected-elements';
import useAutoTrackCursor from '@/hooks/use-auto-track-cursor';
import useDesignProjectWebSocket from '@/hooks/use-design-project-websocket';
import useFetchDesignElements from '@/hooks/use-fetch-design-elements';
import useAuthStore from '@/stores/auth-store';
import useDesignProjectStore from '@/stores/design-project-store';
import { DesignElement } from '@/types/design-element';
import { IUserCursor } from '@/types/websocket';

interface IProps {}

const CanvasPage: FC<IProps> = () => {
  useAutoTrackCursor();
  const { tokenData } = useAuthStore();
  const { data: designElementsData, isFetched: isDesignElementsDataFetched } =
    useFetchDesignElements();
  const {
    userCursors,
    elements,
    setElements,
    getMyUserCursor,
    getMySelectedElementId,
  } = useDesignProjectStore();
  const { sendUpdateElementMessage, sendUpdateUserCursorMessage } =
    useDesignProjectWebSocket();
  const [stageScale, setStageScale] = useState<number>(0.9);
  const [stagePosition, setStagePosition] = useState<Vector2d>({ x: 0, y: 0 });
  const stageRef = useRef<Nullable<Konva.Stage>>(null);
  const layerRef = useRef<Nullable<Konva.Layer>>(null);
  useAutoHighlightOtherSelectedElements({ stageRef, layerRef });

  const sortedElements = useMemo(
    () =>
      [...elements].sort((a, b) => {
        const aCreatedAt = new Date(a.created_at).getTime();
        const bCreatedAt = new Date(b.created_at).getTime();

        return bCreatedAt - aCreatedAt;
      }),
    [elements],
  );
  const selectedElementId = getMySelectedElementId();
  const userCursor = getMyUserCursor();
  const otherUserCursors = userCursors.filter(
    (userCursor) => userCursor.user_id !== tokenData?.user_id,
  );

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.05;
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo: Vector2d = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    const newPosition: Vector2d = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setStageScale(newScale);
    setStagePosition(newPosition);
  };

  const handleSelectElement = (elementId: string) => {
    if (!userCursor) return;

    const selectedElementId = userCursor.selected_element_id;
    if (selectedElementId === elementId) return;

    sendUpdateUserCursorMessage({
      ...userCursor,
      selected_element_id: elementId,
    });
  };

  const handleDeselect = (target: Shape<ShapeConfig> | Konva.Stage) => {
    if (!userCursor) return;

    const hasClickedOutside = target === target.getStage();
    if (!hasClickedOutside) return;

    sendUpdateUserCursorMessage({
      ...userCursor,
      selected_element_id: null,
    });
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

  // TODO: handle onDragMove, onDragEnd

  // NOTE: fetch design elements data for the first time
  useEffect(() => {
    if (!!designElementsData && isDesignElementsDataFetched) {
      setElements(designElementsData);
    }
  }, [designElementsData, isDesignElementsDataFetched, setElements]);

  return (
    <Box>
      <ElementInspectDrawer onSelectElement={handleSelectElement} />
      <PropertiesDrawer selectedElementId={selectedElementId} />
      <Stage
        draggable
        ref={stageRef}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePosition.x}
        y={stagePosition.y}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
      >
        <Layer ref={layerRef}>
          {sortedElements.map((element) => (
            <Element
              key={element.id}
              isSelected={selectedElementId === element.id}
              element={element}
              onSelect={handleSelectElement}
              onChange={handleChange}
            />
          ))}
        </Layer>
      </Stage>
      <DesignToolbar />
      {otherUserCursors.length > 0 && (
        <UserCursors userCursors={otherUserCursors} />
      )}
    </Box>
  );
};

const UserCursors: FC<{ userCursors: IUserCursor[] }> = ({ userCursors }) => {
  return (
    <>
      {userCursors.map((userCursor) => (
        <UserCursor key={userCursor.user_id} userCursor={userCursor} />
      ))}
    </>
  );
};

export default CanvasPage;
