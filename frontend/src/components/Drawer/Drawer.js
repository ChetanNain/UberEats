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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector, useDispatch } from 'react-redux';
import Checkout from '../../pages/checkout/Checkout';
import { handleFilterChange, updateDishes, handleClearFilter } from '../../redux/reducers/masterData';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
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
  const [openFilter, setOpenFilter] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [drawerList] = useState([
    {to: '/', name: "Home", icon: <HomeIcon />, role: 0},
    {to: '/add-restaurant', name: "Add Restaurant", icon: <RestaurantIcon />, role: 1},
    {to: '/my-restaurant', name: "Restaurant Homepage", icon: <HomeWorkIcon />, role: 1}
]);
  let filters = useSelector((state) => state.masterData.filters);

  const headerConfig = {
    headers: {
        'x-authentication-header': localStorage.getItem('token')
      }
  }
  const history = useHistory();

  function toggleSearch(){
    setOpenSearch(!openSearch)
  }

  useEffect(() => {
   loadCartData();
    loadDishData();
  }, []);

  function loadCartData(){
    axios.get("http://localhost:3001/cart", headerConfig).then((res) => {
      const data = res.data.filter(e=> e.checkedOut == 0);
      setCartData(data);
    });
  }


  function loadDishData(){
    axios.post('http://localhost:3001/dishes', filters, headerConfig).then(res=>{
      dispatch(updateDishes(res.data));
    })
  }

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
    history.push('/checkout');
    toggleCart();
    /* const headerConfig = {
      headers: {
          'x-authentication-header': localStorage.getItem('token')
        }
    }
    axios.get('http://localhost:3001/checkout',headerConfig ).then(res=>{
      toggleCart();
    }) */
  }

  function handleLogout(){
    const headerConfig = {
      headers: {
          'x-authentication-header': localStorage.getItem('token')
        }
    }
    axios.get('http://localhost:3001/logout', headerConfig).then(res=>{
      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    })
    setCartData([])
    forceRender();
  }
  function handleSearchText(e){
    if(e.key === 'Enter'){
      filters = {
        ...filters,
        searchQuery: e.target.value
      }
      toggleSearch();
      loadDishData();
    }
  }

  function handleFilterSelect(e){
    dispatch(handleFilterChange({name: e.target.name, value: e.target.value}));
  }

  function toggleFilter(){
    setOpenFilter(!openFilter)
  }

  function applyFilter(){
    toggleFilter();
    loadDishData();
  }

  function clearAndCloseFilter(){
      dispatch(handleClearFilter());
      filters = {
        searchQuery: '',
        mealType: [],
        dishCategory: [],
        dishType: [],
        restaurants: [],
        restaurantType: []
      }
      loadDishData();
  }

  function clearFilter(){
    toggleFilter();
    dispatch(handleClearFilter());
    filters = {
      searchQuery: '',
      mealType: [],
      dishCategory: [],
      dishType: [],
      restaurants: [],
      restaurantType: []
    }
    loadDishData();
  }

 function forceRender(){
  setOpen(false);
  props.forceRender();
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
          <div style={{position: 'absolute', right: '35%', cursor: 'pointer'}}><SearchIcon onClick={toggleSearch} /><span></span></div>
          <div style={{position: 'absolute', right: '25%', cursor: 'pointer'}}><FilterAltIcon onClick={toggleFilter} /><span style={{position: 'absolute', cursor: 'pointer', textDecoration: 'underline'}} onClick={clearAndCloseFilter}>Clear</span></div>
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
            <Link to={item.to} className="nav-link" onClick={forceRender} style={{color: 'gray', fontWeight: 'bold', display: !item.role  || localStorage.getItem('role') == item.role ? 'block' : 'none'}}>
              <ListItem
                button
                key={item.name}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} /> 
              </ListItem>
            </Link> 
          ))}
          
          <Link to='/orders' className="nav-link" onClick={forceRender} style={{color: 'gray', fontWeight: 'bold', display: localStorage.getItem('role') ? 'block' : 'none'}}>
            <ListItem
                  button
                  key="Orders">
                    <ListItemIcon><ReceiptIcon /></ListItemIcon>
                    <ListItemText primary="Orders"/> 
            </ListItem>
          </Link> 

          <Link to='/login' className="nav-link" onClick={forceRender} style={{color: 'gray', fontWeight: 'bold', display: localStorage.getItem('role') ? 'none' : 'block'}}>
            <ListItem
                  button
                  key="Login">
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Login"/> 
            </ListItem>
          </Link> 
          <Link to={!localStorage.getItem('role') ? '/register': '/profile'} onClick={forceRender} className="nav-link" style={{color: 'gray', fontWeight: 'bold'}}>
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
            <Route exact path='/' component={() => <Home refreshCart={loadCartData}/>}/>
            <Route exact path='/login' component={Login} />
            <Route exact path='/add-restaurant' component={AddRestaurant} />
            <Route exact path='/orders' component={RestaurantOrders} />
            <Route exact path='/my-restaurant' component={() => <RestaurantHome refreshCart={loadCartData}/>} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Register} />
            <Route exact path='/logout' component={Login} />
            <Route path='/checkout' component={Checkout} />
          </Switch>
      </main>

      <CustomizedDialog
        open={openCartVal}
        closeCart={toggleCart}
        title="Cart"
        //action={checkout}
        actionLabel="">
            {cartData.map((cartItem) => {
              return <CartList cartItem={cartItem} removeItem={removeItem} />;
            })}
        <center><Link to='/checkout' onClick={checkout}>
          <button class="btn btn-success">Proceed To checkout</button>
        </Link></center>
      </CustomizedDialog>

      <CustomizedDialog
        open={openSearch}
        closeCart={toggleSearch}
        title="Search">
          <div style={{width: '90%'}}>
          <input type="text" placeholder='(Veg, Dinner, Burger etc..)' onKeyDown={handleSearchText} />
          </div>
      </CustomizedDialog>


      <CustomizedDialog
        open={openFilter}
        closeCart={toggleFilter}
        title="Filter"
        action={applyFilter}
        actionLabel="Apply Filter"
        secondaryAction={clearFilter}
        secondaryActionLabel="Clear Filter">
        <div class='d-md-flex justify-content-between'>
          <div style={{padding: '20px', width: '150px'}}>
            <p>Meal Type</p>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='mealType' onChange={handleFilterSelect} value='Breakfast' checked={filters.mealType.includes('Breakfast') ? true : false}/></span><span>Breakfast</span></div>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='mealType' onChange={handleFilterSelect} value='Lunch' checked={filters.mealType.includes('Lunch') ? true : false}/></span><span>Lunch</span></div>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='mealType' onChange={handleFilterSelect} value='Snacks' checked={filters.mealType.includes('Snacks') ? true : false}/></span><span>Snacks</span></div>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='mealType' onChange={handleFilterSelect} value='Dinner' checked={filters.mealType.includes('Dinner') ? true : false}/></span><span>Dinner</span></div>
          </div>
          <div style={{padding: '20px', width: '180px'}}>
            <p>Dish Category</p>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='dishCategory' onChange={handleFilterSelect} value='Todays Offer' checked={filters.dishCategory.includes('Todays Offer') ? true : false}/></span><span>Todays Offer</span></div>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='dishCategory' onChange={handleFilterSelect} value='Trending Now' checked={filters.dishCategory.includes('Trending Now') ? true : false}/></span><span>Trending Now</span></div>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='dishCategory' onChange={handleFilterSelect} value='Healthy Eating' checked={filters.dishCategory.includes('Healthy Eating') ? true : false}/></span><span>Healthy Eating</span></div>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='dishCategory' onChange={handleFilterSelect} value='Easy on Pocket' checked={filters.dishCategory.includes('Easy on Pocket') ? true : false}/></span><span>Easy on Pocket</span></div>
          </div>
          <div style={{padding: '20px', width: '150px'}}>
            <p>Dish Type</p>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='dishType' onChange={handleFilterSelect} value='Veg' checked={filters.dishType.includes('Veg') ? true : false}/></span><span>Veg</span></div>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='dishType' onChange={handleFilterSelect} value='Nonveg' checked={filters.dishType.includes('Nonveg') ? true : false}/></span><span>Nonveg</span></div>
          </div>

          <div style={{padding: '20px', width: '150px'}}>
            <p>Restaurant Type</p>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='restaurantType' onChange={handleFilterSelect} value='Delivery' checked={filters.restaurantType.includes('Delivery') ? true : false}/></span><span>Delivery</span></div>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='restaurantType' onChange={handleFilterSelect} value='Pickup' checked={filters.restaurantType.includes('Pickup') ? true : false}/></span><span>Pickup</span></div>
            <div class='d-flex justify-content-between'><span><input type='checkbox' name='restaurantType' onChange={handleFilterSelect} value='Delivery and Pickup' checked={filters.restaurantType.includes('Delivery and Pickup') ? true : false}/></span><span>Delivery and Pickup</span></div>
          </div>
          
          {/* <div style={{padding: '20px', width: '150px'}}>
             <p>Restaurants</p>
          </div> */}
        </div>
      </CustomizedDialog>
    </div>
    </Router>
  );
}
