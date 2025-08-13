const content = `
## USAMap Component

### Props

#### \`defaultState\`
An optional prop to set the default style and behavior for all states. It can have the following properties:

- \`fill\` (string): The default fill color for states.
- \`stroke\` (string): The default stroke color for states.
- \`onClick\` (function): Default click handler for states.
- \`onHover\` (function): Default hover handler for states.
- \`onLeave\` (function): Default leave handler for states.
- \`onFocus\` (function): Default focus handler for states.
- \`onBlur\` (function): Default blur handler for states.
- \`label\` (object): Default label configuration.
  - \`enabled\` (boolean): Whether to show labels. Default: true.
  - \`render\` (function): Custom render function for labels. Default: state abbreviation.
- \`tooltip\` (object): Default tooltip configuration.
  - \`enabled\` (boolean): Whether to show tooltips. Default: true.
  - \`render\` (function): Custom render function for tooltips. Default: state name.

#### \`customStates\`
An optional prop to customize individual states. It is an object where the key is the state abbreviation and the value is an object with the same properties as \`defaultState\`.

Example:
\`\`\`tsx
const customStates = {
  CA: {
    fill: 'red',
    stroke: 'darkred',
    onClick: (state) => console.log(\`Clicked \${state}\`),
    onHover: (state) => console.log(\`Hovered \${state}\`),
    label: { enabled: true },
    tooltip: { enabled: true }
  },
  TX: {
    fill: 'blue',
    stroke: 'darkblue',
    onClick: (state) => console.log(\`Clicked \${state}\`)
  }
};
\`\`\`

#### \`mapSettings\`
An optional prop to set the overall map settings. It can have the following properties:

- \`width\` (number | string): The width of the SVG element.
- \`height\` (number | string): The height of the SVG element.

#### \`hiddenStates\`
An optional array of state abbreviations to hide from the map (e.g., \`['AK', 'HI']\` to hide Alaska and Hawaii).

Example:
\`\`\`tsx
<USAMap hiddenStates={['AK', 'HI']} />
\`\`\`

#### \`className\`
An optional CSS class name for the map SVG element.

### Event Handlers

All event handlers receive the state abbreviation as their first parameter:

- \`onClick(stateAbbreviation: USAStateAbbreviation)\`: Called when a state is clicked
- \`onHover(stateAbbreviation: USAStateAbbreviation)\`: Called when mouse enters a state
- \`onLeave(stateAbbreviation: USAStateAbbreviation)\`: Called when mouse leaves a state
- \`onFocus(stateAbbreviation: USAStateAbbreviation)\`: Called when a state receives focus
- \`onBlur(stateAbbreviation: USAStateAbbreviation)\`: Called when a state loses focus

### Label and Tooltip Configuration

#### Label Configuration
\`\`\`tsx
label: {
  enabled: boolean, // Whether to show labels
  render?: (state: USAStateAbbreviation) => React.ReactNode // Custom render function
}
\`\`\`

#### Tooltip Configuration
\`\`\`tsx
tooltip: {
  enabled: boolean, // Whether to show tooltips
  render?: (state: USAStateAbbreviation) => React.ReactNode // Custom render function
}
\`\`\`

### Types

- \`USAStateAbbreviation\`: Union type of all US state abbreviations
- \`StateAbbreviations\`: Array of all US state abbreviations
- \`MapSettings\`: Type for map configuration object
- \`StateSettings\`: Type for individual state configuration object
`;

export { content };
