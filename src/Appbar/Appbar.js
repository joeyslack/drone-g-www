import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
// import Avatar from '@material-ui/core/Avatar';


import {fade} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Db  from './DroneBattery.png';
import Fte from './FlightTimeEstimate.png';
import Mte from './MissionTimeEstimate.png';
import Rcb from './RadioControlBattery.png';
import SettingsIcon from '@material-ui/icons/Settings';

import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import MyContext from '../themeContext';




import './Appbar.css'
import '../fonts/font.css'
import Drawer from '../drawer/minidrawer'

import ExitIcon from './exit.png';
import UserIcon from './user.png';
import SettingsIcon2 from './settings.png';

const icons= [
  ExitIcon,UserIcon,SettingsIcon2
]

// import MyPopOver from './popOver1';
// import MyPopOver2 from './popOver2';

const styles2= theme =>({
    buttonMargin: {
        margin: theme.spacing(2),
        backgroundColor:'#4294d0'
      },
    appBar: {
        width: `calc(100%)`,
        
        backgroundColor:'white',
        color:'black'
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.5),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.9),
        },  marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(20),
          width: '300px',
        },
        
      },
      grow: {
        flexGrow: 1,
      },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          inputRoot: {
            color: 'inherit',fontSize:13
          },
          inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              width: 130,
              '&:focus': {
                width: 250,
              }, 
            },
        },
        avatar: {
            margin: 10,
          },
});
class MyAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = { anchorEl:null, }
    }


     handleClick = event => {
     
        this.setState({anchorEl:event.currentTarget})
      };
     handleClose = () => {
      this.setState({anchorEl:null})
      };
       navclick = (text) => {
        if(text==="Sign out")
        {
          this.context.logout();
        }
        else 
        {
          this.context.history.push('/ManagerView/'+text);}
          this.handleClose();
        }
   

   
   
    render() {
      const open = Boolean(this.state.anchorEl);
      const id = open ? 'simple-popover' : undefined; 
        const {classes} = this.props; 
        return (
        <div>
            <AppBar className={classes.appBar} position="fixed" >
                <Toolbar>

               <Drawer history={this.context.history}/> 
               
          <div className={classes.grow} />
                   
                     {/*  ------------------- POP OVERS  ----------------------------------*/}
                   
                   {/* <MyPopOver2/>
                   <div style={{marginLeft:'200px'}}>
                   <MyPopOver/>
                   </div> */}




                   {/*  -------------------SEARCH BAR ----------------------------------*/}

                    {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Proccesses (5)"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}



<IconButton style={{paddingBottom:'10px',marginBottom:'20px'}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
<img src={Mte} alt={"Mission Time Estimate"}/>   
</IconButton>
<div style={{top:'0px',height:'100%',width:100}}>
<p type="body2" style={{ fontSize:'12px',color:'#8B90A0',   padding:'0px',margin:'0px'}} className="FRegular">Mission Time Estimate</p>
<p type="body2" style={{ fontSize:'12px', fontFamily:'SF UI Text Semibold', padding:'0px',margin:'0px'}} >00:00 M</p>
</div>

<IconButton style={{paddingBottom:'10px',marginBottom:'20px'}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
<img src={Fte} alt={"Mission Time Estimate"}/>   
</IconButton>
<div style={{top:'0px',height:'100%',width:100}}>
<p type="body2" style={{ fontSize:'12px',color:'#8B90A0',   padding:'0px',margin:'0px'}} className="FRegular">Flight Time Estimate</p>
<p type="body2" style={{ fontSize:'12px', fontFamily:'SF UI Text Semibold', padding:'0px',margin:'0px'}} >00:00 M</p>
</div>

<IconButton style={{paddingBottom:'10px',marginBottom:'20px'}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
<img src={Rcb} alt={"Mission Time Estimate"}/>   
</IconButton>
<div style={{top:'0px',height:'100%',width:100}}>
<p type="body2" style={{ fontSize:'12px',color:'#8B90A0',   padding:'0px',margin:'0px'}} className="FRegular">Radio Control Battery</p>
<p type="body2" style={{ fontSize:'12px',color:'#F7C150', fontFamily:'SF UI Text Semibold', padding:'0px',margin:'0px'}} >40%</p>
</div>

<IconButton style={{paddingBottom:'10px',marginBottom:'20px'}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
<img src={Db} alt={"Mission Time Estimate"}/>   
</IconButton>
<div style={{top:'0px',height:'100%',width:70}}>
<p type="body2" style={{ fontSize:'12px',color:'#8B90A0',   padding:'0px',margin:'0px'}} className="FRegular">Drone Battery</p>
<p type="body2" style={{ fontSize:'12px',color:'#39E8BE', fontFamily:'SF UI Text Semibold', padding:'0px',margin:'0px'}} >70%</p>
</div>

     <div style={{paddingLeft:50}}>
<IconButton  onClick={this.handleClick} style={{paddingBottom:'10px',marginBottom:'0px'}} edge="start" className={classes.menuButton} color="default" aria-label="menu">
<SettingsIcon /> 
</IconButton>


<Popover
id={id}
open={open}
anchorEl={this.state.anchorEl}
onClose={this.handleClose}
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
{ ['Sign out', 'My Profile', 'Settings'].map((text, index) => (<div key={index}>
<List
component="nav"
aria-labelledby="nested-list-subheader"
style={{backgroundColor:'rgba(0, 0, 0, 0.03)',padding:'0px'}}

className={classes.Listroot}
>
<ListItem className={classes.listitem} onClick={()=>this.navclick(text)}  button key={text}>
 <ListItemIcon>
 <img src={icons[index]}  alt={index}/>
</ListItemIcon>
  <ListItemText primary={<Typography type="body2" style={{ fontSize:'13px',
   color:this.context.history.location.pathname==="/"+text?'#000000':'grey',
  }}>{text}</Typography>}className={classes.listouter}/>
</ListItem>
</List>
{(index===0)||(index===2)?<Divider/>:null}
</div>
))}
</Popover>
</div>
{/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           <img src={Db} alt={"Drone Battery"}/>
          </IconButton> */}



{/*  ------------------- AVATAR ----------------------------------*/}
   {/* <Avatar className={classes.avatar}>H</Avatar> */}


 </Toolbar>
</AppBar> 
        </div>  );
    }
}

MyAppBar.contextType=MyContext;
 
export default withStyles(styles2)(MyAppBar);