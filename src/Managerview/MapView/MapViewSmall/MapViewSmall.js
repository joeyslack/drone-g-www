import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WarehouseView from '../WareHouseView/WarehouseView';
import AisleView from '../AisleView/AisleView';

import { Paper, Tabs, Tab, makeStyles, useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import RingLoader from 'react-spinners/RingLoader';
import DotLoader from 'react-spinners/DotLoader';

import './mapviewsmall.css'
import SwipeableViews from 'react-swipeable-views';

import TabView from '../tabview';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div>hi</div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

class MapViewSmall extends Component {
    constructor(props) {
      super(props);
      this.state = { warehouseView: true, aisleView: false, }
      this.changeView = this.changeView.bind(this);

    }
    changeView(state) {
      if (state === true) {
        if (this.state.warehouseView === false) {
          this.setState({ warehouseView: true })
        }
      }

      if (state === false) {
        if (this.state.warehouseView === true) {
          this.setState({ warehouseView: false })
        }
      }
    }

//     a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }



    render() {
      return (
        <div id="MapViewSmallDiv" style={{background: 'none'}}>
          <Paper square style={{height: '100%', width:'100%', background: 'none'}}>  
              {/* <span style={{display:'inline-block',height:'30px',borderRadius:'0px',width:'50%',background:'',textAlign:'center'}}>
                  <Button  style={{ color:this.state.warehouseView?'#8B90A0':' #232735',fontSize:'14px',fontFamily:'SF UI Text Bold',height:'30px',borderRadius:'0px',borderBottom:this.state.warehouseView?null:'3px solid #2493F3'}} onClick={()=>this.changeView(false)} >
                      Aisle
                  </Button>
              </span>
              <span style={{display:'inline-block',height:'30px',borderRadius:'0px',width:'50%',background:'',textAlign:'center'}}>
                  <Button style={{color:this.state.warehouseView?' #232735':'#8B90A0',fontSize:'14px',fontFamily:'SF UI Text Bold',height:'30px',borderRadius:'0px',borderBottom:this.state.warehouseView?'3px solid #2493F3':null}} onClick={()=>this.changeView(true)}>
                      Warehouse
                  </Button>
              </span>   */}

              {/* <Tabs
                value={this.state.warehouseView}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                sel
                aria-label="full width tabs example"
                onChange={handleChange}>
                <Tab label="Aisle" value={false} />
                <Tab label="Warehouse" value={true} />
              </Tabs> */}
              
              { this.props.Structure && this.props.StructureResponse && this.props.MissionId ?
                <TabView {...this.props} changeState={() => this.changeView(!this.state.warehouseView)} selectedTab={this.state.warehouseView ? 1 : 0}></TabView> 
                :
                <div style={{background:'',position:'relative',paddingLeft:'calc(50% - 35px)',height:'calc(100% - 35px)'}}>
                  <div style={{position:'absolute',top:'calc(50% - 35px)'}}>
                    <DotLoader 
                      sizeUnit={"px"}
                      size={70}
                      color={'#e7e7e7'}
                      loading={true} />
                  </div>
              </div>
              }
          </Paper>
          {/* {
            this.props.StructureResponse==='Success'? 
              this.state.warehouseView ?
                <div style={{background: 'white', height:'calc(100% - 70px)', overflowY:'auto'}}>
                  <WarehouseView Structure={this.props.Structure} MissionId={this.props.MissionId}/>
                </div>
                :
                <div style={{ background:'',height:'calc(100% - 70px)', overflowY:'auto'}}>
                  <AisleView Structure={this.props.Structure} MissionId={this.props.MissionId} />
                </div> 
            :
            <div style={{background:'',position:'relative',paddingLeft:'calc(50% - 50px)',height:'calc(100% - 70px)'}}>
              <div style={{position:'absolute',top:'calc(50% - 40px)'}}>
                 <RingLoader 
                  sizeUnit={"px"}
                  size={70}
                  color={'#123abc'}
                  loading={true} /> 
              </div>
          </div>
        }  */}
        {/* <Paper square elevation={1} style={{width:'100%',height:'40px',padding:'0px',margin:'0px',textAlign:'center'}}>
          <span className="MapViewPaper" style={{background:'#3EE9CA'}}> </span>  <span className="MapViewPaperText"> Units <br/>changed </span>
          <span className="MapViewPaper" style={{background:'#28A5F6'}}> </span>  <span className="MapViewPaperText"> Units <br/> scanned </span>
          <span className="MapViewPaper" style={{background:'#EC6761'}}> </span>  <span className="MapViewPaperText"> Units <br/> error </span>
        </Paper> */}
        </div>
      );
    }
    }
export default MapViewSmall;