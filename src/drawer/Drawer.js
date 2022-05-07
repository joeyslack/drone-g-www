import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import Logo from '../images/Gather_Logo_Color.svg';
import Button from '@material-ui/core/Button';

import Rack from './rack.png';
import Dashboard from './dashboard.png';
import DashboardBlack from './dashboardBlack.png';
// import Drone from './user-view-drone.png'; import Mission from
// './mission.png'; import MissionBlack from './missionBlack.png';
import Inventory from './inventory.png';
import ManageUserIcon from './admin.png'
import ManageUserActiveIcon from './admin_active.png'
import './Drawer.css';

// import Person from './user.png'; import PersonActive from
// './user_active.png';

import ClearIcon from '@material-ui/icons/Clear';

// import ClearIcon from '@material-ui/icons/Clear';

const defaultIcons = [Dashboard, Rack, Inventory, ManageUserIcon]
const activeIcons = [DashboardBlack, Rack, Inventory, ManageUserActiveIcon]

const drawerWidth = '18%';
const styles1 = theme => ({
    drawer: {
        // width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        // width: '18%',
        backgroundColor: '',
        color: '#B9BABA'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: theme.spacing(1, 4),
        background: ''
    },
    Listroot: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper
    },
    drawerBottomButton: {
        color: '#4294d0',

        margin: theme.spacing(1),

        width: '90%'

    },
    drawerBottomText: {

        marginLeft: '20%',
        justifyContent: 'center',
        width: '60%',
        fontSize: 14
    },
    listouter: {
        padding: '0px',
        margin: '0px',
        fontSize: '4px'
    },
    drawerBottom: {
        position: 'sticky',
        top: '800px',
        textAlign: 'center'
    }
});

class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this
            .handleClick
            .bind(this);
        this.navclick = this
            .navclick
            .bind(this);
    }

    navclick(text, text1) {
        this
            .props
            .history
            .push('/' + text + '_' + text1);

    }

    handleClick(url) {

        this
            .props
            .history
            .push('/ManagerView/' + url)

    }

    render() {
        const {classes} = this.props;
        return (
            <div>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    open={this.props.open}
                    anchor="left"
                    classes={{
                    paper: classes.drawerPaper
                }}>

                    <div
                        className={classes.drawerHeader}
                        style={{
                         height: '65px'
                        }}>

                        <img
                            style={{
                              margin: '0',
                              maxHeight: '60px',
                              maxWidth: '160px',
                              width: 'auto',
                              height: '100%',
                            }}
                            src={Logo}
                            alt="Gather AI" />

                        <IconButton
                            style={{
                            position: 'absolute',
                            right: '10px',
                            top: '0px',
                            color: '#CCC'
                        }}
                            color="primary"
                            onClick={this.props.CloseDrawer}>
                            <CloseIcon/>
                        </IconButton>

                    </div>

                    {['Dashboard', 'Latest Rack Changed', 'Inventory', 'Manage User'].map((text, index) => (
                        <div key={index}>
                            {this.props.history.location.pathname === "/ManagerView/" + text
                                ? <Divider/>
                                : null}
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                style={{
                                backgroundColor: 'none',
                                padding: '0px',
                                width: '100%'
                            }}
                                className={classes.Listroot}>
                                <ListItem
                                    onClick={() => this.handleClick(text)}
                                    style={{
                                    paddingLeft: this.props.history.location.pathname === "/ManagerView/" + text
                                        ? '0px'
                                        : '',
                                    backgroundColor: 'rgb(255, 255, 255,1)',
                                    height: '65px',
                                    fontSize: '4px'
                                }}
                                    button
                                    key={text}>

                                    {this.props.history.location.pathname === "/ManagerView/" + text
                                        ? <div
                                                style={{
                                                width: '3px',
                                                height: '100%',
                                                marginTop: '0px',
                                                backgroundColor: '#2493F3',
                                                marginRight: '20px',
                                                paddingTop: '20px'
                                            }}></div>
                                        : null
}
                                    <ListItemIcon
                                        style={{
                                        padding: '0px',
                                        margin: '0px'
                                    }}>
                                        <img
                                            src={this.props.history.location.pathname === "/ManagerView/" + text
                                            ? activeIcons[index]
                                            : defaultIcons[index]}
                                            alt={index}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary=
                                        {<Typography type="body2" className="DrawerListItemText" style={{ color:this.props.history.location.pathname==="/ManagerView/"+text?'#000000':'#8B90A0', }}>{text}</Typography>}
                                        className={classes.listouter}/>
                                </ListItem>
                            </List>

                            {this.props.history.location.pathname === "/ManagerView/" + text
                                ? <Divider/>
                                : null}

                        </div>
                    ))}

                    {/* <div className={classes.drawerBottom}>

                <div className={classes.drawerBottomText}> Invite your team and start collaborating now!</div>
                <Button variant="outlined"  color="primary" width="100px" font="10px" className={classes.drawerBottomButton}>Invite to Base</Button>
              </div> */}

                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles1)(MyDrawer);