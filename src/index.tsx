import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
// import reportWebVitals from './reportWebVitals';
import { theme } from "./theme"

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);


root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
