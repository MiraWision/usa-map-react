const content = `
The USA Map React library provides multiple ways to customize the appearance of states, from programmatic styling to CSS customization. Here are comprehensive examples of how to style your map.

## Programmatic Styling

### Basic State Customization

\`\`\`tsx
import React from 'react';
import { USAMap, USAStateAbbreviation } from '@mirawision/usa-map-react';

const App = () => {
  const customStates = {
    CA: {
      fill: '#ff6b6b',
      stroke: '#d63031',
    },
    TX: {
      fill: '#4ecdc4',
      stroke: '#44a08d',
    },
    NY: {
      fill: '#45b7d1',
      stroke: '#2c3e50',
    },
  };

  return <USAMap customStates={customStates} />;
};
\`\`\`

### Dynamic Styling with State Management

\`\`\`tsx
import React, { useState } from 'react';
import { USAMap, StateAbbreviations } from '@mirawision/usa-map-react';

const App = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const customStates = {};

  StateAbbreviations.forEach((state) => {
    let fill = '#e9e9e9';
    let stroke = '#bdc3c7';

    if (selectedStates.includes(state)) {
      fill = '#ff6b6b';
      stroke = '#d63031';
    } else if (hoveredState === state) {
      fill = '#fdcb6e';
      stroke = '#e17055';
    }

    customStates[state] = {
      fill,
      stroke,
      onClick: () => {
        setSelectedStates(prev => 
          prev.includes(state) 
            ? prev.filter(s => s !== state)
            : [...prev, state]
        );
      },
      onHover: () => setHoveredState(state),
      onLeave: () => setHoveredState(null),
    };
  });

  return <USAMap customStates={customStates} />;
};
\`\`\`

### Custom Labels and Tooltips

\`\`\`tsx
import React from 'react';
import { USAMap, USAStateAbbreviation } from '@mirawision/usa-map-react';

const App = () => {
  const customStates = {
    CA: {
      fill: '#4ecdc4',
      stroke: '#44a08d',
      label: {
        enabled: true,
        render: (state: USAStateAbbreviation) => (
          <text fontSize="14" fill="#2c3e50" fontWeight="bold">
            {state}
          </text>
        ),
      },
      tooltip: {
        enabled: true,
        render: (state: USAStateAbbreviation) => (
          <div style={{ padding: '8px', background: '#fff', border: '1px solid #ccc' }}>
            <strong>{state}</strong>
            <br />
            California - The Golden State
            <br />
            Population: 39.5M
          </div>
        ),
      },
    },
  };

  return <USAMap customStates={customStates} />;
};
\`\`\`

### Data-Driven Styling

\`\`\`tsx
import React from 'react';
import { USAMap, StateAbbreviations } from '@mirawision/usa-map-react';

const App = () => {
  // Example data - population density
  const populationData = {
    CA: 253.6,
    TX: 105.5,
    FL: 146.3,
    NY: 202.1,
    // ... more states
  };

  const getColorByPopulation = (population: number) => {
    if (population > 200) return '#d63031'; // Dark red
    if (population > 100) return '#ff6b6b'; // Red
    if (population > 50) return '#fdcb6e';  // Yellow
    return '#e9e9e9'; // Light gray
  };

  const customStates = {};

  StateAbbreviations.forEach((state) => {
    const population = populationData[state] || 0;
    customStates[state] = {
      fill: getColorByPopulation(population),
      stroke: '#2c3e50',
      tooltip: {
        enabled: true,
        render: () => (
          <div>
            <strong>{state}</strong>
            <br />
            Population: {population}M
          </div>
        ),
      },
    };
  });

  return <USAMap customStates={customStates} />;
};
\`\`\`

## CSS Customization

### Styling the Map Container

\`\`\`css
.usa-map-container {
  border: 2px solid #34495e;
  border-radius: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
\`\`\`

### Styling All States

\`\`\`css
.usa-state {
  fill: #3498db !important;
  stroke: #2980b9 !important;
  stroke-width: 1px !important;
  transition: all 0.3s ease !important;
}

.usa-state:hover {
  fill: #e74c3c !important;
  stroke: #c0392b !important;
  stroke-width: 2px !important;
  cursor: pointer !important;
}
\`\`\`

### Styling Individual States

\`\`\`css
.usa-state.ca {
  fill: #e74c3c !important;
  stroke: #c0392b !important;
}

.usa-state.tx {
  fill: #f39c12 !important;
  stroke: #e67e22 !important;
}

.usa-state.ny {
  fill: #9b59b6 !important;
  stroke: #8e44ad !important;
}
\`\`\`

### Styling Labels

\`\`\`css
.state-label {
  font-family: 'Arial', sans-serif !important;
  font-size: 12px !important;
  font-weight: bold !important;
  fill: #2c3e50 !important;
  text-anchor: middle !important;
  pointer-events: none !important;
}

/* Style specific state labels */
.state-label.ca-label {
  fill: #e74c3c !important;
  font-size: 14px !important;
}

.state-label.tx-label {
  fill: #f39c12 !important;
  font-weight: 600 !important;
}

.state-label.ny-label {
  fill: #9b59b6 !important;
  font-style: italic !important;
}
\`\`\`

### Styling Tooltips

\`\`\`css
.usa-map-tooltip {
  background: rgba(44, 62, 80, 0.9) !important;
  color: white !important;
  padding: 8px 12px !important;
  border-radius: 6px !important;
  font-size: 14px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  pointer-events: none !important;
  z-index: 1000 !important;
}
\`\`\`

## Applying Custom Styles

\`\`\`tsx
import React from 'react';
import { USAMap } from '@mirawision/usa-map-react';
import './styles.css';

const App = () => (
  <div className="usa-map-container">
    <h1>Styled USA Map</h1>
    <USAMap className="custom-map" />
  </div>
);

export default App;
\`\`\`

## Responsive Styling

\`\`\`css
/* Mobile styles */
@media (max-width: 768px) {
  .usa-state {
    stroke-width: 0.5px !important;
  }
  
  .state-label {
    font-size: 8px !important;
  }
}

/* Tablet styles */
@media (min-width: 769px) and (max-width: 1024px) {
  .usa-state {
    stroke-width: 1px !important;
  }
  
  .state-label {
    font-size: 10px !important;
  }
}

/* Desktop styles */
@media (min-width: 1025px) {
  .usa-state {
    stroke-width: 1.5px !important;
  }
  
  .state-label {
    font-size: 12px !important;
  }
}
\`\`\`

## Animation and Transitions

\`\`\`css
.usa-state {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.usa-state:hover {
  transform: scale(1.02) !important;
  filter: brightness(1.1) !important;
}
\`\`\`
`;

export { content };
