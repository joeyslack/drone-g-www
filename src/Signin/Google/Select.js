import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './select.css'
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>

 <div style={{margin:'auto',width:'50%',padding:'auto',height:'100vh'}} className="flex-containercol">



<Button variant={"contained"} color="secondary" onClick={()=>{ this.props.history.push('./SignUp')}} >Signin Fail</Button>
<br/>
 <Button variant={"contained"} color="secondary" onClick={()=>{ this.props.history.push('./Dashboard')}} >Sign in Accepted</Button>
 <br/>







        </div>

            </div> );
    }
}
 
export default Select;
