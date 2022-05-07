import React, { Component } from 'react';
import Appbar from '../Appbar/Appbar'
import MyContext from '../themeContext';





import '../fonts/font.css'
import './userview.css'


class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    componentDidMount(){
        if(  this.context.state.user!=="Member")
        {
            this.context.history.push('/');
        }
       
    }
    

    
    render() { 
        return ( 
            <div style={{display:'block',position:'relative',minHeight:'0px', overflowX:'hidden'}} >
                <Appbar history={this.props.history}/>
            </div>
         );
    }
}
 UserView.contextType=MyContext;
export default UserView;