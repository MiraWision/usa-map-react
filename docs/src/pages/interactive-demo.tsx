import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { USAMap, StateAbbreviations, StateNames, USAStateAbbreviation } from '@mirawision/usa-map-react';

import { content1, content2, content3, content4 } from '../content/interactive-demo';

import Markdown from '../components/common/markdown';

interface Props {
}

const Examples = [
  {
    title: 'Visualize Data',
    description: 'Visualize data on map by customizing the fill color of states.',
    render: () => <ExampleVisualizeData />,
    content: content1,
  },
  {
    title: 'Select States',
    description: 'Select or unselect states by clicking on them.',
    render: () => <ExampleSelectStates />,
    content: content2,
  },
  {
    title: 'Custom Styling',
    description: 'Customize the styling of the map and states the way you need it.',
    render: () => <ExampleCustomStyling />,
    content: content3,
  },
  {
    title: 'Display Controls',
    description: 'Control the display of labels, tooltips, and state visibility.',
    render: () => <ExampleDisplayControls />,
    content: content4,
  },
];

const InteractiveDemoPage: React.FC<Props> = ({}) => {
  const [selectedExample, setSelectedExample] = useState(Examples[0]);

  return (
    <div>
      <h1>Interactive Demo</h1>

      <ExampleSelector>
        {Examples.map((example, index) => (
          <ExampleButton
            key={index}
            onClick={() => setSelectedExample(example)}
            selected={selectedExample === example}
          >
            {example.title}
          </ExampleButton>
        ))}
      </ExampleSelector>

      <Description>{selectedExample.description}</Description>

      {selectedExample.render()}

      <Markdown markdownText={selectedExample.content} />
    </div>
  );
};

const ExampleSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const ExampleButton = styled.button<{ selected: boolean }>`
  background-color: transparent;
  color: var(--primary-color);
  border: ${({ selected }) => selected ? '1px solid var(--primary-color)' : '1px solid transparent'};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 1rem 0;
`;

type StateSettings = Record<string, { 
  fill?: string,
  stroke?: string,
  onClick?: (state: USAStateAbbreviation) => void,
  onHover?: (state: USAStateAbbreviation) => void,
  onLeave?: (state: USAStateAbbreviation) => void,
  onFocus?: (state: USAStateAbbreviation) => void,
  onBlur?: (state: USAStateAbbreviation) => void,
  label?: {
    enabled?: boolean;
    render?: (state: USAStateAbbreviation) => React.ReactNode;
  };
  tooltip?: {
    enabled?: boolean;
    render?: (state: USAStateAbbreviation) => React.ReactNode;
  };
}>;

const ExampleVisualizeData: React.FC = ({}) => {
  const Colors = ['#3b4cc0', '#6c79d0', '#9da6e0', '#ced2ef', '#ffffff', '#ecc0c9', '#da8293', '#c7435c', '#b40426'];
  
  const [refreshIndex, setRefreshIndex] = useState(0);

  const mapSettings = useMemo<StateSettings>(() => {
    const settings: StateSettings = {};

    StateAbbreviations.forEach((state) => {
      settings[state] = {
        fill: Colors[Math.floor(Math.random() * Colors.length)],
      };
    });

    return settings;
  }, [refreshIndex]);
  
  return (
    <div>
      <USAMap
        customStates={mapSettings}
      />

      <ExampleButton selected={false} onClick={() => setRefreshIndex(refreshIndex + 1)}>Refresh</ExampleButton>
    </div>
  );
};

const ExampleSelectStates: React.FC = ({}) => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const mapSettings = useMemo<StateSettings>(() => {
    const settings: StateSettings = {};

    StateAbbreviations.forEach((state) => {
      let fill = undefined;
      let stroke = undefined;
      
      if (selectedStates.includes(state)) {
        fill = '#c6dbee';
        stroke = '#6f8fa5';
      } else if (hoveredState === state) {
        fill = '#e6f3ff';
        stroke = '#4a90e2';
      }
      
      settings[state] = {
        fill,
        stroke,
        onClick: () => setSelectedStates(selectedStates.includes(state) ? selectedStates.filter(s => s !== state) : [...selectedStates, state]),
        onHover: () => setHoveredState(state),
        onLeave: () => setHoveredState(null),
      };
    });

    return settings;
  }, [selectedStates, hoveredState]);
  
  return (
    <div>
      <Description>
        <div>Hovered: {hoveredState}</div>
        <div>Selected: {selectedStates.join(', ')}</div>
      </Description>
      
      <USAMap
        customStates={mapSettings}
      />
    </div>
  );
}

const ExampleCustomStyling: React.FC = ({}) => {
  return (
    <div>
      <USAMapStyled />
    </div>
  );
}

const ExampleDisplayControls: React.FC = ({}) => {
  const [showLabels, setShowLabels] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);
  const [hiddenStates, setHiddenStates] = useState<USAStateAbbreviation[]>(['AK', 'HI']);

  const mapSettings = useMemo<StateSettings>(() => {
    const settings: StateSettings = {};

    StateAbbreviations.forEach((state) => {
      if (!hiddenStates.includes(state)) {
        settings[state] = {
          fill: '#e9e9e9',
          stroke: '#bdc3c7',
          label: {
            enabled: showLabels,
          },
          tooltip: {
            enabled: showTooltips,
            render: showTooltips ? (state) => (
              <div>
                <strong>{StateNames[state]}</strong>
                <ul>
                  <li>Population: 100,000</li>
                  <li>Area: 100,000 sq mi</li>
                  <li>GDP: $100,000,000</li>
                </ul>
              </div>
            ) : undefined,
          },
        };
      }
    });

    return settings;
  }, [hiddenStates, showLabels, showTooltips]);

  const toggleLabels = () => setShowLabels(!showLabels);
  const toggleTooltips = () => setShowTooltips(!showTooltips);
  const toggleHiddenStates = () => {
    setHiddenStates(prev => 
      prev.includes('AK') 
        ? prev.filter(s => s !== 'AK' && s !== 'HI') 
        : [...prev, 'AK', 'HI']
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <ExampleButton selected={showLabels} onClick={toggleLabels}>
          {showLabels ? 'Hide Labels' : 'Show Labels'}
        </ExampleButton>
        <ExampleButton selected={showTooltips} onClick={toggleTooltips}>
          {showTooltips ? 'Hide Tooltips' : 'Show Tooltips'}
        </ExampleButton>
        <ExampleButton selected={hiddenStates.length > 0} onClick={toggleHiddenStates}>
          {hiddenStates.includes('AK') ? 'Show AK/HI' : 'Hide AK/HI'}
        </ExampleButton>
      </div>

      <USAMap
        customStates={mapSettings}
        hiddenStates={hiddenStates}
      />
    </div>
  );
}

const USAMapStyled = styled(USAMap)`
  .usa-map {
    border: 0.0625rem solid var(--surface-border);
    border-radius: 0.5rem;
  }

  .usa-state {
    fill: #e9e9e9;
  }

  .usa-state:hover {
    fill: #c6dbee;
    stroke-width: 3px;
  }

  .usa-state:active {
    fill: #6f8fa5;
    stroke-width: 3px;
  }

  .usa-state.il {
    fill: pink;
  }
`;

export { InteractiveDemoPage };