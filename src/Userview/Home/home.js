import React,{Component} from 'react';
import TopRightSetting from './TopRightSetting';
import BottomLeftThumb from './BottomLeftThumb';
import Button from '@material-ui/core/Button';

import GoHome from './GoHome.png';
import Landing from './Landing.png';
import { IconButton } from '@material-ui/core';

// import GetData from './getData';

import MyContext from '../../themeContext';


class Home extends Component {

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

        // let additionalData={
        //     token:this.context.state.token,
        // }


        //GetData(this.context.state.baseUrl+'/warehouse/structure',additionalData,this.setMapView)

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
            <div style={{ height:'100vh',position:'relative',display:'block',overflowX:'hidden'}}>
<div style={{textAlign:'center'}} className="Homecenter">
<p style={{fontSize:'24px',fontFamily:'SF UI Text Bold'}}>No Data Yet!</p>
<p style={{color:'#8B90A0',fontSize:'15px',fontFamily:'SF UI Text Regular'}}>Please complete the first mission <br/> to see changes in the warehouse</p>
<Button variant="contained" onClick={()=>{this.props.history.push('./setmission')}}style={{ fontSize:'15px',fontFamily:'SF UI Text Regular', color:'white',textTransform:'none',height:'50px',borderRadius:'0px',width:'100%' , background:'#2493F3'}}>Set Mission</Button>
</div>



<div style={{}} className="Homeleftcenter">
 
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

Home.contextType=MyContext
export default Home;