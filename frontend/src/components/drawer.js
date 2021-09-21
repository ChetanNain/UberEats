import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MailIcon from '@material-ui/icons/Mail';
import Home from '../pages/home/home';
import Profile from '../pages/profile/profile'
import Register from '../pages/Register/Register'
import ReceiptIcon from '@mui/icons-material/Receipt';
import CustomerOrders from '../pages/CustomerOrders/CustomerOrders'
import RestaurantHome from '../pages/RestaurantHome/RestaurantHome';
import RestaurantOrders from '../pages/RestaurantOrders/RestaurantOrders';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = React.useState(<Home/>)

  const drawerList = 
  [{name: "Home", icon: <HomeIcon />}, 
    {name: "Profile", icon: <PersonIcon />},
    {name:"Register", icon:<EventNoteIcon/>},
    {name:"Add your restaurant", icon:<RestaurantIcon/> },
    {name:"Restaurant Orders", icon: <ReceiptIcon/>},
    {name:"Restaurant Homepage", icon:<HomeWorkIcon/>}
];
    
function selectedTab(tabName){
    if(tabName == 'Home'){
        setCurrentTab(<Home/>)
    }else if(tabName == 'Profile'){
        setCurrentTab(<Profile/>)
    }else if(tabName=='Register'){
      setCurrentTab(<Register validateRegister={validateRegister}/>)
    } else if(tabName=='Restaurant Homepage'){
      setCurrentTab(<RestaurantHome/>)
    }else if(tabName=='Restaurant Orders'){
      setCurrentTab(<RestaurantOrders/>)
    }
}

function validateRegister(flag){
  if(flag){
    setCurrentTab(<Home/>)
  }else{
    setCurrentTab(<Register validateRegister={validateRegister}/>)
  }
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.close}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {drawerList.map((item) => (
            <ListItem button key={item.name} onClick={()=>selectedTab(item.name)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.open,
        })}
      >
        <div className={classes.drawerHeader} />
        {/*render relevent component */}
        {currentTab}
      </main>
    </div>
  );
}