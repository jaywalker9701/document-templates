import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Templates from './Templates';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Templates />
      </div>
    </HelmetProvider>
  );
}

export default App;
