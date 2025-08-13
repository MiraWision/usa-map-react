const content1 = `
Specify custom colors for each state in the map by providing a custom object to the \`customStates\` prop. The object should have the state abbreviation as the key and the object with fill and/or stroke color as the value.

\`\`\`tsx
const ExampleVisualizeData: React.FC = ({}) => {
  const Colors = ['#3b4cc0', '#6c79d0', '#9da6e0', '#ced2ef', '#ffffff', '#ecc0c9', '#da8293', '#c7435c', '#b40426'];
  
  const [refreshIndex, setRefreshIndex] = useState(0);

  const mapSettings = useMemo<MapSettings>(() => {
    const settings: MapSettings = {};

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

      <ExampleButton selected onClick={() => setRefreshIndex(refreshIndex + 1)}>Refresh</ExampleButton>
    </div>
  );
};
\`\`\`
`;

const content2 = `
You can also add interactivity to the map by providing \`onClick\`, \`onHover\`, and \`onLeave\` functions to each state. This allows you to handle click events and show hover effects.

\`\`\`tsx
const ExampleSelectStates: React.FC = ({}) => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const mapSettings = useMemo<MapSettings>(() => {
    const settings: MapSettings = {};

    StateAbbreviations.forEach((state) => {
      let fill = '#e9e9e9'; // Default fill
      let stroke = '#bdc3c7'; // Default stroke
      
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
        onClick: () => setSelectedStates(selectedStates.includes(state) 
          ? selectedStates.filter(s => s !== state) 
          : [...selectedStates, state]),
        onHover: () => setHoveredState(state),
        onLeave: () => setHoveredState(null),
      };
    });

    return settings;
  }, [selectedStates, hoveredState]);
  
  return (
    <div>
      <div>Hovered: {hoveredState || 'None'}</div>
      <div>Selected: {selectedStates.join(', ') || 'None'}</div>
      
      <USAMap
        customStates={mapSettings}
      />
    </div>
  );
}
\`\`\`
`;

const content3 = `
You can also style the map using CSS. The map is rendered as an SVG element with the class name \`usa-map\`.

\`\`\`tsx
const ExampleCustomStyling: React.FC = ({}) => {
  return (
    <div>
      <USAMapStyled />
    </div>
  );
}

const USAMapStyled = styled(USAMap)\`
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
\`;
\`\`\`
`;

const content4 = `
Control the visibility of map elements by using the \`label\`, \`tooltip\`, and \`hiddenStates\` props. This allows you to show/hide state labels, enable/disable tooltips, and hide specific states from the map.

\`\`\`tsx
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
              <div style={{ padding: '0.5rem', backgroundColor: '#333', color: 'white', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
                <strong>{state}</strong>
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
        <button onClick={toggleLabels}>
          {showLabels ? 'Hide Labels' : 'Show Labels'}
        </button>
        <button onClick={toggleTooltips}>
          {showTooltips ? 'Hide Tooltips' : 'Show Tooltips'}
        </button>
        <button onClick={toggleHiddenStates}>
          {hiddenStates.includes('AK') ? 'Show AK/HI' : 'Hide AK/HI'}
        </button>
      </div>

      <USAMap
        customStates={mapSettings}
        hiddenStates={hiddenStates}
      />
    </div>
  );
}
\`\`\`

## Key Features:

- **Label Control**: Toggle the visibility of state labels using the \`label.enabled\` property
- **Tooltip Control**: Enable/disable tooltips using the \`tooltip.enabled\` property
- **State Visibility**: Hide specific states using the \`hiddenStates\` prop (e.g., Alaska and Hawaii)
- **Dynamic Updates**: All controls update the map in real-time
`;

export { content1, content2, content3, content4 };
