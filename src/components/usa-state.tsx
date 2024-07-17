import React from 'react';

interface USAStateProps {
  dimensions: string;
  state: string;
  fill: string;
  stroke: string;
  onClick: () => void;
}

const USAState: React.FC<USAStateProps> = ({ 
  dimensions, 
  state, 
  fill,
  stroke,
  onClick,
}) => {
  return (
    <path
      d={dimensions}
      fill={fill}
      stroke={stroke}
      data-name={state}
      className={`usa-state ${state.toLowerCase()}`}
      onClick={onClick}
      title={`hagvfavjabjbhcj`}
    />
  );
};

export { USAState };
