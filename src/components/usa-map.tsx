import React from 'react';

import { StatePaths } from '../data/state-paths';
import { USAStateAbbreviation } from '../types/index';

import { USAState } from './usa-state';

import '../styles.css';

type OnStateClick = (state: USAStateAbbreviation) => void;
type OnStateHover = (state: USAStateAbbreviation) => void;

interface State {
  fill?: string;
  stroke?: string;
  onClick?: OnStateClick;
  onHover?: OnStateHover;
}

interface MapSettings {
  width?: string | number;
  height?: string | number;
  title?: string;
  hideStates?: [USAStateAbbreviation]
}

interface Props {
  defaultState?: State;
  customStates?: {
    [key in USAStateAbbreviation]?: State;
  };
  mapSettings?: MapSettings;
  className?: string;
}

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
      customStates[stateAbbreviation]?.onHover!(stateAbbreviation)
    } else {
      defaultState.onHover?.(stateAbbreviation)
    }
  }

  return (
    <svg
      className={`usa-map ${className}`}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 959 593'
    >
      <g className='outlines'>
        {Object.entries(StatePaths).map(([abbreviation, path]) => {

          if (mapSettings.hideStates?.includes(abbreviation)) {
            return null
          }

          return (
            <USAState
              key={abbreviation}
              onHover={() => onHover(abbreviation)}
              dimensions={path}
              state={abbreviation}
              fill={customStates[abbreviation]?.fill ?? defaultState.fill!}
              stroke={customStates[abbreviation]?.stroke ?? defaultState.stroke!}
              onClick={() => onClick(abbreviation)}
            />
          )
        }).filter(f => f !== null)}

        {!mapSettings.hideStates?.includes("DC") &&
          <g className='DC state'>
            <circle
              className='dc2'
              onClick={() => onClick('DC')}
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
        }
      </g>
    </svg>
  );
};

export { USAMap };
