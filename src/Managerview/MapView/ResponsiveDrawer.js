import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import { useMediaQuery, InputBase } from '@material-ui/core';

import Logo from '../../images/Gather_Logo_Color.svg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Rack from '../../drawer/rack.png';
import Dashboard from '../../drawer/dashboard.png';
import DashboardBlack from '../../drawer/dashboardBlack.png';
// import Drone from './user-view-drone.png'; import Mission from
// './mission.png'; import MissionBlack from './missionBlack.png';
import Inventory from '../../drawer/inventory.png';
import ManageUserIcon from '../../drawer/admin.png'
import ManageUserActiveIcon from '../../drawer/admin_active.png'
import UserIcon from '../../drawer/user.png';
import '../../drawer/Drawer.css';

import SearchIcon from '@material-ui/icons/Search';
import MyContext from '../../themeContext';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import WebIcon from '@material-ui/icons/Web';
import WidgetsIcon from '@material-ui/icons/Widgets';
import ViewListIcon from '@material-ui/icons/ViewList';


// const defaultIcons = [Dashboard, Rack, Inventory, ManageUserIcon, UserIcon]
// const activeIcons = [DashboardBlack, Rack, Inventory, ManageUserActiveIcon, UserIcon]
const defaultIcons = [<DashboardIcon />, <VerticalSplitIcon />, <ViewListIcon />, <ExitToAppIcon />]
const activeIcons = [<DashboardIcon />, <VerticalSplitIcon />, <ViewListIcon />, <ExitToAppIcon />]

const drawerWidth = 220;
const smallDrawerWidth = 60;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // background: 'rgb(247, 248, 252)',
    // background: '#F7F8FC',
    flexGrow: 1
  },
  drawer: {
    background: 'red',
    [theme.breakpoints.up('md')]: {
      width: smallDrawerWidth,
    },
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    'h6': {
      margin: 'none'
    }
  },
  listItem: {
    background: 'none',
    borderLeft: '5px solid #fff',
    padding: '1.5em 1em 1.5em 1em',

    // fontSize: '26xpx',
    // padding: '1em',
       //   // backgroundColor: location+text ? 'rgb(247, 248, 252)' : 'red',
                    //   // borderLeft: location+text ? '5px solid #8DC6F7' : '5px solid white',
                    //   // height: '65px',
                    //   // fontSize: '4px'
                    //   padding: '1.5em',

    '&.active': {
      // border: 'thick solid red',
      borderLeft: '5px solid #2493F3',
      borderTop: '1px solid #e7e7e7',
      background: '#F7F8FC',
      '& > div p': {
        color: '#666'
      },
      '& svg': {
        color: '#2493F3'
      }
    }
    
  },
  // necessary for content to be below app bar
  toolbar: {
    // ...theme.mixins.toolbar,
    // minHeight: '272px',
    minHeight: 72,
  },
  drawerPaper: {
    // background: '#F7F8FC',
    boxShadow: '1px 0 3px #f1f1f1',
    borderRight: '1px solid #e7e7e7',
    [theme.breakpoints.up('md')]: {
      width: smallDrawerWidth,
    },
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    // boxShadow: '-1px 0 10px #CCC',
    // marginLeft: '10px',
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - ' + smallDrawerWidth + 'px)'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'calc(100% - ' + drawerWidth + 'px)'
    }
  },
  search: {
    position: 'relative',
    float: 'right',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.black, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.black, 0.25),
    // },
    borderBottom: '1px solid #e7e7e7',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState(null);
  const context = React.useContext(MyContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (url) => {
    if (document.getElementById('globalsearch')) {
      document.getElementById('globalsearch').value = '';
    }

    if(url==="Sign Out") {
      context.logout();
    } else {
      props.history.push('/ManagerView/' + url);
    }
  }

  const handleSearch = () => {
    // alert(context.state);
    //context.
    // context.state.test = 'wild';
  }

  const location = props.history.location.pathname==="/ManagerView/";
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          style={{
            padding: '0px',
            width: '100%',
          }}
          className={classes.Listroot}>

          {['Dashboard', 'Latest Rack Changed', 'Inventory', /*'Manage User',*/ 'Sign Out'].map((text, index) => (
            <div key={index}>
              {index === 3 ? <div><br /><Divider /><br /></div> : ''}
                <ListItem
                  onClick={() => handleClick(text)}
                    // style={{
                    //   // backgroundColor: location+text ? 'rgb(247, 248, 252)' : 'red',
                    //   // borderLeft: location+text ? '5px solid #8DC6F7' : '5px solid white',
                    //   // height: '65px',
                    //   // fontSize: '4px'
                    //   padding: '1.5em',
                    // }}
                    button
                    key={text}
                    className={classes.listItem + (props.history.location.pathname==="/ManagerView/"+text ? " active" : " notactive")}
                    >

                    {/* <ListItemIcon
                      style={{
                        // padding: '0px',
                        // margin: '0px'
                      }}>
                      <img
                        src={location === "/ManagerView/" + text
                        ? activeIcons[index]
                        : defaultIcons[index]}
                        alt={index} />
                    </ListItemIcon> */}

                    <ListItemIcon>{activeIcons[index]}</ListItemIcon>
                    <ListItemText 
                      primary={<Typography type="body1">{text}</Typography>}
                      className={classes.listouter} />
                </ListItem>
          </div>
          ))}
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={2} color="secondary">
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="default"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" noWrap className={classes.title}>
             <img
              style={{
                margin: '0',
                maxHeight: '60px',
                maxWidth: '160px',
                width: 'auto',
                height: '100%',
                verticalAlign: 'middle',
                cursor: 'pointer'
              }}
              src={Logo}
              alt="Gather AI" 
               onClick={() => handleClick("Dashboard")} />
          </Typography>

          { props.history.location.pathname.indexOf("Latest Rack Changed") <= -1 &&
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                id="globalsearch"
              />
            </div>
          }
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="manager navigation">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            elevation={0}
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {/* <Toolbar /> */}
        <div className={classes.toolbar} />
        { props.children ? props.children : null }
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

// ResponsiveDrawer.contextType = MyContext;
export default ResponsiveDrawer;