import React from 'react';
import { USAStateAbbreviation } from '../types/index';

/**
 * Props for the USAState component
 */
interface USAStateProps {
  /** SVG path data defining the shape of the state */
  dimensions: string;
  /** State abbreviation (e.g., 'CA', 'NY') */
  state: USAStateAbbreviation;
  /** Fill color for the state */
  fill: string;
  /** Stroke (border) color for the state */
  stroke: string;
  /** Click handler for the state */
  onClick: () => void;
  /** Hover handler for the state */
  onHover?: (event: React.MouseEvent) => void;
  /** Leave handler for the state */
  onLeave?: () => void;
  /** Focus handler for the state */
  onFocus?: () => void;
  /** Blur handler for the state */
  onBlur?: () => void;

}

/**
 * Individual state component used internally by USAMap
 * Renders a single state as an SVG path with the specified styling and behavior
 * 
 * @internal
 */
const USAState: React.FC<USAStateProps> = ({ 
  dimensions, 
  state, 
  fill,
  stroke,
  onClick,
  onHover,
  onLeave,
  onFocus,
  onBlur,
}) => {
  return (
    <g className={`state-group ${state.toLowerCase()}`}>
      <path
        d={dimensions}
        fill={fill}
        stroke={stroke}
        data-name={state}
        className={`usa-state ${state.toLowerCase()}`}
        onClick={onClick}
        onMouseEnter={onHover || undefined}
        onMouseLeave={onLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </g>
  );
};

export { USAState };
