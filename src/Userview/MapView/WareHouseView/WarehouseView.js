import React, { Component } from 'react';
import Aisle from './Aisle'
import './warehouseview.css'

import Expand from '../../../Managerview/icons/Expand.png'


class Warehouse extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() 
    { 
        return( 
        <div id="WareHouseDiv">
            <div style={{position:'absolute',right:'40px'}}>
                <img alt="Expand Me" src={Expand}/>
            </div>
            {this.props.Structure.children.map((aisle,id)=>
                <Aisle key= {aisle.code} aisleSide={aisle.direction} aisleName={aisle.label} Aisle={aisle} />
                )
            }
        </div>  
        );
    }
}
 
export default Warehouse;