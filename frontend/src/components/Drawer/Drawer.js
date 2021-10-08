import React, {useState, useEffect} from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Home from "../../pages/home/home";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RestaurantHome from "../../pages/RestaurantHome/RestaurantHome";
import RestaurantOrders from "../../pages/RestaurantOrders/RestaurantOrders";
import AddRestaurant from "../../pages/AddRestaurant/AddRestaurant";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import CustomizedDialog from "../Dialog/Dialog";
import axios from "axios";
import CartList from '../../pages/CartList/CartList'
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { homePageFilterChangeHandler } from '../../redux/reducers/masterData';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function CustomDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openCartVal, setOpenCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();

  const drawerList = [
        {to: '/', name: "Home", icon: <HomeIcon />, role: 0},
        {to: '/add-restaurant', name: "Add Restaurant", icon: <RestaurantIcon />, role: 1},
        {to: '/orders', name: "Orders", icon: <ReceiptIcon /> },
        {to: '/my-restaurant', name: "Restaurant Homepage", icon: <HomeWorkIcon />, role: 1},
        
  ];

  useEffect(() => {
    const headerConfig = {
      headers: {
          'x-authentication-header': localStorage.getItem('token')
        }
    }
    axios.get("http://localhost:3001/cart", headerConfig).then((res) => {
      const data = res.data.filter(e=> e.checkedOut == 0);
      setCartData(data);
    });
  }, []);

  function toggleCart(){
    setOpenCart(!openCartVal);
  }

  function removeItem(id) {
    const data = { itemId: id };
    axios.post("http://localhost:3001/removeFromCart", data).then((res) => {
      //setCartData(res.data);
      let arr = [...cartData];
      const index = arr.findIndex((ele) => {
        return id === ele.id;
      });
      arr.splice(index, 1);
      setCartData(arr);
      if (arr.length == 0) {
        toggleCart();
      }
    });

    //call backedn API to remove this item from cart
  }

  function toggleDrawer(){
    setOpen(!open);
  }
  function checkout(){
    const headerConfig = {
      headers: {
          'x-authentication-header': localStorage.getItem('token')
        }
    }
    axios.get('http://localhost:3001/checkout',headerConfig ).then(res=>{
      toggleCart();
    })
  }

  function handleLogout(){
    const headerConfig = {
      headers: {
          'x-authentication-header': localStorage.getItem('token')
        }
    }
    /* axios.get('http://localhost:3001/logout', headerConfig).then(res=>{
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    }) */
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    props.forceRender();
  }
function handleSearchText(e){
  if (e.key === 'Enter') {
    dispatch(homePageFilterChangeHandler({name: 'searchQuery', value: e.target.value}));
  }
}

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{background: 'white', color: 'black'}}>
      <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            style={{ color: "black" }}
          >
            <MenuIcon onClick={toggleDrawer} />
          </IconButton>
          <h5 className={classes.title} style={{ color: "black", fontSize: "30px", margin: "0px" }}>Uber</h5>
          <h5 className={classes.title} style={{ color: "#06c167", fontSize: "30px", margin: "0px" }}>Eats</h5>
          <div class="w-50"><input type="text" id="searchText" placeholder="Search..." onKeyDown={handleSearchText}/></div>
          <ShoppingCart style={{position: 'absolute', right: '5%'}} onClick={toggleCart}/><span class="cartValue">{cartData.length}</span>
          </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {drawerList.map((item) => (
            <Link to={item.to} className="nav-link" onClick={props.forceRender} style={{color: 'gray', fontWeight: 'bold', display: !item.role  || localStorage.getItem('role') == item.role ? 'block' : 'none'}}>
              <ListItem
                button
                key={item.name}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} /> 
              </ListItem>
            </Link> 
          ))}
          
          <Link to='/login' className="nav-link" onClick={props.forceRender} style={{color: 'gray', fontWeight: 'bold', display: localStorage.getItem('role') ? 'none' : 'block'}}>
            <ListItem
                  button
                  key="Login">
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Login"/> 
            </ListItem>
          </Link> 
          <Link to={!localStorage.getItem('role') ? '/register': '/profile'} onClick={props.forceRender} className="nav-link" style={{color: 'gray', fontWeight: 'bold'}}>
            <ListItem
                  button
                  key={!localStorage.getItem('role') ? 'Register': 'Profile'}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary={!localStorage.getItem('role') ? 'Register': 'Profile'}/> 
            </ListItem>
          </Link>
          <Link to='/logout' className="nav-link" onClick={handleLogout} style={{color: 'gray', fontWeight: 'bold', display: !localStorage.getItem('role') ? 'none' : 'block'}}>
            <ListItem
                  button
                  key="Logout">
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout"/> 
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/add-restaurant' component={AddRestaurant} />
            <Route exact path='/orders' component={RestaurantOrders} />
            <Route exact path='/my-restaurant' component={RestaurantHome} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Register} />
            <Route exact path='/logout' component={Login} />
          </Switch>
      </main>

      <CustomizedDialog
        open={openCartVal}
        closeCart={toggleCart}
        title="Cart"
        action={checkout}
        actionLabel="Proceed to checkout">
        {cartData.map((cartItem) => {
          return <CartList cartItem={cartItem} removeItem={removeItem} />;
        })}
      </CustomizedDialog>
    </div>
    </Router>
  );
}
