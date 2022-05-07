import React, {
  Component
} from 'react';
import Dashboard from './Dashboard/ListView/listView';
// import Drawer from '../drawer/Drawer';
import Appbar from '../Appbar/newAppbar';
import MyContext from '../themeContext';
import ListView from './Dashboard/ListView/listView'
import Button from '@material-ui/core/Button';
import Logo from '../images/Gather_Logo_Color.svg';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

// import Rack from '../drawer/rack.png';
// import DashboardLogo from '../drawer/dashboard.png';
// import DashboardBlack from '../drawer/dashboardBlack.png';

// import Inventory from '../drawer/inventory.png';
// import ManageUserIcon from '../drawer/admin.png'
// import ManageUserActiveIcon from '../drawer/admin_active.png'
// import '../drawer/Drawer.css';

// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
// import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
// import ListSharpIcon from '@material-ui/icons/ListSharp';
// import LowPrioritySharpIcon from '@material-ui/icons/LowPrioritySharp';

import './ManagerView.css'
import { Hidden, IconButton } from '@material-ui/core';
import ResponsiveDrawer from './MapView/ResponsiveDrawer';

const drawerWidth = 240;
const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});



class ManagerView extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     open: true
  //   }
  //   this.CloseDrawer = this.CloseDrawer.bind(this);
  //   this.OpenDrawer = this.OpenDrawer.bind(this);
  // }

  // constructor(props) {
  //   super(props);
  //   // this.handleClick = this.handleClick.bind(this);
  //   // this.context.history.push('/');
  // }
  componentWillMount() {
    if (this.context.state.token == null || this.context.state.user != "Manager") {
      // TODO: fix this token check
      // this.context.history.push('/');
      // console.log('Invalid page load: ', this.context.state.token, this.context.state.user);
      // this.getCookieTable();
      this.context.history.push('/');
      return false;
    } 
    else {  
      if (this.getCookie('S1Mission') == "") {
        this.initialize();
      } else {
        this.getCookieTable();
      }
    }
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  getCookieTable() {
    console.log("Manager Previous state loaded")
    let STable1 = {};
    let STable2 = {};
    let ITable1 = {};
    let ITable2 = {};

    STable1.SMission = this.getCookie('S1Mission');
    STable1.SStructure = this.getCookie("S1Structure")
    STable1.SCount = this.getCookie("S1Count")
    STable1.SDate = this.getCookie("S1Date")
    STable1.STime = this.getCookie("S1Time")
    STable1.SDownload = this.getCookie("S1Download")

    STable2.SMission = this.getCookie('S2Mission');
    STable2.SStructure = this.getCookie("S2Structure")
    STable2.SCount = this.getCookie("S2Count")
    STable2.SDate = this.getCookie("S2Date")
    STable2.STime = this.getCookie("S2Time")
    STable2.SDownload = this.getCookie("S2Download")

    ITable1.IPhotos = this.getCookie("I1Photos")
    ITable1.IProduct = this.getCookie("I1Product")
    ITable1.IUPC = this.getCookie("I1UPC")
    ITable1.IQuantity = this.getCookie("I1Quantity")
    ITable1.ICondition = this.getCookie("I1Condition")
    ITable1.ILocation = this.getCookie("I1Location")
    ITable1.IDate = this.getCookie("I1Date")
    ITable1.IDescription = this.getCookie("I1Description")

    ITable2.IPhotos = this.getCookie("I2Photos")
    ITable2.IProduct = this.getCookie("I2Product")
    ITable2.IUPC = this.getCookie("I2UPC")
    ITable2.IQuantity = this.getCookie("I2Quantity")
    ITable2.ICondition = this.getCookie("I2Condition")
    ITable2.ILocation = this.getCookie("I2Location")
    ITable2.IDate = this.getCookie("I2Date")
    ITable2.IDescription = this.getCookie("I2Description")

    this.context.updateValue('STable1', STable1);
    this.context.updateValue('STable2', STable2);

    this.context.updateValue('ITable1', ITable1);
    this.context.updateValue('ITable2', ITable2);

  }

  initialize() {
    
    let ITable1 = {};
    let ITable2 = {};
    let STable1 = {};
    let STable2 = {};

    STable1.SMission = 'true'
    STable1.SStructure = 'false'
    STable1.SCount = 'false'
    STable1.SDate = 'true'
    STable1.STime = 'true'
    STable1.SDownload = 'true'

    STable2.SMission = 'true'
    STable2.SStructure = 'false'
    STable2.SCount = 'false'
    STable2.SDate = 'true'
    STable2.STime = 'true'
    STable2.SDownload = 'true'

    ITable1.IPhotos = 'true'
    ITable1.IProduct = 'true'
    ITable1.IUPC = 'true'
    ITable1.IQuantity = 'true'
    ITable1.ICondition = 'false'
    ITable1.ILocation = 'true'
    ITable1.IDate = 'true'
    ITable1.IDescription = 'false'

    ITable2.IPhotos = 'true'
    ITable2.IProduct = 'true'
    ITable2.IUPC = 'true'
    ITable2.IQuantity = 'true'
    ITable2.ICondition = 'false'
    ITable2.ILocation = 'true'
    ITable2.IDate = 'true'
    ITable2.IDescription = 'false'

    this.context.updateValue('STable1', STable1);
    this.context.updateValue('STable2', STable2);

    this.context.updateValue('ITable1', ITable1);
    this.context.updateValue('ITable2', ITable2);

    this.initializeCookie();

  }

  initializeCookie() {
    this.setCookie('S1Mission', 'true');
    this.setCookie("S1Structure", 'false')
    this.setCookie("S1Count", 'false')
    this.setCookie("S1Date", 'true')
    this.setCookie("S1Time", 'true')
    this.setCookie("S1Download", 'true')

    this.setCookie('S2Mission', 'true');
    this.setCookie("S2Structure", 'false')
    this.setCookie("S2Count", 'false')
    this.setCookie("S2Date", 'true')
    this.setCookie("S2Time", 'true')
    this.setCookie("S2Download", 'true')

    this.setCookie("I1Photos", 'true')
    this.setCookie("I1Product", 'true')
    this.setCookie("I1UPC", 'true')
    this.setCookie("I1Quantity", 'true')
    this.setCookie("I1Condition", 'false')
    this.setCookie("I1Location", 'true')
    this.setCookie("I1Date", 'true')
    this.setCookie("I1Description", 'false')

    this.setCookie("I2Photos", 'true')
    this.setCookie("I2Product", 'true')
    this.setCookie("I2UPC", 'true')
    this.setCookie("I2Quantity", 'true')
    this.setCookie("I2Condition", 'false')
    this.setCookie("I2Location", 'true')
    this.setCookie("I2Date", 'true')
    this.setCookie("I2Description", 'false')
  }

  setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  render() {
    return (
      <ResponsiveDrawer children={this.props.children || null} history={this.props.history} />
    );
  }
}

ManagerView.contextType = MyContext;
export default withStyles(useStyles)(ManagerView);