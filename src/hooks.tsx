import { useEffect, useState  } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const mouseMoveHandler = (event: any) => {
      const { clientX, clientY, offsetX, offsetY } = event;
      setMousePosition({ x: offsetX, y:offsetY });
    };  
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return mousePosition;
}