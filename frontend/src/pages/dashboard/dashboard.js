import Button from '../../components/Button';
import React , { Component}  from 'react';
import ReactDOM from 'react-dom';
import PrimarySearchAppBar from '../../components/NavBar';
import PersistentDrawerLeft from '../../components/drawer';

 function Dashboard() {
 
    const [open, setOpen] = React.useState(false);
    function openDrawer() {
        setOpen(true)
    }

    function closeDrawer(){
        setOpen(false)
    }
    return (
        <div>
            <PrimarySearchAppBar handleDrawerOpen={openDrawer}/>
            <PersistentDrawerLeft open={open} close={closeDrawer}/>
        </div>
    )
}
export default Dashboard;