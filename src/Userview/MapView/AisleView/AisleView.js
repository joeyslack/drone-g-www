import React, { Component } from 'react';
import AisleSmall from './AisleSmall';
import './aisleview.css';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';



class AisleView extends Component {
    constructor(props) {
        super(props);
        this.state = { activeKey:0, totalKey:null }
        this.handleNext=this.handleNext.bind(this);
    }
    handleNext(state)
    {
        if(state===true)
        {  let activeKey=this.state.activeKey;
            if(this.state.activeKey < this.props.Structure.children.length-1)
            {   
                activeKey=activeKey+1;
                this.setState({activeKey});
            }
        }
        else if(state===false)
        {  let activeKey=this.state.activeKey;
            if(this.state.activeKey > 0)
            {   
                activeKey=activeKey-1;
                this.setState({activeKey});
            }
        }
    }
    render() { 
        return ( 
        <div id="AisleViewDiv">
          
            <div style={{height:'29px',background:'',textAlign:'left',borderBottom:'1px solid #C9D0E2'}}>
                <span style={{lineHeight:'30px',fontFamily:'SF UI Text Regular',fontSize:'12px'}}> {this.props.Structure.children[this.state.activeKey].label} | {this.props.Structure.children[this.state.activeKey].side} </span>
                <div style={{display:'inline-block',float:'right'}}>
                    <span className="ChevronIcon" style={{color:this.state.activeKey<1?'#8B90A0':'black', background:this.state.activeKey<1?'#F7F8FC':null }} onClick={()=>this.handleNext(false)} > <ChevronLeftIcon  style={{verticalAlign:'text-bottom'}}   /> </span>
                    <span className="ChevronIcon" style={{color:this.state.activeKey<this.props.Structure.children.length-1?'black':'#8B90A0',background:this.state.activeKey<this.props.Structure.children.length-1?null:'#F7F8FC'}}>  <ChevronRightIcon style={{verticalAlign:'text-bottom'}}  onClick={()=>this.handleNext(true)}  /> </span>
                </div>
            </div>

            

            <div style={{width:'calc(100%)',height:'calc(100% - 30px)'}}>
                <AisleSmall Structure={this.props.Structure.children[this.state.activeKey]} />
            </div>

        </div>  );
    }
}
 
export default AisleView;