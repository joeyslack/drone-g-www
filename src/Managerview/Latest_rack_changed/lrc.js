import React, { Component } from 'react';
import RackTable from './rackTable'
import GetData from '../Dashboard/ListView/getData';
import MyContext from '../../themeContext';
import GetCsv from '../Dashboard/ListView/getCsv';

import Button from '@material-ui/core/Button';

import ListWhite from '../icons/ListWhite.png'
import ListBlue from '../icons/ListBlue.png'

import MapBlue from '../icons/MapBlue.png'
import MapWhite from '../icons/MapWhite.png'

import MapView from '../MapView/MapViewSmall/MapViewSmall';

import './Lrc.css';

import { withSnackbar } from 'notistack';
import { CSVLink } from 'react-csv';
import { ButtonGroup } from '@material-ui/core';

const initialdays = 999;
const pageSize = 30;

class Lrc extends Component {
  constructor(props) {
    super(props);
    this.state = { Structure: {}, OS: {}, StructureResponse: null, structureName: '', Lrc: [], mapView: false, LrcTotalRecords: null, LrcPageNumber: 1, LrcTotalPages: null, LrcResponse: null, Csv: [], csvmission: null, triggerMissionOn: false, ActiveMissionId: null }
    this.initialize = this.initialize.bind(this);
    this.setLrc = this.setLrc.bind(this);
    this.setStructure = this.setStructure.bind(this);
    this.StartDownload = this.StartDownload.bind(this);
    this.triggerMission = this.triggerMission.bind(this);
    this.setMapView = this.setMapView.bind(this);
    this.updateMapView = this.updateMapView.bind(this);

  }

  componentDidMount() {
    document.getElementById('LrcDiv')
      .classList.add(this.context.state.activeClass);

    //  var width = window.innerWidth*17/100 < 220 ? (78.8/100*window.innerWidth) - 150+'px' : '61.8vw' 
    this.initialize();

  }
  setStructure(response, token) {
    if (response.responseCode === 'Success') {
      this.context.updateValue('token', token)
      this.setState({ structureName: response.response.additionalData.structureName })
      this.context.updateSession(token)

    } else if (response.status === 401) {

      this.context.logout();
    } else console.log(response)
  }
  setLrc(response, token) {

    if (response.responseCode === 'Success') {
      let Lrc = this.state.Lrc;
      Lrc.push(...response.response.missions)
      this.context.updateValue('token', token)
      this.setState({ LrcResponse: 'Success', Lrc, LrcPageNumber: response.response.pageNumber, LrcTotalPages: response.response.totalPages, LrcTotalRecords: response.response.totalRecords, })
      this.context.updateSession(token)

      if (Object.keys(response.response.missions)
        .length > 0) {
        let additionalData = {
          token: this.context.state.token,
        }

        if (this.state.ActiveMissionId == null) {
          let ActiveMissionId = response.response.missions[0].missionId
          this.setState({ ActiveMissionId });
          if (this.state.triggerMissionOn === true) {
            this.setState({ Structure: {}, StructureResponse: null })
            GetData(this.context.state.baseUrl + '/missions/' + ActiveMissionId + '/structure', additionalData, this.updateMapView)
          }
        }
        //console.log(response.response.missions[0].missionId)
      }
    } else if (response.status === 401) {
      this.context.logout();
    } else console.log(response)
  }

  initialize() {

    let additionalData = {
      token: this.context.state.token,
    }
    GetData(this.context.state.baseUrl + '/warehouse/structure', additionalData, this.setMapView)
    GetData(this.context.state.baseUrl + '/warehouse/configuration', additionalData, this.setStructure)
    GetData(this.context.state.baseUrl + '/missions?pagesize=' + pageSize + '&pagenumber=' + this.state.LrcPageNumber + '&period=lastdays&days=' + initialdays + '&sortby=date&sortdirection=asc', additionalData, this.setLrc)

  }

  GetDownload(missionId) {

    let additionalData = {
      token: this.context.state.token,
      missionId: missionId
    }

    GetCsv(this.context.state.baseUrl + '/missions/' + missionId + '/csv', additionalData, this.StartDownload)

  }

  StartDownload(response, token, missionId) {

    if (response.responseCode === 'Success') {
      this.context.updateValue('token', token)

      let array = []
      for (var i = 0; i < response.response.missionCSV.length; i++) {
        array.push(response.response.missionCSV[i].split(','))
      }

      this.setState({ Csv: array, csvmission: missionId })

      this.context.updateSession(token)

      document.getElementById("iamcv")
        .click();
      this.props.enqueueSnackbar("Mission " + missionId + " CSV downloaded.", {
        variant: 'success',
      });
    } else if (response.status === 401) {
      this.context.logout();
    } else this.props.enqueueSnackbar("No Csv file present.", {
      variant: 'error',
    });

  }

  sortLrcData(sortBy, sortOrder, period, page) {

    let Lrc = [];
    this.setState({ Lrc, LrcResponse: null })

    let additionalData = {
      token: this.context.state.token,
    }
    //console.log( "Sort By " + sortBy + " Sort Order " + sortOrder + " period " + period  )

    GetData(this.context.state.baseUrl + '/missions?pagesize=' + pageSize + '&pagenumber=' + page + '&period=lastdays&days=' + period + '&sortby=' + sortBy + '&sortdirection=' + sortOrder, additionalData, this.setLrc)

  }

  changeView = (state) => {
    this.setState({ mapView: state });
  }

  triggerMission(MissionId) {
    if (this.state.triggerMissionOn) {

      this.setState({ Structure: {}, StructureResponse: null, ActiveMissionId: MissionId })
      let additionalData = {
        token: this.context.state.token,
      }
      GetData(this.context.state.baseUrl + '/missions/' + MissionId + '/structure', additionalData, this.updateMapView)
    }
  }

  setMapView(response, token) {
    if (response.responseCode === 'Success') {
      this.context.updateValue('token', token)
      this.setState({ Structure: response.response.structure, OS: response.response.structure, StructureResponse: 'Success', LevelCount: response.response.levelCount })
      this.context.updateSession(token)
      if (this.state.ActiveMissionId == null) {
        this.setState({ triggerMissionOn: true })
      } else {
        let additionalData = {
          token: this.context.state.token,
        }
        this.setState({ Structure: {}, StructureResponse: null, triggerMissionOn: true })
        GetData(this.context.state.baseUrl + '/missions/' + this.state.ActiveMissionId + '/structure', additionalData, this.updateMapView)
      }
    } else if (response.status === 401) {

      this.context.logout();
    } else console.log(response)
  }

  updateMapView(response, token) {

    if (response.responseCode === 'Success') {

      let structure = response.response.structure;

      let osState = JSON.stringify(this.state.OS);
      let newStructure = JSON.parse(osState);

      if (!newStructure) {
        return false;
      }

      if (newStructure.children && (structure.hasChanged || structure.hasError || structure.hasScanned)) {
        let aisles = structure.children;

        aisles.map((aisle, id) => {
          if (aisle.hasChanged || aisle.hasError || aisle.hasScanned) {
            let oldAisleIndex = newStructure.children.findIndex(o => o.id === aisle.id);
            let racks = aisle.children;

            racks.map((rack, id) => {
              if (rack.hasChanged || rack.hasError || rack.hasScanned) {
                let oldRackIndex = newStructure.children[oldAisleIndex].children.findIndex(o => o.id === rack.id)
                let bins = rack.children;

                let newrack = newStructure.children[oldAisleIndex].children[oldRackIndex];
                newrack.hasError = rack.hasError;
                newrack.hasChanged = rack.hasChanged;
                newrack.hasScanned = rack.hasScanned;
                bins.map((bin, id) => {
                  if (bin.hasChanged || bin.hasError || bin.hasScanned) {
                    // let obj = props.Inventory.find(o => o.productId||o.inventoryId === id);
                    // if(obj!=null)
                    // {
                    //     setActive(obj)
                    // }

                    if (oldAisleIndex !== -1) {
                      if (oldRackIndex !== -1) {
                        let oldBinIndex = newStructure.children[oldAisleIndex].children[oldRackIndex].children.findIndex(o => o.id === bin.id)
                        if (oldBinIndex != null) {

                          newStructure.children[oldAisleIndex].children[oldRackIndex].children[oldBinIndex] = bin;

                        }
                      }
                    }

                  }

                })

              }

            })

          }

        })

      }

      this.setState({ Structure: newStructure, StructureResponse: 'Success' });

    } else if (response.status === 401) {
      this.context.logout();
    } else console.log(response)

  }

  moreLrcData(sortBy, sortOrder, period, page) {

    let additionalData = {
      token: this.context.state.token,
    }

    GetData(this.context.state.baseUrl + '/missions?pagesize=' + pageSize + '&pagenumber=' + page + '&period=lastdays&days=' + period + '&sortby=' + sortBy + '&sortdirection=' + sortOrder, additionalData, this.setLrc)

  }

  render() {
      return (
          <div id="LrcDiv">
              <CSVLink
                data={this.state.Csv}
                id="iamcv"
                filename= {"Mission" + this.state.csvmission + ".csv"}>
              </CSVLink>
              <div style={{paddingBottom:'0px',marginBottom:'0px',position:'relative',minWidth:'100%',/*minHeight:'614px',*/background:'#F7F8FC',display:'block'}}>
                
               <div id="ListViewLrcDiv" style={{margin: '0'}}>
            
                  <div style={{overflow: 'hidden', position: 'relative'}}>
                      <div style={{fontSize: '20px', position: 'absolute', bottom: '14px', float: 'left', color:'#8B90A0', fontFamily:'SF UI Text Regular'}}>
                        Latest Racks Changed
                      </div>
                      <div style={{ float: 'right', margin: '1em 0 1em 2em' }}>
                        <ButtonGroup variant="contained" aria-label="contained primary button group">
                          <Button color={this.state.mapView? 'secondary' : 'primary'} className="active" onClick={()=>this.changeView(false)} style={{borderRight: 'none'}}>
                            {this.state.mapView?<img src={ListBlue}  style={{paddingRight:'15px'}} alt="List" /> :<img src={ListWhite}  style={{paddingRight:'15px'}}  alt="List"/>  } 
                            List View
                          </Button>
                          <Button color={this.state.mapView? 'primary' : 'secondary'} onClick={()=>this.changeView(true)} style={{borderLeft: 'none'}}>
                            {this.state.mapView?<img src={MapWhite}  style={{paddingRight:'15px'}} alt="Map" /> :<img src={MapBlue}  style={{paddingRight:'15px'}}  alt="Map"/>  } 
                            Map View
                          </Button>
                        </ButtonGroup>
                      </div>
                  </div>
                  
                  {/* reduced 27 px for above text - 54px = 81px */}
                  {/* <div style={{clear: 'both', display:'block',width:'100%', height:'calc(50vh - 81px)', minHeight:'238px', border: 'thin solid green'}}> */}
                  <div style={{clear: 'both', display:'block', width:'100%', height:'calc(100vh - 200px)', minHeight:'238px', xxxminWidth: '1000px'}}>
                      
                      <div id="ListViewRackDiv" style={{verticalAlign:'top',height:'100%',width:this.state.mapView===true?'50%':'100%',display:'block', float: 'left', minWidth: '500px'}}>
                        <RackTable 
                          triggerMissionOn={this.state.triggerMissionOn} 
                          triggerMission={this.triggerMission}  
                          ActiveMissionId={this.state.ActiveMissionId} 
                          Mini={this.state.mapView} context={this.context} 
                          LrcTotalRecords={this.state.LrcTotalRecords} 
                          LrcPageNumber={this.state.LrcPageNumber} 
                          LrcTotalPages={this.state.LrcTotalPages} 
                          LrcResponse={this.state.LrcResponse} 
                          Csv={this.state.Csv}  
                          GetDownload={(id)=>this.GetDownload(id)}  
                          sortData={(sortBy,sortOrder,period,page)=>this.sortLrcData(sortBy,sortOrder,period,page)} 
                          Chart={this.state.Chart} structureName={this.state.structureName} 
                          Lrc={this.state.Lrc} nextPage={(sortBy,sortOrder,period,page)=>this.moreLrcData(sortBy,sortOrder,period,page)}
                          changeView={this.changeView} />   
                        </div>

                      {/* <div id="ListViewMapDiv" style={{ width:this.state.mapView===true?'60%':'0%', display: 'inline-block', height:'100%',background:'', overflow:'hidden'}}> */}
                      <div id="ListViewMapDiv" style={{ width:this.state.mapView===true?'50%':'0%', display: 'block', height:'100%',background:'', overflow:'hidden', float: 'right', minWidth: this.state.mapView===true? '500px': '0'}}>
                        <MapView 
                          MissionId={this.state.ActiveMissionId}  
                          StructureResponse={this.state.StructureResponse} 
                          Structure={this.state.Structure} 
                          LevelCount={this.state.LevelCount} />
                      </div>
                    
                  </div>
              </div> 
            
            </div>
        </div> );
    }
}
 Lrc.contextType=MyContext;
export default withSnackbar(Lrc);


/*

   <div id="ListViewRackDiv" style={{verticalAlign:'top',background:'',height:'calc(96% - 30px)',width:this.state.mapView===true?'40%':'100%',display:'inline-block'}}>
               <    RackTable triggerMissionOn={this.state.triggerMissionOn} triggerMission={this.triggerMission}  ActiveMissionId={this.state.ActiveMissionId} Mini={this.state.mapView} context={this.context} LrcTotalRecords={this.state.LrcTotalRecords} LrcPageNumber={this.state.LrcPageNumber} LrcTotalPages={this.state.LrcTotalPages} LrcResponse={this.state.LrcResponse} Csv={this.state.Csv}  GetDownload={(id)=>this.GetDownload(id)}  sortData={(sortBy,sortOrder,period,page)=>this.sortLrcData(sortBy,sortOrder,period,page)} Chart={this.state.Chart} structureName={this.state.structureName} Lrc={this.state.Lrc} nextPage={(sortBy,sortOrder,period,page)=>this.moreLrcData(sortBy,sortOrder,period,page)}/>
                </div>
                
                <div id="ListViewMapDiv" style={{ width:this.state.mapView===true?'60%':'0%', display: 'inline-block',height:'calc(100vh - 104px)',background:'', overflow:'hidden'}}>
               <MapView  MissionId={this.state.ActiveMissionId} StructureResponse={this.state.StructureResponse} Structure={this.state.Structure} LevelCount={this.state.LevelCount}/>
            </div>
            */