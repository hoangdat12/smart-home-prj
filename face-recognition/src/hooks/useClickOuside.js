import { useEffect } from 'react';

function useClickOutside(
  ref,
  handler,
  dependencies = [],
  mouseEvent = 'mousedown'
) {
  useEffect(() => {
    const handleMouseEvent = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    window.addEventListener(mouseEvent, handleMouseEvent);

    return () => {
      window.removeEventListener(mouseEvent, handleMouseEvent);
    };
  }, [ref, handler, mouseEvent, ...dependencies]);
}

export default useClickOutside;
