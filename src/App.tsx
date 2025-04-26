import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import IncidentDashboard from './components/IncidentDashboard';

function App() {
  return (
    <div className="App">
            <IncidentDashboard />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
