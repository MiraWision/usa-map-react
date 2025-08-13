import React, { useEffect, useState, useRef } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  x: number;
  y: number;
  visible: boolean;
}

/**
 * Tooltip component for displaying state information on hover
 */
const Tooltip: React.FC<TooltipProps> = ({ content, x, y, visible }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && tooltipRef.current) {
      // Get actual tooltip dimensions
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const tooltipWidth = tooltipRect.width;
      const tooltipHeight = tooltipRect.height;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = x + 10; // Offset from cursor
      let adjustedY = y - 10;

      // Adjust if tooltip would go off screen
      if (adjustedX + tooltipWidth > viewportWidth) {
        adjustedX = x - tooltipWidth - 10;
      }
      if (adjustedY - tooltipHeight < 0) {
        adjustedY = y + 20;
      }

      setPosition({ x: adjustedX, y: adjustedY });
    }
  }, [x, y, visible]);

  if (!visible) return null;

  return (
    <div
      ref={tooltipRef}
      className="usa-map-tooltip"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {content}
    </div>
  );
};

export { Tooltip }; 