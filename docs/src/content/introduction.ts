const content = `
A highly customizable and interactive SVG map of the United States, built using React. This library provides advanced features including state labels, tooltips, comprehensive event handlers, and state visibility control for data visualization and user interaction.

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

To install the library, run:

\`\`\`bash
npm install @mirawision/usa-map-react
\`\`\`

or 

\`\`\`bash
yarn add @mirawision/usa-map-react
\`\`\`

## Basic Usage

Here is a quick example of how to use the library:

\`\`\`tsx
import React from 'react';
import { USAMap, USAStateAbbreviation } from '@mirawision/usa-map-react';

const handleStateClick = (stateAbbreviation: USAStateAbbreviation) => {
  console.log(\`You clicked on \${stateAbbreviation}\`);
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
\`\`\`
`;

export { content };
