// BottomSheet.tsx
import React, { useState, ReactNode, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import useDeviceType from "@/hooks/useDeviceType";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const y = useMotionValue(0);
  const { isMobile } = useDeviceType();

  const height = useTransform(
    y,
    [0, -window.innerHeight * 0.4],
    ["40vh", "40vh"],
  );

  useEffect(() => {
    if (isOpen) {
      y.set(0);
    }
  }, [isOpen, y]);

  const handleDragEnd = (
    _: any,
    info: { offset: { y: number }; velocity: { y: number } },
  ) => {
    const offsetY = info.offset.y;
    const velocityY = info.velocity.y;

    if (offsetY < -window.innerHeight * 0.2 || velocityY < -100) {
      // Dragged up
      y.set(-window.innerHeight * 0.4);
      setIsExpanded(true);
    } else if (offsetY > window.innerHeight * 0.2 || velocityY > 100) {
      if (isExpanded) {
        // Dragged down from expanded state
        y.set(0);
        setIsExpanded(false);
      } else {
        // Dragged down from default state
        onClose();
      }
    } else {
      // Return to previous state
      y.set(isExpanded ? -window.innerHeight * 0.4 : 0);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && isMobile && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 h-4"
            style={{ height }}
            drag="y"
            dragConstraints={{ top: -window.innerHeight * 0.4, bottom: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ y: window.innerHeight }}
            animate={{ y: isExpanded ? -window.innerHeight * 0.4 : 0 }}
            exit={{ y: window.innerHeight }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
