import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ImageGallery from 'react-image-gallery';
import "./App.css";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
    {
      original: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
   
  ];
class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { num:['1','2','3','4','5'] }
    }
    render() { 
        return (  <div style={{margin:'auto',width:'50%',padding:'auto',height:'100vh'}} className="flex-containercol">


<br/>
 <Button variant={"contained"} color="secondary" onClick={()=>{ this.props.history.push('./SignUp')}} >User SignUp</Button>
 <br/>
 <Button variant={"contained"} color="secondary" onClick={()=>{ this.props.history.push('./SignIn')}} >User SignIn</Button>

 <ImageGallery items={images}  />




        </div>);
    }
}
 
export default LandingPage;