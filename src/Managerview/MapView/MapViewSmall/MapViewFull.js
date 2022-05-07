import React, { Component } from 'react';

import WarehouseView from '../WareHouseView/WarehouseView';
import AisleView from '../AisleView/AisleView';

import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DotLoader from 'react-spinners/DotLoader';


import './mapviewsmall.css'
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
            <Paper square elevation={3} style={{height:'30px',width:'100%',background:''}}>  
                    <span style={{display:'inline-block',height:'30px',borderRadius:'0px',width:'50%',background:'',textAlign:'center'}}>
                        <Button  style={{ color:this.state.warehouseView?'#8B90A0':' #232735',fontSize:'14px',fontFamily:'SF UI Text Bold',height:'30px',borderRadius:'0px',borderBottom:this.state.warehouseView?null:'3px solid #2493F3'}} onClick={()=>this.changeView(false)} >
                            Aisle
                        </Button>
                    </span>
                    <span style={{display:'inline-block',height:'30px',borderRadius:'0px',width:'50%',background:'',textAlign:'center'}}>
                        <Button style={{color:this.state.warehouseView?' #232735':'#8B90A0',fontSize:'14px',fontFamily:'SF UI Text Bold',height:'30px',borderRadius:'0px',borderBottom:this.state.warehouseView?'3px solid #2493F3':null}} onClick={()=>this.changeView(true)}>
                            Warehouse
                        </Button>
                    </span>  
               </Paper>
               {
               this.props.StructureResponse==='Success'?this.state.warehouseView?
               <div style={{height:'calc(100% - 60px)', overflowY:'auto', background:''}}>
                   <WarehouseView Structure={this.props.Structure}/>
               </div>
                :
                <div style={{ background:'',height:'calc(100% - 60px)', overflowY:'auto'}}>
                   <AisleView Structure={this.props.Structure}/>
               </div>:
               <div style={{background:'',height:'calc(100% - 60px)'}}>
                   <div style={{ background:'',paddingLeft:'calc(50% - 50px)', paddingTop:'calc(50% - 140px)' }}>
                       <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
                    </div>
               </div>
              } 
              <Paper square elevation={3} style={{width:'100%',height:'30px',padding:'0px',margin:'0px',textAlign:'center'}}>
                <span id="MapViewPaper" style={{background:'#3EE9CA'}}> </span>  <span style={{paddingRight:'20px',color:'#8B90A0',fontSize:'13px'}}> Units changed </span> 
                <span id="MapViewPaper" style={{background:'#28A5F6'}}> </span>  <span style={{paddingRight:'20px',color:'#8B90A0',fontSize:'13px'}}> Units scanned </span> 
                <span id="MapViewPaper" style={{background:'#EC6761'}}> </span>  <span style={{paddingRight:'20px',color:'#8B90A0',fontSize:'13px'}}> Units error </span> 
              </Paper>
        </div>
             );
    }
}
 
export default MapViewSmall;