import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
//import SearchIcon from '@material-ui/icons/Search';
// import NavigationIcon from '@material-ui/icons/Navigation';
// import Fab from '@material-ui/core/Fab';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar  style={{background: 'white'}} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style={{color:'black'}}>
            <MenuIcon onClick={props.handleDrawerOpen}/>
          </IconButton>
          <h5 className={classes.title} style={{color: 'black', fontSize:'30px', margin:'0px' }}>Uber</h5>
          <h5 className={classes.title} style={{color: '#06c167', fontSize:'30px', margin:'0px' }}>Eats</h5>
          {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              style={{position:'absolute', right:'50%'}}
            />
            <Button variant="extended" style={{background: 'black', color:'white', position:'absolute', right:'10%'}}> Cart</Button>
            <Button variant="extended" style={{background: 'grey', color:'black', position:'absolute', right:'2%'}}> Sign in</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}