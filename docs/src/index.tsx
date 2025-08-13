import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

import 'primereact/resources/themes/mira/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(<App />);