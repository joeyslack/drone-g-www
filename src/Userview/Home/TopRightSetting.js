import React, { Component } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import Speed from './Speed.png';
import Hbr from './HeightBetweenRacks.png';
import Ms from './MoreSetting.png';
import Toh from './TakeOffHeight.png';

import '../../fonts/font.css'
import './home.css'


class TopRightSetting extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen:true  }
    }

    topright=()=>{


        if(this.state.isOpen)
        {
            document.getElementById('Homearrow').style.transform="scaleX(-1)";
            document.getElementById('Hometopright').style.right='0px'
        
    this.setState({isOpen:false})
    }
        else
        {document.getElementById('Hometopright').style.right='-12.5%'
            document.getElementById('Homearrow').style.transform="scaleX(1)"
        this.setState({isOpen:true})}
       
    }


    render() { 
        return ( <div id="Hometopright" className="HomeTopRightSetting">

        <div className="Homeshadow Homearrowbox1" style={{}} onClick={this.topright}>
          <ArrowBackIosIcon color="primary" style={{color:'#8B90A0'}} id='Homearrow'/>
        </div>
        
        <div  className="Homeshadow Homelistbox" style={{}}>
        <div style={{padding:'5%'}}>
           <Button style={{ textTransform:'none',width:'100%'}}  >
               <span style={{textAlign:'left',width:'25%',float:'left',paddingTop:'7px'}}><img src={Speed} alt={"Speed"}/></span>
           
           <span style={{width:'70%'}} className="Homelistbox1text"> Speed  </span>
           </Button>
        
           <Button style={{ textTransform:'none',width:'100%'}}  >
               <span style={{textAlign:'left',width:'25%',float:'left',paddingTop:'7px'}}><img src={Hbr} alt={"Height Between Racks"}/></span>
           
           <span style={{width:'70%'}} className="Homelistbox1text"> Height Between Racks  </span>
           </Button>
        
        
           <Button style={{ textTransform:'none',width:'100%'}}  >
               <span style={{textAlign:'left',width:'25%',float:'left',paddingTop:'7px'}}>   <img src={Toh} alt={"Take Off Height"}/>  </span>
           
           <span style={{width:'70%'}} className="Homelistbox1text"> Take off Height  </span>
           </Button>
        
           <Button style={{ textTransform:'none',width:'100%'}}  >
               <span style={{textAlign:'left',width:'25%',float:'left',paddingTop:'7px'}}>  <img src={Ms} alt={"More Setting"}/>     </span>
           
           <span style={{width:'70%'}} className="Homelistbox1text"> More Setting  </span>
           </Button>
        </div>
        </div>
        
        
        
        </div>  );
    }
}
 
export default TopRightSetting;