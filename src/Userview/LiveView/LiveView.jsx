import React,{Component} from 'react';
import TopRightSetting from './TopRightSetting';
import BottomLeftThumb from './BottomLeftThumb';
// import Button from '@material-ui/core/Button';

import GoHome from './GoHome.png';
import Landing from './Landing.png';
import { IconButton } from '@material-ui/core';

import GetData from './getData';

import MyContext from '../../themeContext';
import BG from './BG.png'


class LiveView extends Component {

    constructor(props)
    {
        super(props);
        this.state={Structure:{},OS:{},StructureResponse:null,LevelCount:0}
        this.setMapView=this.setMapView.bind(this);

    }

    componentDidMount(){
        this.initialize();
    }

    initialize(){

        let additionalData={
            token:this.context.state.token,
        }


        GetData(this.context.state.baseUrl+'/warehouse/structure',additionalData,this.setMapView)

    }

    setMapView(response,token){
        if(response.responseCode==='Success')
        {
            this.context.updateValue('token',token)
            this.setState({Structure:response.response.structure,OS:response.response.structure,StructureResponse:'Success',LevelCount:response.response.levelCount})
             this.context.updateSession(token)
             console.log(response.response.structure);
        }
        else if (response.status===401){

            this.context.logout();
        }

      
    
       else console.log(response)
    }

   

     

    render(){

        return(
            <div style={{ height:'100vh',position:'relative',display:'block',overflowX:'hidden',background:`url(${BG})`}}>



<div style={{}} className="LiveViewleftcenter">
 
<IconButton style={{padding:'0px'}}> <img src={GoHome}  alt="GoHome"/> </IconButton>
<br/>
<IconButton style={{padding:'0px'}}> <img src={Landing} alt="landing"/> </IconButton>

</div>



<TopRightSetting/>

<BottomLeftThumb StructureResponse={this.state.StructureResponse} Structure={this.state.Structure} LevelCount={this.state.LevelCount}/>


</div>

        );
    }
}

LiveView.contextType=MyContext
export default LiveView;