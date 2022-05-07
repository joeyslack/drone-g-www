import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import Noimage from '../../icons/noImage.png';
import blank from '../../icons/blank.svg';
import './myclass.css';
import Collapse from '../../icons/Collapse.png'
import { Button, Paper, withStyles } from '@material-ui/core';
import  MyContext from '../../../themeContext';
import GetData from './getData';
import CloseIcon from '@material-ui/icons/Close';

import * as moment from 'moment';

let click=false;
let clicktwo=false;
let fullScreen=false;
//import GetPictures from './getPictures'



// const offlineimage =
// [
//   {imageUrl:'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687',captureTime:'aaaaaaaaaaaaaaa'},
//   {imageUrl:'https://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg',captureTime:'aaaaaaaaaaaaaaa'},
//   {imageUrl:'https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg',captureTime:'aaaaaaaaaaaaaaa'}
// ]

const style = theme => ({
    inventoryTablePhoto: {
      fontSize: "16px",
      lineHeight: "24px",
      '& td:first-child': {
        color: '#8B90A0',
        textTransform: 'capitalize'
      },
      '& td': {
        color: '#232735',
      }
    },

});


class ImageModal extends Component{
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state={
      images:[{
        original: blank,
        thumbnail: null,
        originalClass:"thumbnail",
        thumbnailClass:"two",
        active: null,
        activeIndex: 0,
      }]}

    this.setImages=this.setImages.bind(this);
    this._onSlide=this._onSlide.bind(this);
  }


    
  myFunction = (e) =>
  {
    if(click==false)
    {
      click=true
      setTimeout(() => this.checkDoubleClick(e), 200)
    }
    else if(click==true)
    {
      clicktwo=true;
      console.log('setTrue')
    }
    
  }

  checkDoubleClick = (e) =>
  {
    console.log('check');
    if(clicktwo==true)
    {
      this.doubleClickAction(e);
      click=false;
      clicktwo=false;
    }

    else
    {
      click=false;
    }

  }

  doubleClickAction = (e) =>
  {
    if(e.target.nodeName ==="IMG")
    {
    
      if(fullScreen==false)
      {
        this.myRef.current.fullScreen();
        fullScreen=true;
      }
      else 
      {
        this.myRef.current.exitFullScreen()
        fullScreen=false;
      }
    }
  }




  componentDidMount(){

    // document.addEventListener('click',this.myFunction);
    //  document.addEventListener('dblclick',this.myFunction);

      let additionalData={
        token:this.context.state.token
      }

    if(!this.state.active && this.props.active)
    {
      // Use state for props.active
      this.setState({active: this.props.active });

      // alert(this.props.active.inventoryId + '___' + this.props.active.productId);
      // console.log(this.props.active, '---active');

      if (this.props.active.inventoryId) {
        //
        // GetData(this.context.state.baseUrl+'/products/'+this.props.active.inventoryId+'/images',additionalData,this.setImages)
        
        // Get images from props, instead of making a fresh call for them, might prevent mismatch on array index results
        let imageSet = [];
        this.props.Inventory.forEach(i => {
          imageSet.push({
            captureTime: i.date,
            imageUrl: i.imageUrl
          });
        });

        this.setImages({
          response: {
            images: imageSet,
          },
          responseCode: "Success"
        });

      }
      else if (this.props.active.productId) {
        GetData(this.context.state.baseUrl+'/products/'+this.props.active.productId+'/images',additionalData,this.setImages)
      }
    }
  }
    // componentWillUnmount()
    // {
    //   document.removeEventListener('click',this.myFunction);
    // }
    // Handle gallery slide, item index
    _onSlide(index) {
      if (this.props.Inventory && this.props.Inventory.length > 0 && this.props.Inventory[index]) {
        this.setState({active: this.props.Inventory[index]});
      }
    }

    setImages(response,token) {
      console.log(response, '--images response-');
      if (response.responseCode==='Success') {   
        let images = response.response.images
        let newimage = [];
        
        if (images.length > 0) { 
          images.map((image, id) => {
            newimage.push({
              original: image.imageUrl,
              thumbnail: image.imageUrl,
              originalClass:"one", 
              thumbnailClass:"two",
              captureTime: image.captureTime
            });  
          })
        }

        else {
          newimage.push({
            original: blank,
            thumbnail: blank,
            originalClass: "one",
            thumbnailClass: "two"
          });
        }
        // alert(images.findIndex(o => o.imageUrl === this.props.active.imageUrl));
        this.setState({
          images: newimage, 
          activeIndex: images.findIndex(o => o.imageUrl === this.props.active.imageUrl)
        });
      }
      // else if (response.status===401){
      //   this.context.logout();
      // }
      
      else console.log("Bad response", response);
    }
    
    render() {
        const {classes} = this.props;
      
        return (
            <div className="ImageModalMainDiv">           
              <div style={{fontSize:'20px',fontFamily:'SF UI TEXT Regular',paddingTop:'10px',paddingBottom:'10px', color: 'rgba(0, 0, 0, 0.6)'}}>Product Details</div> 
              <div><Button onClick={ this.props.modalClose } style={{position:'absolute',top:'10px', right:'15px'}}><CloseIcon fontSize="large" /></Button></div>
                
                <div className='dashboard-img-modal-main-div' style={{display:'block',width:'100%',height:'100%'}}>                    
                      <Paper elevation={3} className="ImageModalMainDiv-table-div" style={{minWidth: '300px'}}>
                        {/* <div style={{fontSize:'20px',fontFamily:'SF UI TEXT Regular',paddingTop:'10px',paddingBottom:'10px', color: 'rgba(0, 0, 0, 0.6)'}}>{this.state.active?this.state.active.productName:null}</div>
                        <div style={{fontSize:'13px',fontFamily:'SF UI TEXT Regular',paddingBottom:'10px'}}> <span className="head1" style={{paddingRight:'7px'}}>Location  </span>       {this.state.active?this.state.active.binCode:null} </div>
                        <div style={{fontSize:'13px',fontFamily:'SF UI TEXT Regular',paddingBottom:'10px'}}> <span className="head1" style={{paddingRight:'28px'}}>Serial </span>          {this.state.active?this.state.active.productCode:null}</div>
                        <div style={{fontSize:'13px',fontFamily:'SF UI TEXT Regular',paddingBottom:'10px'}}> <span className="head1" style={{paddingRight:'33px'}}>Date </span>            {this.state.active?this.state.active.scannedOn.split('T')[0]:null}</div>
                        <div style={{fontSize:'13px',fontFamily:'SF UI TEXT Regular',paddingBottom:'10px'}}> <span className="head1">Condition</span>        {this.state.active?this.state.active.condition:null}</div> */}
                        <table className={classes.inventoryTablePhoto}>
                          <tbody>
                          <tr>
                            <td style={{paddingRight: '1em', color: '#232735', fontSize: '16px'}} colSpan="2">{ this.state.active  && this.state.active.productName
                                ? this.state.active.productName
                                : null }
                                <br /><br />
                            </td>
                          </tr>
                          <tr>
                            <td style={{paddingRight: '2em'}}>Location</td>
                            <td>
                                { this.state.active && this.state.active.binCode
                                ? this.state.active.binCode
                                : null }
                            </td>
                          </tr>
                          <tr>
                            <td>Serial</td>
                            <td>
                              { this.state.active && this.state.active.productCode
                                ? this.state.active.productCode
                                : null }
                            </td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td>
                              { this.state.active && this.state.active.scannedOn
                                ? moment(this.state.active.scannedOn).format('M/d/YY')
                                : null }
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </Paper>
                    
                    

                    
                      <Paper elevation={3} className="ImageModalMainDiv-img-div" style={{overflow: 'none'}}>
                        <ImageGallery 
                              onSlide={this._onSlide}
                              ref={this.myRef} 
                              showFullscreenButton={false} 
                              showThumbnails={false} 
                              className="ImageMainClass" 
                              items={this.state.images} 
                              showPlayButton={false}
                              lazyLoad={true}
                              infinite={true}
                              startIndex={this.state.activeIndex}
                        />
                      </Paper>
                </div>
           {/* 
           
            <div style={{paddingTop:'10px',float:'right',width:'79%',background:'white',height:'calc(100% - 51px)',alignItems:'center',textAlign:'center',alignContent:'center'}}>
            
            <ImageGallery items={this.state.images}  style={{background:'yellow',height:'500px'}} showPlayButton={false}  />
            
            </div> */}



          </div>

        );
    }
}
ImageModal.contextType = MyContext;
export default withStyles(style)(ImageModal);