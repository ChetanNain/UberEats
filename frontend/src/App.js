import logo from './logo.svg';
import './App.css';
import Dashboard from '../src/pages/dashboard/dashboard';
import ButtonAppBar from '../src/components/NavBar';
import PrimarySearchAppBar from '../src/components/NavBar';
function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar/>
      {/* <Dashboard/> */}

    </div>
  );
}

export default App;
