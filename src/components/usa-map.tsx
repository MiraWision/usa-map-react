import React, { useState } from 'react';

import { StatePaths } from '../data/state-paths';
import { StateNames } from '../data/state-names';
import { StateCentroids } from '../data/state-centroids';
import { USAStateAbbreviation } from '../types/index';

import { USAState } from './usa-state';
import { Tooltip } from './tooltip';

import '../styles.css';

/**
 * Callback function type for state click events
 * @param state - The abbreviation of the clicked state
 */
type OnStateClick = (state: USAStateAbbreviation) => void;

/**
 * Configuration for individual state appearance and behavior
 */
interface State {
  /** Fill color for the state. Default: '#d3d3d3' */
  fill?: string;
  /** Stroke (border) color for the state. Default: '#a5a5a5' */
  stroke?: string;
  /** Label configuration for the state */
  label?: {
    /** Whether to show the label. Default: true */
    enabled?: boolean;
    /** Render function for the label. Default: () => state name */
    render?: (state: USAStateAbbreviation) => React.ReactNode;
  };
  /** Tooltip configuration for the state */
  tooltip?: {
    /** Whether to show the tooltip. Default: true */
    enabled?: boolean;
    /** Render function for the tooltip. Default: () => state abbreviation */
    render?: (state: USAStateAbbreviation) => React.ReactNode;
  };
  /** Click handler for the state */
  onClick?: OnStateClick;
  /** Hover handler for the state */
  onHover?: OnStateClick;
  /** Leave handler for the state */
  onLeave?: OnStateClick;
  /** Focus handler for the state */
  onFocus?: OnStateClick;
  /** Blur handler for the state */
  onBlur?: OnStateClick;
}

/**
 * Configuration for the map's dimensions and title
 */
interface MapSettings {
  /** Width of the map. Can be a number (pixels) or string (e.g., '100%'). Default: '100%' */
  width?: string | number;
  /** Height of the map. Can be a number (pixels) or string (e.g., 'fit-content'). Default: 'fit-content' */
  height?: string | number;
  /** Title attribute for the map SVG */
  title?: string;
}

/**
 * Props for the USAMap component
 */
interface Props {
  /** Default styling and behavior for all states. Applied when no custom state configuration is provided */
  defaultState?: State;
  /** Custom configurations for specific states. Keys are state abbreviations (e.g., 'CA', 'NY') */
  customStates?: {
    [key in USAStateAbbreviation]?: State;
  };
  /**
   * Array of state abbreviations to hide from the map
   * @default []
   */
  hiddenStates?: USAStateAbbreviation[];
  /** Map dimensions and title settings */
  mapSettings?: MapSettings;
  /** Additional CSS class name for the map SVG */
  className?: string;
}

/**
 * A customizable and interactive USA map component for React
 * 
 * @example
 * ```tsx
 * // Basic usage with default styling
 * <USAMap />
 * 
 * // Custom styling for all states
 * <USAMap defaultState={{ fill: '#f0f0f0', stroke: '#000' }} />
 * 
 * // Custom styling and click handler for specific states
 * <USAMap customStates={{
 *   CA: { fill: 'blue', onClick: () => console.log('California clicked!') },
 *   NY: { fill: 'red', onClick: () => console.log('New York clicked!') }
 * }} />
 * 
 * // Hide specific states from the map
 * <USAMap hiddenStates={['AK', 'HI', 'DC']} />
 * 
 * // Add labels and event handlers
 * <USAMap 
 *   defaultState={{
 *     label: { enabled: true },
 *     onHover: (state) => console.log(`Hovered ${state}`),
 *     onLeave: (state) => console.log(`Left ${state}`)
 *   }}
 *   customStates={{
 *     CA: { 
 *       fill: 'blue',
 *       label: { render: () => 'CA' },
 *       onClick: () => console.log('California clicked!')
 *     }
 *   }}
 * />
 * ```
 */
const USAMap: React.FC<Props> = ({
  defaultState = {
    fill: '#d3d3d3',
    stroke: '#a5a5a5', 
  },
  customStates = {},
  mapSettings = {
    width: '100%',
    height: 'fit-content',
  },
  className = '',
  hiddenStates = [],
}) => {
  const { width, height } = mapSettings;

  const onClick = (stateAbbreviation: USAStateAbbreviation) => {
    if (customStates[stateAbbreviation]?.onClick) {
      customStates[stateAbbreviation]?.onClick!(stateAbbreviation);
    } else {
      defaultState.onClick?.(stateAbbreviation);
    }
  };

  const onHover = (stateAbbreviation: USAStateAbbreviation) => {
    if (customStates[stateAbbreviation]?.onHover) {
      customStates[stateAbbreviation]?.onHover!(stateAbbreviation);
    } else {
      defaultState.onHover?.(stateAbbreviation);
    }
  };

  const onLeave = (stateAbbreviation: USAStateAbbreviation) => {
    if (customStates[stateAbbreviation]?.onLeave) {
      customStates[stateAbbreviation]?.onLeave!(stateAbbreviation);
    } else {
      defaultState.onLeave?.(stateAbbreviation);
    }
  };

  const onFocus = (stateAbbreviation: USAStateAbbreviation) => {
    if (customStates[stateAbbreviation]?.onFocus) {
      customStates[stateAbbreviation]?.onFocus!(stateAbbreviation);
    } else {
      defaultState.onFocus?.(stateAbbreviation);
    }
  };

  const onBlur = (stateAbbreviation: USAStateAbbreviation) => {
    if (customStates[stateAbbreviation]?.onBlur) {
      customStates[stateAbbreviation]?.onBlur!(stateAbbreviation);
    } else {
      defaultState.onBlur?.(stateAbbreviation);
    }
  };

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: React.ReactNode;
    x: number;
    y: number;
  }>({
    visible: false,
    content: '',
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip.visible) {
      setTooltip(prev => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
      }));
    }
  };

  const handleMouseEnter = (stateAbbreviation: USAStateAbbreviation, event: React.MouseEvent) => {
    onHover(stateAbbreviation);
    
    // Show tooltip if enabled
    const stateConfig = customStates[stateAbbreviation] || defaultState;
    if (stateConfig.tooltip?.enabled !== false) {
      const tooltipContent = stateConfig.tooltip?.render 
        ? stateConfig.tooltip.render(stateAbbreviation)
        : StateNames[stateAbbreviation];
      
      setTooltip({
        visible: true,
        content: tooltipContent,
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleMouseLeave = (stateAbbreviation: USAStateAbbreviation) => {
    onLeave(stateAbbreviation);
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <>
      <svg
        className={`usa-map ${className}`}
        xmlns='http://www.w3.org/2000/svg'
        width={width}
        height={height}
        viewBox='0 0 959 593'
        onMouseMove={handleMouseMove}
      >
        {/* States group - rendered first */}
        <g className='outlines'>
          {Object.entries(StatePaths).map(([abbreviation, path]) => {
            if (hiddenStates.includes(abbreviation as USAStateAbbreviation)) {
              return null;
            }
            return (
              <USAState
                key={abbreviation}
                dimensions={path}
                state={abbreviation}
                fill={customStates[abbreviation]?.fill ?? defaultState.fill!}
                stroke={customStates[abbreviation]?.stroke ?? defaultState.stroke!}
                onClick={() => onClick(abbreviation)}
                onHover={(event) => handleMouseEnter(abbreviation, event)}
                onLeave={() => handleMouseLeave(abbreviation)}
                onFocus={() => onFocus(abbreviation)}
                onBlur={() => onBlur(abbreviation)}
              />
            );
          })}
          
          {!hiddenStates.includes('DC') && (
            <g className='DC state'>
              <circle
                className='dc2'
                onClick={() => onClick('DC')}
                onMouseEnter={(event) => handleMouseEnter('DC', event)}
                onMouseLeave={() => handleMouseLeave('DC')}
                onFocus={() => onFocus('DC')}
                onBlur={() => onBlur('DC')}
                data-name={'DC'}
                fill={customStates['DC']?.fill ?? defaultState.fill!}
                stroke={customStates['DC']?.stroke ?? defaultState.stroke!}
                strokeWidth='1.5'
                cx='801.3'
                cy='251.8'
                r='5'
                opacity='1'
              />
            </g>
          )}
        </g>

        {/* Labels group - rendered on top of all states */}
        <g className='labels'>
          {Object.entries(StatePaths).map(([abbreviation, path]) => {
            if (hiddenStates.includes(abbreviation as USAStateAbbreviation)) {
              return null;
            }
            
            const stateConfig = customStates[abbreviation as USAStateAbbreviation] || defaultState;
            const labelConfig = stateConfig.label;
            
            if (labelConfig?.enabled === false) {
              return null;
            }

            const labelPosition = StateCentroids[abbreviation as USAStateAbbreviation];
            
            return (
              <text
                key={`label-${abbreviation}`}
                className={`state-label ${abbreviation.toLowerCase()}-label`}
                textAnchor="middle"
                dominantBaseline="middle"
                x={labelPosition.x}
                y={labelPosition.y}
              >
                {labelConfig?.render ? labelConfig.render(abbreviation as USAStateAbbreviation) : abbreviation}
              </text>
            );
          })}
          
          {/* DC label */}
          {!hiddenStates.includes('DC') && (customStates['DC']?.label?.enabled !== false || defaultState.label?.enabled !== false) && (
            <text
              className="state-label dc-label"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#333"
              fontSize="10"
              fontWeight="600"
              x={StateCentroids['DC'].x}
              y={StateCentroids['DC'].y}
              style={{
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
                pointerEvents: 'none',
              }}
            >
              {customStates['DC']?.label?.render ? customStates['DC'].label.render('DC') : 
              defaultState.label?.render ? defaultState.label.render('DC') : 'DC'}
            </text>
          )}
        </g>
      </svg>
      <Tooltip
        content={tooltip.content}
        x={tooltip.x}
        y={tooltip.y}
        visible={tooltip.visible}
      />
    </>
  );
};

export { USAMap };
