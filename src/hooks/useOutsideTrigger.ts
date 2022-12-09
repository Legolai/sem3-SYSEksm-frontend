import { useEffect, useRef, } from "react";

function useOutsideTrigger<T extends HTMLElement>(ref: React.RefObject<T>, action: () => void) {
  useEffect(() => {
    /**
     * Preform action if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideTrigger;