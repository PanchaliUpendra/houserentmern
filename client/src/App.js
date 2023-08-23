import React from 'react';
import './App.css';
import MYRoutes from './components/clientroutes/MyRoutes'
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <MYRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
