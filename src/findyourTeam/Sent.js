import React, { Component } from 'react';
class Sent extends Component {
    state = {  }
    render() { 
        return (<div style={{width:'50%',margin:'auto'}}>
        <p style={{margin:'0px',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}> Email Sent!</p>
 <p style={{paddingTop:'0px',paddingBottom:'10px',marginBottom:'0px',fontSize:'15px',color:'grey',lineHeight:'24px'}}>We've emailed a special link to <span style={{fontWeight:'bold'}}>{this.props.email}</span>. Click the link to confirm your address and get started.</p>

 
          
     
     
     </div> );
    }
}
 
export default Sent;