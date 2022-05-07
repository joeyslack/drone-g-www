import React, { Component } from 'react';

import WarehouseView from './WareHouseView/WarehouseView';
import AisleView from './AisleView/AisleView';

import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DotLoader from 'react-spinners/DotLoader';


import './mapview.css'
class MapViewSmall extends Component {
    constructor(props) {
        super(props);
        this.state = { warehouseView:true,aisleView:false,  }
        this.changeView=this.changeView.bind(this);

    }
    changeView(state)
    {
        if(state===true)
        {
            if(this.state.warehouseView===false)
            {
                this.setState({warehouseView:true})
            }
        }

        if(state===false)
        {
            if(this.state.warehouseView===true)
            {
                this.setState({warehouseView:false})
            }
        }
    }
    render() { 
        return ( 
        <div id="MapViewSmallDiv" style={{background:''}}>
            <Paper square elevation={3} style={{height:'30px',width:'100%'}}>  
                    <span style={{display:'inline-block',height:'30px',borderRadius:'0px',width:'26%',background:'',textAlign:'center'}}>
                        <Button style={{textTransform:'none', color:this.state.warehouseView?'#8B90A0':' #232735',fontSize:'14px',fontFamily:'SF UI Text SemiBold',height:'30px',borderRadius:'0px',borderBottom:this.state.warehouseView?null:'3px solid #2493F3'}} onClick={()=>this.changeView(false)} >
                            Aisle
                        </Button>
                    </span>
                    <span style={{ display:'inline-block',height:'30px',borderRadius:'0px',width:'36%',background:'',textAlign:'center'}}>
                        <Button style={{textTransform:'none', color:this.state.warehouseView?' #232735':'#8B90A0',fontSize:'14px',fontFamily:'SF UI Text SemiBold',height:'30px',borderRadius:'0px',borderBottom:this.state.warehouseView?'3px solid #2493F3':null}} onClick={()=>this.changeView(true)}>
                            Warehouse
                        </Button>
                    </span>  
                    <span style={{ display:'inline-block',height:'30px',borderRadius:'0px',width:'38%',background:'',textAlign:'center'}}>
                        <Button style={{textTransform:'none', color:'#8B90A0',fontSize:'14px',fontFamily:'SF UI Text SemiBold',height:'30px',borderRadius:'0px'}} onClick={()=>this.changeView(true)}>
                            Set Mission
                        </Button>
                    </span> 
               </Paper>
               {
               this.props.StructureResponse==='Success'?this.state.warehouseView?
               <div style={{height:'calc(100% - 60px)', overflowY:'auto'}}>
                   <WarehouseView Structure={this.props.Structure}/>
               </div>
                :
                <div style={{ background:'',height:'calc(100% - 60px)', overflowY:'auto'}}>
                   <AisleView Structure={this.props.Structure}/>
               </div>:
               <div style={{background:'',paddingLeft:'calc(50% - 50px)',height:'calc(50%)',paddingTop:'calc(50% - 158px)'}}>
                   <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
               </div>
              } 
              <Paper square elevation={3} style={{width:'100%',height:'30px',padding:'0px',margin:'0px',textAlign:'center'}}>
                <span id="MapViewPaper" style={{background:'#3EE9CA'}}> </span>  <span id="MapViewPaperText" > Units changed </span> 
                <span id="MapViewPaper" style={{background:'#28A5F6'}}> </span>  <span id="MapViewPaperText" > Units scanned </span> 
                <span id="MapViewPaper" style={{background:'#EC6761'}}> </span>  <span id="MapViewPaperText" > Units error </span> 
              </Paper>
        </div>
             );
    }
}
 
export default MapViewSmall;