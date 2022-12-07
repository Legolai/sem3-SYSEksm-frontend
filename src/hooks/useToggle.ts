import { useState } from "react";

interface useToggleProps {
  onOpen?: () => void;
  onClose?: () => void;
}

function useToggle({ onOpen, onClose }: useToggleProps): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(false);

  const toggler = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);

    if (nextIsOpen) {
      if (onOpen) onOpen();
    } else {
      if (onClose) onClose();
    }
  };


  return [isOpen, toggler];
}

export default useToggle;