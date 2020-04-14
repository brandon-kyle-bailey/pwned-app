import React from 'react';
import './css/App.css';

import NavBar from './components/NavBar';
import SearBar from './components/SearchBar';


function App() {

  return (
    <div className="App">
      <header className="App-header">
      <NavBar/>
      <SearBar/>
      </header>
    </div>
  );
}

export default App;

