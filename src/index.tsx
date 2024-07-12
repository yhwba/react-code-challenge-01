import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from 'styled-components';
// import reportWebVitals from './reportWebVitals';
import { theme } from "./theme"

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
