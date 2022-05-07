import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import Noimage from './noImage2.png';
import blank from '../../icons/blank.svg';
import './myclass1.css';
import Collapse from '../../icons/Collapse.png'
import { Button, withStyles, Paper } from '@material-ui/core';
import  MyContext from '../../../themeContext';
import GetData from './getData';
import BinTable from './BinTable';
import CloseIcon from '@material-ui/icons/Close';
import * as moment from 'moment';

let click=false;
let clicktwo=false;
let fullScreen=false;

//import GetPictures from './getPictures'

const inventoryPageSize=10;


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


// const offlineimage =
// [
//   {imageUrl:'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687',captureTime:'aaaaaaaaaaaaaaa'},
//   {imageUrl:'https://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg',captureTime:'aaaaaaaaaaaaaaa'},
//   {imageUrl:'https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg',captureTime:'aaaaaaaaaaaaaaa'}
// ]
class ImageModal extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      images: [{
        original: blank,
        thumbnail: blank,
        originalClass: "one",
        thumbnailClass: "two",
        active: null,
      }],
      Inventory: [],
      InventoryResponse: null,
      InventoryPageNumber: 1,
      InventoryTotalPages: null,
      InventoryTotalRecords: null,
      recordBy: 30
    }

    this.setImages = this.setImages.bind(this);
    this.setBinTable = this.setBinTable.bind(this);
  }

  myFunction = (e) => {
    if (click == false) {
      click = true
      setTimeout(() => this.checkDoubleClick(e), 200)
    } else if (click == true) {
      clicktwo = true;
      console.log('setTrue')
    }

  }

  checkDoubleClick = (e) => {
    console.log('check');
    if (clicktwo == true) {
      this.doubleClickAction(e);
      click = false;
      clicktwo = false;
    } else {
      click = false;
    }

  }

  doubleClickAction = (e) => {
    if (e.target.nodeName === "IMG") {

      if (fullScreen == false) {
        this.myRef.current.fullScreen();
        fullScreen = true;
      } else {
        this.myRef.current.exitFullScreen()
        fullScreen = false;
      }
    }
  }

  componentDidMount() {

    // document.addEventListener('click', this.myFunction);

    let additionalData = {
      token: this.context.state.token
    }

    if (this.props.binId != null && this.props.MissionId) {
      GetData(this.context.state.baseUrl + '/missions/' + this.props.MissionId + '/bins/' + this.props.binId + '/images', additionalData, this.setImages)
      GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + inventoryPageSize + '&pagenumber=1&period=lastdays&days=' + this.state.recordBy + '&sortby=product&sortdirection=asc&missionId=' + this.props.MissionId + '&binID=' + this.props.binId, additionalData, this.setBinTable)
    }

  }

  sortBinData(sortBy, sortOrder, period, page) {
    let Inventory = [];
    this.setState({ Inventory, InventoryResponse: null, InventoryOrder: sortBy, InventoryOrderBy: sortOrder })

    let additionalData = {
      token: this.context.state.token,
    }

    GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + inventoryPageSize + '&pagenumber=' + page + '&period=lastdays&days=' + period + '&sortby=' + sortBy + '&sortdirection=' + sortOrder + '&missionId=' + this.props.MissionId + '&binID=' + this.props.binId, additionalData, this.setBinTable)
  }

  moreBinData(sortBy, sortOrder, period, page) {

    console.log(page)

    let additionalData = {
      token: this.context.state.token,
    }
    GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + inventoryPageSize + '&pagenumber=' + page + '&period=lastdays&days=' + period + '&sortby=' + sortBy + '&sortdirection=' + sortOrder + '&missionId=' + this.props.MissionId + '&binID=' + this.props.binId, additionalData, this.setBinTable)
  }

  setBinTable(response, token) {

    if (response.responseCode === 'Success') {
      let Inventory = this.state.Inventory;
      Inventory.push(...response.response.products)
      this.context.updateValue('token', token)
      this.setState({ Inventory, InventoryResponse: 'Success', InventoryPageNumber: response.response.pageNumber, InventoryTotalPages: response.response.totalPages, InventoryTotalRecords: response.response.totalRecords })
      this.context.updateSession(token)
    } else if (response.status === 401) {
      this.context.logout();
    } else {
      this.setState({ InventoryResponse: 'Success' });
      console.log(response)
    }
  }

  setImages(response, token) {
    if (response.responseCode === 'Success') {
      console.log(response.response)

      let images = response.response.images
      let newimage = [];
      if (images.length > 0) {
        images.map((image, id) => {
          newimage.push({
            original: image.imageUrl,
            thumbnail: image.imageUrl,
            originalClass: "one",
            thumbnailClass: "two",
            captureTime: image.captureTime,
          })
        })
      } else {
        newimage.push({
          original: Noimage,
          thumbnail: Noimage,
          originalClass: "one",
          thumbnailClass: "two"
        })
      }
      this.context.updateValue('token', token);
      this.setState({ images: newimage });
      this.context.updateSession(token);
    } 
    else console.log(response)
  }

  // sortInventoryData(sortBy, sortOrder, period, page) {
  //   console.log('me')
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('click', this.myFunction);
  // }

  render() {
    return (
      <div className="ImageModalMainDiv">
            
        <div style={{fontSize:'20px',fontFamily:'SF UI TEXT Regular',paddingTop:'10px',paddingBottom:'10px', color: 'rgba(0, 0, 0, 0.6)'}}>Bin Details</div> 
        <div><Button onClick={ this.props.modalClose } style={{position:'absolute',top:'10px', right:'15px'}}><CloseIcon fontSize="large" /></Button></div>

                
        <div className='dashboard-img-modal-main-div'>
          <div style={{display:'block',width:'100%',height:'100%'}}>
                <BinTable 
                  PageSize={inventoryPageSize} 
                  InventoryTotalRecords={this.state.InventoryTotalRecords} 
                  InventoryPageNumber={this.state.InventoryPageNumber} 
                  InventoryTotalPages={this.state.InventoryTotalPages} 
                  InventoryResponse={this.state.InventoryResponse} 
                  Inventory={this.state.Inventory} 
                  sortData={(sortBy,sortOrder,period,page)=>this.sortBinData(sortBy,sortOrder,period,page)} 
                  nextPage={(sortBy,sortOrder,period,page)=>this.moreBinData(sortBy,sortOrder,period,page)} />
          </div>
        </div>
      </div>
    )
  }
}

ImageModal.contextType = MyContext;
export default withStyles(style)(ImageModal);

//   render() {
//     return (
//       <div className="ImageModalMainDiv1" style={{height: '100%', width: '100%', overflow: 'hidden'}}>
             
//               <div style={{fontSize:'20px',fontFamily:'SF UI TEXT Regular',paddingTop:'10px',paddingBottom:'10px', color: 'rgba(0, 0, 0, 0.6)'}}>Bin Details</div> 
//               <div><Button onClick={ this.props.modalClose } style={{position:'absolute',top:'10px', right:'15px'}}><CloseIcon fontSize="large" /></Button></div>
//               <div style={{display:'block',width:'100%',height:'100%'}}>
//                     <BinTable 
//                       PageSize={inventoryPageSize} 
//                       InventoryTotalRecords={this.state.InventoryTotalRecords} 
//                       InventoryPageNumber={this.state.InventoryPageNumber} 
//                       InventoryTotalPages={this.state.InventoryTotalPages} 
//                       InventoryResponse={this.state.InventoryResponse} 
//                       Inventory={this.state.Inventory} 
//                       sortData={(sortBy,sortOrder,period,page)=>this.sortBinData(sortBy,sortOrder,period,page)} 
//                       nextPage={(sortBy,sortOrder,period,page)=>this.moreBinData(sortBy,sortOrder,period,page)} />
//                   </div>
//               </div>
//     )
//   }
// }