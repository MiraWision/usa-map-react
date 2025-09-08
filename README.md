# @mirawision/usa-map-react

A highly customizable and interactive SVG map of the United States, built using React. This library provides advanced features including state labels, tooltips, comprehensive event handlers, and state visibility control for data visualization and user interaction.

[Demo and advanced Documentation can be found here!](https://mirawision.github.io/usa-map-react)

## Products Powered by this Library

This library is proudly used in [StyleCrafts](https://stylecrafts.app) — a collection of free tools for designers and frontend developers.

Color pickers, contrast checkers, QR code generators — all crafted with care, speed, and a clean UI.

Check it out → [stylecrafts.app](https://stylecrafts.app)

## Features

- **Interactive States**: Click, hover, focus, and blur event handlers for each state
- **Custom Labels**: Display state abbreviations or custom content on each state
- **Interactive Tooltips**: Show additional information on hover with custom styling
- **State Visibility Control**: Hide specific states (e.g., Alaska and Hawaii) from the map
- **Flexible Styling**: Customize fill colors, stroke colors, and visual effects
- **TypeScript Support**: Full type safety with comprehensive TypeScript definitions
- **Responsive Design**: Automatically adapts to container size
- **Accessibility**: Keyboard navigation and screen reader support

## Installation

```bash
npm install @mirawision/usa-map-react
```

or 

```bash
yarn add @mirawision/usa-map-react
```

## Module Support

This library supports both CommonJS and ES Modules for maximum compatibility:

- **CommonJS**: `require('@mirawision/usa-map-react')`
- **ES Modules**: `import { USAMap } from '@mirawision/usa-map-react'`

The library automatically detects your module system and provides the appropriate format.

## Basic Usage

```tsx
import React from 'react';
import { USAMap, USAStateAbbreviation } from '@mirawision/usa-map-react';

const handleStateClick = (stateAbbreviation: USAStateAbbreviation) => {
  console.log(`You clicked on ${stateAbbreviation}`);
};

const customStates = {
  CA: {
    fill: 'red',
    onClick: handleStateClick,
  },
  TX: {
    fill: 'blue',
    stroke: 'green',
    onClick: handleStateClick,
  },
};

const App = () => (
  <div>
    <h1>US Map</h1>
    <USAMap customStates={customStates} />
  </div>
);

export default App;
```

## Advanced Usage Examples

### Event Handlers and Hover Effects

```tsx
import React, { useState } from 'react';
import { USAMap, StateAbbreviations, USAStateAbbreviation } from '@mirawision/usa-map-react';

const App = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const customStates = useMemo(() => {
    const settings: MapSettings = {};

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
      <p>Hovered: {hoveredState || 'None'}</p>
      <p>Selected: {selectedStates.join(', ') || 'None'}</p>
      <USAMap customStates={customStates} />
    </div>
  );
};
```

### Labels and Tooltips

```tsx
import React from 'react';
import { USAMap, USAStateAbbreviation } from '@mirawision/usa-map-react';

const App = () => {
  const customStates = {
    CA: {
      fill: '#4ecdc4',
      label: {
        enabled: true,
        render: (state: USAStateAbbreviation) => (
          <text fontSize="12" fill="#333" fontWeight="bold">
            {state}
          </text>
        ),
      },
      tooltip: {
        enabled: true,
        render: (state: USAStateAbbreviation) => (
          <div>
            <strong>{state}</strong>
            <br />
            California - The Golden State
          </div>
        ),
      },
    },
  };

  return <USAMap customStates={customStates} />;
};
```

### State Visibility Control

```tsx
import React, { useState } from 'react';
import { USAMap, USAStateAbbreviation } from '@mirawision/usa-map-react';

const App = () => {
  const [hiddenStates, setHiddenStates] = useState<USAStateAbbreviation[]>(['AK', 'HI']);

  const toggleStates = () => {
    setHiddenStates((prev) => prev.includes('AK') ? [] : ['AK', 'HI']);
  };

  return (
    <div>
      <button onClick={toggleStates}>
        {hiddenStates.includes('AK') ? 'Show AK/HI' : 'Hide AK/HI'}
      </button>
      <USAMap hiddenStates={hiddenStates} />
    </div>
  );
};
```

### Complete Example with All Features

```tsx
import React, { useState } from 'react';
import { USAMap, USAStateAbbreviation, StateAbbreviations } from '@mirawision/usa-map-react';

const App = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [clickedStates, setClickedStates] = useState<string[]>([]);
  const [showLabels, setShowLabels] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);
  const [hiddenStates, setHiddenStates] = useState<USAStateAbbreviation[]>(['AK', 'HI']);

  const mapSettings = {};

  StateAbbreviations.forEach((state) => {
    if (!hiddenStates.includes(state)) {
      mapSettings[state] = {
        fill: clickedStates.includes(state) ? '#ff6b6b' : '#e9e9e9',
        stroke: clickedStates.includes(state) ? '#d63031' : '#bdc3c7',
        onClick: () => {
          setClickedStates((prev) => prev.includes(state) 
            ? prev.filter(s => s !== state) 
            : [...prev, state]
          );
        },
        onHover: () => setHoveredState(state),
        onLeave: () => setHoveredState(null),
        label: { enabled: showLabels },
        tooltip: { enabled: showTooltips },
      };
    }
  });

  return (
    <div>
      <div>
        <button onClick={() => setShowLabels(!showLabels)}>
          {showLabels ? 'Hide Labels' : 'Show Labels'}
        </button>
        <button onClick={() => setShowTooltips(!showTooltips)}>
          {showTooltips ? 'Hide Tooltips' : 'Show Tooltips'}
        </button>
        <button onClick={() => setHiddenStates(prev => 
          prev.includes('AK') ? [] : ['AK', 'HI']
        )}>
          {hiddenStates.includes('AK') ? 'Show AK/HI' : 'Hide AK/HI'}
        </button>
      </div>
      
      <p>Hovered: {hoveredState || 'None'}</p>
      <p>Clicked: {clickedStates.join(', ') || 'None'}</p>
      
      <USAMap 
        customStates={mapSettings}
        hiddenStates={hiddenStates}
      />
    </div>
  );
};
```

## Props

### `defaultState`
An optional prop to set the default style and behavior for all states. It can have the following properties:
- `fill` (string): The default fill color for states.
- `stroke` (string): The default stroke color for states.
- `onClick` (function): Default click handler for states.
- `onHover` (function): Default hover handler for states.
- `onLeave` (function): Default leave handler for states.
- `onFocus` (function): Default focus handler for states.
- `onBlur` (function): Default blur handler for states.
- `label` (object): Default label configuration.
  - `enabled` (boolean): Whether to show labels. Default: true.
  - `render` (function): Custom render function for labels. Default: state abbreviation.
- `tooltip` (object): Default tooltip configuration.
  - `enabled` (boolean): Whether to show tooltips. Default: true.
  - `render` (function): Custom render function for tooltips. Default: state name.

### `customStates`
An optional prop to customize individual states. It is an object where the key is the state abbreviation and the value is an object with the same properties as `defaultState`.

### `mapSettings`
An optional prop to set the overall map settings. It can have the following properties:
- `width` (number | string): The width of the SVG element.
- `height` (number | string): The height of the SVG element.

### `hiddenStates`
An optional array of state abbreviations to hide from the map (e.g., `['AK', 'HI']` to hide Alaska and Hawaii).

### `className`
An optional CSS class name for the map SVG element.

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.

## Credits

This library is based on the SVG paths for states provided by the [react-usa-map](https://www.npmjs.com/package/react-usa-map) package.
