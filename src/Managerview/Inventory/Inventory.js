import React, {
  Component
} from 'react';
import InventoryTable from './InventoryTableFull'
import GetData from '../Dashboard/ListView/getData';
import MyContext from '../../themeContext';

import './Inventory.css';

const initialdays = 30;
const pageSize = 30;
let searchInput;

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InventoryTotalRecords: 0,
      InventoryPageNumber: 1,
      InventoryTotalPages: null,
      InventoryResponse: null,
      Inventory: []
    }
    this.initialize = this.initialize.bind(this);
    this.setInventory = this.setInventory.bind(this);
  }
  componentDidMount() {
    //  var width = window.innerWidth*17/100 < 220 ? (78.8/100*window.innerWidth) - 150+'px' : '61.8vw' 
    document.getElementById('InventoryDiv').classList.add(this.context.state.activeClass);
    searchInput  = document.getElementById('globalsearch');
    this.initialize();
  }

  initialize() {
    let additionalData = {
      token: this.context.state.token,
    }

    GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + pageSize +
      '&pagenumber=1&period=lastdays&days=' + initialdays + '&sortby=date&sortdirection=desc', additionalData, this
      .setInventory);



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
              $this.setState({ InventoryResponse: null, Inventory: [], InventoryPageNumber: 1 });
              $this.setInventory(e, t);
            } 
          )
        }
        else {
          GetData(state.baseUrl + '/missions/inventory?pagesize=' + pageSize +
      '&pagenumber=1&period=lastdays&days=' + initialdays + '&sortby=date&sortdirection=desc', additionalData, $this.setInventory);
        }
      });
    }
 
  }

  setInventory(response, token) {
    if(response.responseCode === 'Success') {
      let Inventory = this.state.Inventory;
      Inventory.push(...response.response.products)
      this.context.updateValue('token', token)
      console.log(response.response.totalRecords)
      this.setState({
        InventoryResponse: 'Success',
        InventoryPageNumber: response.response.pageNumber,
        InventoryTotalPages: response.response.totalPages,
        InventoryTotalRecords: response.response.totalRecords,
        Inventory
      })

      this.context.updateSession(token);
    } else if(response.status === 401) {
      this.context.logout();
    } else console.log(response)

  }

  sortInventoryData(sortBy, sortOrder, period, page) {
    let Inventory = []
    this.setState({
      Inventory,
      InventoryResponse: null
    })

    let additionalData = {
      token: this.context.state.token,
    }
    // console.log(this.context.state.baseUrl+'/missions/inventory?pagesize='+pageSize+'&pagenumber='+page+'&period=lastdays&days='+period+'&sortby='+sortBy+'&sortdirection='+sortOrder)
    GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + pageSize + '&pagenumber=' + page +
      '&period=lastdays&days=' + period + '&sortby=' + sortBy + '&sortdirection=' + sortOrder, additionalData, this
      .setInventory)

  }

  moreInventoryData(sortBy, sortOrder, period, page) {
    let additionalData = {
      token: this.context.state.token,
    }
    GetData(this.context.state.baseUrl + '/missions/inventory?pagesize=' + pageSize + '&pagenumber=' + page +
      '&period=lastdays&days=' + period + '&sortby=' + sortBy + '&sortdirection=' + sortOrder, additionalData, this
      .setInventory)
  }

  render() {
    return (
      //style={{ background:'',height:'calc(100vh - 63px)',marginLeft:window.innerWidth>750?'18%':'0%',padding:'10px'}}
      <div id="InventoryDiv">
        <InventoryTable PageSize={pageSize}
          InventoryPageNumber = {
            this.state.InventoryPageNumber
          }
          InventoryTotalPages = {
            this.state.InventoryTotalPages
          }
          InventoryResponse = {
            this.state.InventoryResponse
          }
          Inventory = {
            this.state.Inventory
          }
          InventoryTotalRecords = {
            this.state.InventoryTotalRecords
          }
          sortData = {
            (sortBy, sortOrder, period, page) => this.sortInventoryData(sortBy, sortOrder, period, page)
          }
          nextPage = {
            (sortBy, sortOrder, period, page) => this.moreInventoryData(sortBy, sortOrder, period, page)
          }
        /></div>
      );
    }
  }
  Inventory.contextType = MyContext;
  export default Inventory;