import React, { Component } from 'react';
import InventoryMetrics from './inventoryMetrics'
import InventoryTable from './invetoryTable'
import RackTable2 from './rackTableMap'
import GetData from './getData';
import GetCsv from './getCsv';

import MyContext from '../../../themeContext';
import Button from '@material-ui/core/Button';

import ListWhite from '../../icons/ListWhite.png'
import ListBlue from '../../icons/ListBlue.png'

import MapBlue from '../../icons/MapBlue.png'
import MapWhite from '../../icons/MapWhite.png'

import { withSnackbar } from 'notistack';
import { CSVLink } from 'react-csv';
import MapViewSmall from '../../MapView/MapViewSmall/MapViewSmall';
import './listview.css'
import { ButtonGroup, Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PostData from '../../../Managerview/ManageUser/postData';

const initialdays = 999;
const inventoryPageSize = 30;
const RackTablePageSize = 9;
// const  width = window.innerWidth;
// const minmetricwidth = width<'500'?'96%':'250px';
// const mintablewidth =   width<'500'?'96%':'500px';
let searchInput;

//LrcPageNumber:null,LrcTotalPages:null,LrcpageNumber:null,
class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = { triggerMissionOn: false, ActiveMissionId: null, LevelCount: null, Structure: {}, StructureResponse: null, InventoryOrder: 'date', InventoryOrderBy: 'desc', recordBy: 30, WarehouseView: false, InventoryTotalRecords: 0, InventoryPageNumber: 1, InventoryTotalPages: null, LrcTotalRecords: null, LrcPageNumber: 1, LrcTotalPages: null, LrcResponse: null, InventoryResponse: null, Csv: [], csvmission: null, structureName: '', inventoryMetrics: {}, Lrc: [], Inventory: [], tableWidth: '61.8vw', mapView: false, Chart: {} }
    this.initialize = this.initialize.bind(this);
    this.setMetrics = this.setMetrics.bind(this);
    this.setStructure = this.setStructure.bind(this);
    this.setMapView = this.setMapView.bind(this);
    this.setLrc = this.setLrc.bind(this);
    this.setInventory = this.setInventory.bind(this);
    this.setChart = this.setChart.bind(this);
    this.StartDownload = this.StartDownload.bind(this);
    this.updateMapView = this.updateMapView.bind(this);
    this.triggerMission = this.triggerMission.bind(this);

    //this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    let additionalData = {
      token: this.context.state.token,
    }

    document.getElementById('ListViewDiv').classList.add(this.context.state.activeClass);
    //  var width = window.innerWidth*17/100 < 220 ? (78.8/100*window.innerWidth) - 150+'px' : '61.8vw' 
    searchInput  = document.getElementById('globalsearch');
    this.initialize();
  }

  // componentWillUnmount() {
  //   document.getElementById('globalsearch').removeEventListener('change');
  // }

  initialize() {
    let additionalData = {
      token: this.context.state.token,
    }

    GetData(this.context.state.baseUrl + '/warehouse/structure', additionalData, this.setMapView)
    GetData(this.context.state.baseUrl + '/warehouse/stats/' + initialdays, additionalData, this.setChart)
    GetData(this.context.state.baseUrl + '/warehouse/configuration', additionalData, this.setStructure)
    GetData(this.context.state.baseUrl + '/warehouse/metrics', additionalData, this.setMetrics)
    GetData(this.context.state.baseUrl + '/missions?pagesize=' + RackTablePageSize + '&pagenumber=' + this.state.LrcPageNumber + '&period=lastdays&days=' + initialdays + '&sortby=Mission&sortdirection=desc', additionalData, this.setLrc)
    // inventory call after mission , on first mission id
    // GetData(this.context.state.baseUrl+'/missions/inventory?pagesize='+inventoryPageSize+'&pagenumber='+this.state.InventoryPageNumber+'&period=lastdays&days='+initialdays+'&sortby=date&sortdirection=desc',additionalData,this.setInventory)
    // GetData(this.context.state.baseUrl+'/missions/11/structure',additionalData,this.updateMapView)

    // SEARCH 
    if (this.context && this.context.state && this.context.state.baseUrl && searchInput) {
      const state = Object.assign({}, this.context.state);
      const $this = this;

      searchInput.addEventListener('change', function (event) {
        let search = event.target && event.target.value ? event.target.value : null;
        if (search) {
          GetData(
            state.baseUrl + '/missions/inventory?pagesize=999&pagenumber=1&period=lastdays&days=999&sortby=date&sortdirection=desc' + (search ? '&search=' + search : ''), 
            additionalData, 
            (e, t) => {
              $this.changeView(false);
              $this.setState({ ActiveMissionId: null, InventoryResponse: null, Inventory: [], InventoryPageNumber: 1 });
              $this.setInventory(e, t);
            } 
          )
        }
        else {
           GetData(state.baseUrl + '/missions?pagesize=' + RackTablePageSize + '&pagenumber=' + state.LrcPageNumber + '&period=lastdays&days=' + initialdays + '&sortby=Mission&sortdirection=desc', additionalData, $this.setLrc)
  
          // alert(state.)
          // $this.initialize();
         // GetData(state + '/missions?pagesize=' + RackTablePageSize + '&pagenumber=' + state.LrcPageNumber + '&period=lastdays&days=' + initialdays + '&sortby=Mission&sortdirection=desc', additionalData, $this.setLrc)
        }
      });
    }

    
  }

  triggerMission(MissionId) {
    // Clear search
    searchInput.value = '';

    if (this.state.triggerMissionOn) {
      this.setState({ ActiveMissionId: MissionId, Structure: {}, StructureResponse: null, InventoryResponse: null, Inventory: [], InventoryPageNumber: 1 })

      let additionalData = {
        token: this.context.state.token,
      }

      GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + inventoryPageSize + '&pagenumber=1&period=lastdays&days=' + initialdays + '&sortby=date&sortdirection=desc&missionId=' + MissionId, additionalData, this.setInventory)
      GetData(this.context.state.baseUrl + '/missions/' + MissionId + '/structure', additionalData, this.updateMapView)
    }
  }

  updateMapView(response, token) {
    if (response.responseCode === 'Success') {
      if (!this.state.OS) return false;
      
      let structure = response.response.structure;
      let osState = JSON.stringify(this.state.OS);
      let newStructure;

      try {
        newStructure = JSON.parse(osState);
      } catch (e) {
        return false;
      }

      if (!newStructure) {
        return false;
      }
      //    oldStructure.children[1].children[21].children[2].hasError=true;
      //    console.log(oldStructure);

      if ((structure.hasChanged || structure.hasError || structure.hasScanned)) {
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

      document.getElementById("iamcv").click();
      this.props.enqueueSnackbar("Mission " + missionId + " CSV downloaded.", {
        variant: 'success',
      });

    } else if (response.status === 401) {
      this.context.logout();
    } else this.props.enqueueSnackbar("No Csv file present.", {
      variant: 'error',
    });

  }

  setChart(response, token) {
    if (response.responseCode === 'Success') {
      let Chart = {
        structureChanged: response.response.structureChanged,
        structureError: response.response.structureError,
        structureScanned: response.response.structureScanned,
        structureUnchanged: response.response.structureUnchanged,
      }

      this.context.updateValue('token', token)
      this.setState({ Chart })
      this.context.updateSession(token);

    } else if (response.status === 401) {
      this.context.logout();
    }

  }
  // handleSearch = () => {
  //   alert(this.state);
  //   //context.
  //   // context.state.test = 'wild';
  // }
  
  setNewInventory(response, token) {
    if (response.responseCode === 'Success') {
      //console.log(response.response);
    } else if (response.status === 401) {
      this.context.logout();
    } else console.log(response)
  }

  // Set Inventory
  setInventory(response, token) {
    if (response.responseCode === 'Success') {
      let Inventory = this.state.Inventory;
      Inventory.push(...response.response.products);
      // this.context.updateValue('token', token)
      this.setState({ 
        Inventory, 
        InventoryResponse: 'Success', 
        InventoryPageNumber: response.response.pageNumber, 
        InventoryTotalPages: response.response.totalPages, 
        InventoryTotalRecords: response.response.totalRecords 
      });
      // this.context.updateSession(token)
    // } else if (response.status === 401) {
    //   this.context.logout();
    // 
    } else {
      this.setState({ InventoryResponse: 'Success' });
      console.log(response)
    }
  }

  // Set LatestRacksChanged
  setLrc(response, token) {
    if (response.responseCode === 'Success') {
      let Lrc = this.state.Lrc;
      Lrc.push(...response.response.missions);
      // this.context.updateValue('token', token)
      // this.context.updateSession(token)

      this.setState({ Lrc, LrcResponse: 'Success', LrcPageNumber: response.response.pageNumber, LrcTotalPages: response.response.totalPages, LrcTotalRecords: response.response.totalRecords })
      
      //  Do we have a valid mission?
      if (Object.keys(response.response.missions).length > 0) {
        let additionalData = {
          token: this.context.state.token,
        }

        // No mission selected
        if (this.state.ActiveMissionId == null) {
          let ActiveMissionId = response.response.missions[0].missionId;          
          this.setState({ ActiveMissionId, Inventory: [], InventoryResponse: null, InventoryPageNumber: 1 });
          // Set Inventory
          GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + inventoryPageSize + '&pagenumber=1&period=lastdays&days=' + this.state.recordBy + '&sortby=date&sortdirection=desc&missionId=' + ActiveMissionId, additionalData, this.setInventory);
          // Update map 
          if (this.state.triggerMissionOn === true) {
            this.setState({ Structure: {}, StructureResponse: null })
            GetData(this.context.state.baseUrl + '/missions/' + ActiveMissionId + '/structure', additionalData, this.updateMapView)
          }
        }
      } 
      else {
        this.setState({ InventoryResponse: 'Success' })
      }
    } 
    else {
      alert('Oops Something went wrong !');
      // console.log(response);
      // this.context.logout();
    }
  }

  setStructure(response, token) {
    if (response.responseCode === 'Success') {
      this.context.updateValue('token', token)
      this.setState({ structureName: response.response.additionalData.structureName })
      this.context.updateSession(token)
    } 
    // else if (response.status === 401) {
    //   this.context.logout();
    // } 
    // else console.log(response)
  }

  setMapView(response, token) {
    if (response.responseCode === 'Success') {
      this.context.updateValue('token', token)
      this.setState({ Structure: response.response.structure, OS: response.response.structure, StructureResponse: 'Success', LevelCount: response.response.levelCount })
      this.context.updateSession(token)

      if (this.state.ActiveMissionId == null) {
        this.setState({ triggerMissionOn: true })
      } 
      else {
        let additionalData = {
          token: this.context.state.token,
        }
        this.setState({ Structure: {}, StructureResponse: null, triggerMissionOn: true })
        GetData(this.context.state.baseUrl + '/missions/' + this.state.ActiveMissionId + '/structure', additionalData, this.updateMapView)
      }
    } 
    // else if (response.status === 401) {
    //   this.context.logout();
    // } 
    // else console.log(response)
  }
  setMetrics(response, token) {
    if (response.responseCode === 'Success') {
      this.context.updateValue('token', token)
      this.setState({
        inventoryMetrics: {
          structureTotal: response.response.structureTotal,
          structureChanged: response.response.structureChanged,
          structureUnchanged: response.response.structureUnchanged,
          changePercentage: response.response.changePercentage,
          manHoursSaved: response.response.manHoursSaved
        }
      })
      this.context.updateSession(token)
    } 
    // else if (response.status === 401) {
    //   this.context.logout();
    // } 
    // else console.log(response)
  }

  sortInventoryData(sortBy, sortOrder, period, page) {
    let Inventory = [];
    this.setState({ Inventory, InventoryResponse: null, InventoryOrder: sortBy, InventoryOrderBy: sortOrder })
    let additionalData = {
      token: this.context && this.context.state && this.context.state.token ? this.context.state.token : null,
    }

    GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + inventoryPageSize + '&pagenumber=' + page + '&period=lastdays&days=' + this.state.recordBy + 
      '&sortby=' + sortBy + '&sortdirection=' + sortOrder  +
      (this.state.ActiveMissionId ? '&missionId=' + this.state.ActiveMissionId : '') + (document.getElementById('globalsearch').value ? '&search=' + document.getElementById('globalsearch').value : ''), 
    additionalData, this.setInventory)
  }

  moreLrcData(sortBy, sortOrder, period, page) {
    let additionalData = {
      token: this.context.state.token,
    }

    GetData(this.context.state.baseUrl + '/missions?pagesize=' + RackTablePageSize + '&pagenumber=' + page + '&period=lastdays&days=' + period + '&sortby=' + sortBy + '&sortdirection=' + sortOrder, additionalData, this.setLrc)
  }

  moreInventoryData(page) {
    let additionalData = {
      token: this.context.state.token,
    }

    if (this.state.ActiveMissionId) {
      GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + inventoryPageSize + '&pagenumber=' + page + '&period=lastdays&days=' + this.state.recordBy + '&sortby=' + this.state.InventoryOrder + '&sortdirection=' + this.state.InventoryOrderBy + '&missionId=' + this.state.ActiveMissionId, additionalData, this.setInventory)
    }
  }

  sortLrcData(sortBy, sortOrder, period, page) {
    let Lrc = []
    let Inventory = {}
    let Chart = {}

    let additionalData = {
      token: this.context.state.token,
    }

    if (period !== this.state.recordBy) {
      this.setState({ recordBy: period, Lrc, Chart, LrcResponse: null, Inventory, InventoryResponse: null })
      //console.log(this.context.state.baseUrl+'/missions/inventory?pagesize='+inventoryPageSize+'&pagenumber=1&period=lastdays&days='+period+'&sortby='+this.state.InventoryOrder+'&sortdirection='+this.state.InventoryOrderBy)
      //GetData(this.context.state.baseUrl+'/missions/inventory?pagesize='+inventoryPageSize+'&pagenumber=1&period=lastdays&days='+period+'&sortby='+this.state.InventoryOrder+'&sortdirection='+this.state.InventoryOrderBy,additionalData,this.setInventory)
    } else this.setState({ Lrc, Chart, LrcResponse: null })

    GetData(this.context.state.baseUrl + '/warehouse/stats/' + period, additionalData, this.setChart)
    GetData(this.context.state.baseUrl + '/missions?pagesize=' + RackTablePageSize + '&pagenumber=' + page + '&period=lastdays&days=' + period + '&sortby=' + sortBy + '&sortdirection=' + sortOrder, additionalData, this.setLrc)
    //GetData(this.context.state.baseUrl+'/missions/inventory?pagesize='+inventoryPageSize+'&pagenumber=1&period=lastdays&days='+period+'&sortby='+sortBy+'&sortdirection='+sortOrder,additionalData,this.setInventory)
  }

  changeView = (state) => {
    this.setState({ mapView: state });
  }

  // Save Validation
  clickSave = (state) => {
    // React.useEffect(() => {
    //   localStorage.setItem('myValueInLocalStorage', value);
    // }, [value]);
    // alert('slick');
    const pendingVerificationItems = this.context.state.pendingVerificationItems;
    PostData(this.context.state.baseUrl + '/warehouse/inventory/validate', {body: pendingVerificationItems}, (err, res) => {
      //if (err) throw(err);
      this.context.updateValue('pendingVerificationItems', null);
      this.forceUpdate();
    });
  }

  render() {
      return (
      <div id="ListViewDiv">
        <CSVLink
          data={this.state.Csv}
          id="iamcv"
          filename= {"Mission" + this.state.csvmission + ".csv"}
        />
        <div style={{paddingBottom:'0px',marginBottom:'0px',position:'relative',minWidth:'100%',/*minHeight:'614px',*/background:'#F7F8FC',display:'block'}} >
        {/* <div style={{paddingBottom:'0px',marginBottom:'0px',position:'relative',overflowX:'auto',minWidth:'100%',minHeight:'614px',height:'calc(100vh - 44px)',background:'#F7F8FC',display:'block'}} > */}
        {/* paddingTop:'5px',display:'block',height:'30px',width:width*82/100>360?'350px':'100%',left:width*82/100>410?'calc(82vw - 390px)':'10px',position:'relative',background:'' */}
        
        
        
        {/* <div id="ListViewTopButtonDiv" style={{margin: '2em 100px 2em 0', border: 'thin solid red'}}>
          
            <div style={{display:'inline-block',width:'50%'}}>
                <Button  style={{boxSizing: 'border-box', border: '1px solid #EBF4FD', borderRadius:'0px',height:'30px',width:'100%',background:this.state.mapView?'white':'#2493F3',color:this.state.mapView?'black':'white' }} variant="compact" onClick={()=>this.changeView(false) } disableElevation>
                    {this.state.mapView?<img src={ListBlue}  style={{paddingRight:'15px'}} alt="List" /> :<img src={ListWhite}  style={{paddingRight:'15px'}}  alt="List"/>  } 
                    <span style={{color:this.state.mapView?'#2493F3':'white',fontSize:'13px',fontFamily:'SF UI Text Regular', textTransform: 'capitalize'}}>List View</span> 
                </Button>  
            </div>
            <div style={{display:'inline-block',width:'50%'}}>
                <Button   style={{boxSizing: 'border-box', border: '1px solid #EBF4FD', borderRadius:'0px',height:'30px',width:'100%',background:this.state.mapView?'#2493F3':'white',color:this.state.mapView?'white':'#2493F3'}} variant="compact" onClick={()=>this.changeView(true)} disableElevation>
                    {this.state.mapView?<img src={MapWhite}  style={{paddingRight:'15px'}} alt="Map" /> :<img src={MapBlue}  style={{paddingRight:'15px'}}  alt="Map"/>  } 
                    <span style={{color:this.state.mapView?'white':'#2493F3',fontSize:'13px',fontFamily:'SF UI Text Regular', textTransform: 'capitalize'}}>Map View</span>  
                </Button>  
            </div>
        </div> */}



        {/* reduced 44px app bar - 35 px button - 10 px margin top - 10 px margin Bottom = 99px  */}
        {/* reduced 22px app bar - 17 px button - 10 px margin top - 5 px margin Bottom  = 54px */}
        {/* style={{background:'',marginLeft:'2%',position:'relative',marginTop:'0px',minHeight:'265px',height:'calc(50vh - 49px)',float:'left',minWidth:minmetricwidth,width:'24%',maxWidth:'96%',paddingBottom:'0px',display:'inline-block',background:''}} */}

        {/* 
        <div  id="ListViewMetricDiv">

            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'inline-block' ,fontSize:'18px',color:'rgb(0,0,0,0.6)',fontFamily:'SF UI Text Regular',paddingBottom:'10px'}}>Inventory Metrics</div> 
                <div style={{textDecoration:'underline',marginLeft:'0px',marginRight:'0px',display:'inline-block' ,fontSize:'13px',color:'#2493F3',fontFamily:'SF UI Text Regular',paddingBottom:'5px'}}>
                    View last run
                </div> 
            </div>
            
            <div style={{minHeight:'238px',height:'calc(50vh - 91px)',width:'100%' ,background:'#FFFFF'}}>
                <InventoryMetrics structureName={this.state.structureName} data={this.state.inventoryMetrics}  />
            </div>

        </div> 
        */}

        {/* reduced 44px app bar - 35 px button - 10 px margin top - 10 px margin Bottom = 89px  */}
        {/* reduced 22px app bar - 17 px button - 10 px margin top - 5 px margin Bottom  = 54px */}
        {/* style={{marginLeft:'2%',marginTop:'0px',position:'relative',minHeight:'265px',height:'calc(50vh - 54px)',float:'left',minWidth:mintablewidth,width:'70%',maxWidth:'96%',paddingTop:'0px',paddingBottom:'0px',background:'',display:'inline-block',}} */}
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
            <div style={{clear: 'both', display:'block', width:'100%', height:'calc(50vh - 200px)', minHeight:'400px', xxxminWidth: '1000px'}}>
                <div id="ListViewRackDiv" style={{verticalAlign:'top',height:'100%',width:this.state.mapView ? '50%':'100%', display:'block', float: 'left'}}>
                    <RackTable2 
                      triggerMissionOn={this.state.triggerMissionOn} 
                      ActiveMissionId={this.state.ActiveMissionId} 
                      triggerMission={this.triggerMission} 
                      Mini={this.state.mapView} 
                      context={this.context} 
                      LrcTotalRecords={this.state.LrcTotalRecords} 
                      LrcPageNumber={this.state.LrcPageNumber} 
                      LrcTotalPages={this.state.LrcTotalPages} 
                      LrcResponse={this.state.LrcResponse} 
                      Csv={this.state.Csv} 
                      GetDownload={(id)=>this.GetDownload(id)} 
                      sortData={(sortBy,sortOrder,period,page)=>this.sortLrcData(sortBy,sortOrder,period,page)} 
                      Chart={this.state.Chart} structureName={this.state.structureName} 
                      Lrc={this.state.Lrc}  
                      nextPage={(sortBy,sortOrder,period,page)=>this.moreLrcData(sortBy,sortOrder,period,page)}
                      postAndUpdate={(url, data, callback) => {PostData(this.context.state.baseUrl + url, data, callback) }}
                    />
                </div>

                {/* <div id="ListViewMapDiv" style={{ width:this.state.mapView===true?'60%':'0%', display: 'inline-block', height:'100%',background:'', overflow:'hidden'}}> */}
                <div id="ListViewMapDiv" style={{width:this.state.mapView ? '50%':'0%', display: 'block', height:'100%', float: 'right'}}>
                  <MapViewSmall MissionId={this.state.ActiveMissionId}  StructureResponse={this.state.StructureResponse} Structure={this.state.Structure} LevelCount={this.state.LevelCount}/>
                </div>
                
                {/* { this.context.state.pendingVerificationItems && (
                  <div style={{float: 'right'}}>
                    <Fab color="primary" aria-label="save verification" onClick={this.clickSave}>
                      <SaveIcon />
                    </Fab>
                  </div>
                ) } */}
              
            </div>
        </div> 


        {/* reduced 44px app bar - 35 px button - 5 px margin top - 10 px margin Bottom = 89px  */}
        {/* reduced 22px app bar - 18 px button - 10 px margin top - 5 px margin Bottom  = 55px */}

        {/* 44 px appbar + 40 px top button + 10 px inventory marginTop + 10 px {inventory + metric} margin */ }
        {/* style={{margin:'0px',background:'',marginLeft:'2%',marginBottom:'0px',float:'left',minWidth:mintablewidth,width:'96%',paddingBottom:'0px',display:'inline-block',height:'calc(50vh - 55px)',minHeight:'280px',marginTop:'10px',background:''}} */}
        <div id="ListViewInventoryDiv" style={{margin: '1em 0 0 0 '}}>
          <div style={{marginBottom: '1em', fontSize: '20px', color:'#8B90A0', fontFamily:'SF UI Text Regular'}}>
            Inventory { searchInput && searchInput.value ? ' containing "' +  searchInput.value + '"' : "" }
          </div>

          <div style={{clear: 'both', display:'block', width:'100%', height:'calc(50vh - 50px)', minHeight:'400px'}}>
            <InventoryTable 
              PageSize={(inventoryPageSize <= this.state.Inventory.length) || !this.state.Inventory ? inventoryPageSize : this.state.Inventory.length} 
              InventoryTotalRecords={this.state.InventoryTotalRecords} 
              InventoryPageNumber={this.state.InventoryPageNumber} 
              InventoryTotalPages={this.state.InventoryTotalPages} 
              InventoryResponse={this.state.InventoryResponse} 
              Inventory={this.state.Inventory} 
              sortData={(sortBy,sortOrder,period,page)=>this.sortInventoryData(sortBy,sortOrder,period,page)} 
              nextPage={(page)=>this.moreInventoryData(page)} />
          </div>
        </div>
      </div>
    </div>);
  }
}

ListView.contextType = MyContext;
export default withSnackbar(ListView);