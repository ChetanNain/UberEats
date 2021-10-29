import React from 'react';
import './App.css';
import CustomDrawer from './components/Drawer/Drawer';
function App() {

  let [id, setId] = React.useState(1);

  return (
    <div className="App">
        <CustomDrawer key={id} forceRender={()=>setId(id++)} />
      </div>
  );
}

export default App;
