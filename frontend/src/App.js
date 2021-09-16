import logo from './logo.svg';
import React from 'react';
import './App.css';
import Dashboard from '../src/pages/dashboard/dashboard';
import ButtonAppBar from '../src/components/NavBar';
import PrimarySearchAppBar from '../src/components/NavBar';
import RecipeReviewCard from './components/Carousel';
import PersistentDrawerLeft from './components/drawer';
function App() {

  return (
    <div className="App">
        <Dashboard/>
      </div>
  );
}

export default App;
