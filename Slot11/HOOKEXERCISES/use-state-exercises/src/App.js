import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import các component
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">React Hook Exercises</h1>

      <div className="card p-4 mb-4">
        <h2 className="h5 mb-3">Counter Component</h2>
        <CounterComponent />
      </div>

      <div className="card p-4 mb-4">
        <h2 className="h5 mb-3">Light Switch</h2>
        <LightSwitch />
      </div>

      <div className="card p-4 mb-4">
        <h2 className="h5 mb-3">Login Form</h2>
        <LoginForm />
      </div>

      <div className="card p-4 mb-4">
        <h2 className="h5 mb-3">Login Form 2</h2>
        <LoginForm2 />
      </div>

      <div className="card p-4 mb-4">
        <h2 className="h5 mb-3">Search Item</h2>
        <SearchItem />
      </div>
    </div>
  );
}

export default App;
