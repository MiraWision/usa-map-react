import React from 'react';

interface USAStateProps {
  dimensions: string;
  state: string;
  fill: string;
  stroke: string;
  onClick?: () => void;
  onHover?: () => void;
}

const USAState: React.FC<USAStateProps> = ({ 
  dimensions, 
  state, 
  fill,
  stroke,
  onClick,
  onHover
}) => {
  return (
    <path
      onMouseOver={onHover}
      d={dimensions}
      fill={fill}
      stroke={stroke}
      data-name={state}
      className={`usa-state ${state.toLowerCase()}`}
      onClick={onClick}
    />
  );
};

export { USAState };
