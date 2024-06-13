import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfigurationForm from './components/ConfigurationForm';
import ConfigurationList from './components/ConfigurationList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/create" element={<ConfigurationForm />} />
          <Route path="/list" element={<ConfigurationList />} />
          <Route path="/update/:country_code" element={<ConfigurationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
