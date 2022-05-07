import React, { Component } from 'react';
import { CircularProgressbarWithChildren , buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import  '../../../fonts/font.css'
import './listview.css'

import './inventoryMetrics.css'
import { Paper } from '@material-ui/core';

class InventoryMetrics extends Component {
    constructor(props) {
        super(props);
        this.state = {   } 
    }
    
    render() { 
        return ( 
            <Paper  square className='inventoryMetrics-main-div-percent-white '>
                <div style={{width:'100%',height:'80%',padding:'0px',margin:'0px',backgroundColor:'#FFFFFF'}}>
                    <div  style={{paddingLeft:'5%',paddingRight:'5%',float:'left',minWidth:'100px',maxWidth:'40%',width:'35%'}}>
                        <CircularProgressbarWithChildren  value={ this.props.data.changePercentage }
                            styles={buildStyles({backgroundColor:'#F4FAFE', trailColor: '#FFFFFF', }) }
                            background={true}>
                            <div style={{ fontSize: '24px'}}>
                                <strong> { this .props.data.changePercentage }%</strong>
                            </div>
                            <div className="InventoryMetricsText1">
                                <strong> Total percent of <br/> changes </strong> 
                            </div>
                        </CircularProgressbarWithChildren > 
                    </div>

                    <div className="InventoryMetricsData">
                        <p className="im-text1"> {this.props.data.structureTotal} </p>
                        <p className="im-text2"> Total {this.props.structureName}</p>

                        <p className="im-text1"> {this.props.data.structureChanged}</p>
                        <p className="im-text2"> Number of {this.props.structureName} changed</p>

                        <p className="im-text1"> {this.props.data.structureUnchanged}</p>
                        <p className="im-text2"> Number of unchanged {this.props.structureName}</p>
                    </div>

                </div>

<div id='InventoryMetricsCircle'>
    {this.props.data.manHoursSaved}
</div>

<div id="InventoryMetricsBottomDiv">

    <div style={{padding:'0px',marginTop:'0px',height:'1px',background:'#F0F1F2',width:'100%'}}></div>


<div style={{textAlign:'center',color:'rgb(0,0,0,0.5)',fontSize:'13px',fontFamily:'SF UI Text Bold',paddingTop:'27px',paddingRight:'40px'}}>Man Hours Saved</div>

</div>


        </Paper> );
    }
}
 
export default InventoryMetrics;