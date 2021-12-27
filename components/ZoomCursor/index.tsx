import useMousePosition from "../../src/hooks";
import ZoonCursor from '../../assets/svg/zoomCursor.svg';
const ZoomCursor = () => {
  const { x, y } = useMousePosition();
  if(!x || !y) return null;
  return (
    <ZoonCursor style={{ left: `${x-15}px`, top: `${y-15}px` }} className="zoom-cursor"/>
  );
};

export default ZoomCursor;