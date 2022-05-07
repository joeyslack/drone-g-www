import React, { Component } from 'react';
import Aisle from './Aisle'
import './warehouseview.css'

class Warehouse extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() 
    { 
        return( 
        <div id="WareHouseDiv" style={{height: '100%', width: '100%', background: ''}}>
            {this.props.Structure.children.map((aisle,id)=>
                <Aisle key={id} aisleSide={aisle.direction} aisleName={aisle.label} Aisle={aisle} MissionId={this.props.MissionId} />
                )
            }
        </div>  
        );
    }
}
 
export default Warehouse;