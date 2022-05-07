import React from 'react';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Rack from './rack.png';
import Dashboard from './dashboard.png';
//import Drone from './user-view-drone.png';
// import Mission from './mission.png';
import Inventory from './inventory.png';
import ManageUserIcon from './admin.png'
// import Person from './user.png';


const icons= [
     Dashboard,Rack,Inventory,ManageUserIcon
   ]

const useStyles = makeStyles(theme => ({
    typography: {
      padding: theme.spacing(2),
    },
    listouter:{
     
        fontSize:'4px'
    },
    Listroot: {
        width: '100%',
        maxWidth: 270,
        backgroundColor: theme.palette.background.paper,
        
      },
      listitem:{
        "&:hover": {
            backgroundColor: 'rgb(111, 173, 228)'
          },
          backgroundColor:'rgb(255, 255, 255,1)',
          height:'45px',
          fontSize:'4px'
      }
  }));

const MiniDrawer = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
       
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
      };
      const navclick = (text) => {
        props.history.push('/ManagerView/'+text);
        handleClose();
         }

    const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
    return ( 
        <div style={{paddingLeft:'10px'}} >

<IconButton   style={{background:anchorEl?'grey':'none',transition:'all 0.5s ease'}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon style={{color:'black'}} />
          </IconButton>


 
        <Popover



        
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
        }}
       
      >
       {/* ['Drone controller','Dashboard','Mission History', 'Latest Rack Changed', 'Inventory'] */}
       { ['Dashboard', 'Latest Rack Changed', 'Inventory','Manage User'].map((text, index) => (<div key={index}>
  <List
  component="nav"
      aria-labelledby="nested-list-subheader"
      style={{backgroundColor:'#232526',padding:'0px'}}
    
      className={classes.Listroot}
  >
    <ListItem className={classes.listitem} onClick={()=>navclick(text)}  button key={text}>
         <ListItemIcon>
         <img src={icons[index]}  alt={index}/>
        </ListItemIcon>
          <ListItemText primary={<Typography type="body2" style={{ fontSize:'13px',
           color:props.history.location.pathname==="/"+text?'#000000':'grey',
          }}>{text}</Typography>}className={classes.listouter}/>
       </ListItem>
       </List>
       {(index===0)||(index===2)?<Divider/>:null}
       </div>
))}



      </Popover>
      </div> );
}
 
export default MiniDrawer;