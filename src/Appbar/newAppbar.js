import AppBar from '@material-ui/core/AppBar';
import React, { useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import MiniDrawer from '../drawer/minidrawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ExitIcon from './exit.png';
import UserIcon from './user.png';
import SettingsIcon2 from './settings.png';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import MyContext from '../themeContext';

import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';


import './newAppbar.css'


const icons= [
  ExitIcon,UserIcon,SettingsIcon2
]


const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
  

    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
    
      // [theme.breakpoints.up('sm')]: {
      //   marginLeft: theme.spacing(3),
      //   width: 'auto',
      // },
      // padding: '1em 0 1em 0',
      height: '100%',
      // border: 'thin solid red'
    },
    searchIcon: {
      color:'default',
      width: theme.spacing(0, 1),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: '#8B90A0',
      fontSize:'13px',
      lineHeight:'16px',
      fontFamily: 'SF UI Text Regular',
      letterSpacing: '0.01em',
      // paddingTop: '1.5em',
      height: '100%'
    },
    inputInput: {
      padding: theme.spacing(1, 10, 1, 4),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
      height: '100%',
      color: '#232735',
    },
  
  }));
  

  export default function PrimarySearchAppBar(props) {

    const context = useContext(MyContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
      };
      const navclick = (text) => {
        if(text==="Sign out")
        {
         context.logout();
        }
        else {context.history.push('/ManagerView/'+text);}
        handleClose();
         }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

   

  

    
    const classes = useStyles();
    return (
    <div className={classes.grow}>
      <AppBar elevation={1}  position="static" style={{background:'white',height:'65px',paddingTop:'0px',marginTop:'0px'}}>
        <Toolbar variant="dense" style={{paddingTop:'0px',marginTop:'0px', height: '100%'}} disableGutters={true}>

          <div id="NewAppbarMiniDrawer">
            <MiniDrawer history={context.history}/>
          </div>

          <div id="DrawerMenuButton">
          <IconButton onClick={props.OpenDrawer} style={{transition:'all 0.5s ease'}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
            <MenuIcon style={{color:'black'}} />
          </IconButton>
          </div>
        
          <div className={classes.grow} />
          <div className={classes.search} style={{display: 'none'}}>
            <div className={classes.searchIcon}>
              <SearchIcon color="disabled" />
            </div>
            <InputBase
            
              placeholder="Search items, rack, serial..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
            <div style={{height:'40px', margin: '5px 0 5px 0', width:'1px',background:'#CED3E2', opacity: '0.2'}}></div>
            {/* <SettingsIcon id="SettingsIconButton" onClick={handleClick}  style={{cursor: 'pointer', background:anchorEl?'rgb(0,0,0,0.11)':'',height:'100%',transition:'all 0.5s ease',paddingBottom:'5px',paddingLeft:'1em',paddingRight:'20px'}} color="action"/>*/}
            <SettingsIcon id="SettingsIconButton" style={{cursor: 'pointer', height:'98%',transition:'all 0.5s ease',padding:'0 20px 5px 1em', color: '#8B90A0'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}></SettingsIcon>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }} elevation={3} variant="menu">
              <MenuItem onClick={()=>navclick('Sign out')}  button key={'Sign out'}><ListItemIcon><ExitToAppIcon /></ListItemIcon>Sign Out</MenuItem>
              <MenuItem onClick={()=>navclick('My Profile')}  button key={'My Profile'}><ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>My Profile</MenuItem>
            </Menu>

          {/* <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>

            { ['Sign out', 'My Profile', 'Settings'].map((text, index) => (
              <div key={index}>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  style={{backgroundColor:'rgba(0, 0, 0, 0.03)'}}

                  className={classes.Listroot}
                >
                <ListItem className={classes.listitem} onClick={()=>navclick(text)}  button key={text}>
                  <ListItemIcon>
                    <img src={icons[index]}  alt={index}/>
                  </ListItemIcon>
                  <ListItemText 
                    
                    className={classes.listouter} />
                  </ListItem>
                </List>
                {(index===0)||(index===2)?<Divider/>:null}
              </div>
              ))}
            </Popover> */}

    </Toolbar>
  </AppBar>
</div>
  );
}