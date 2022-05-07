
import React,  {   Component  } from 'react';
// import DialogContent from '@material-ui/core/DialogContent';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import ImageIcon from '@material-ui/icons/Image';
// import FilterListIcon from '@material-ui/icons/FilterList';
import { Button } from '@material-ui/core';
// import DateRangeIcon from '@material-ui/icons/DateRange';
// import Toolbar from '@material-ui/core/Toolbar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import Noimage from '../../icons/noImage.png';
// import Expand from '../../icons/Expand.png'
import Popover from '@material-ui/core/Popover';
// import Modal from '@material-ui/core/Modal';
// import ImageModal from './Imagemodal';
import RingLoader from 'react-spinners/RingLoader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SortByIcon from '../../icons/SortBy.png'
// import CalendarIcon from './Calendar.png'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import RiseLoader from 'react-spinners/RiseLoader';
import DotLoader from 'react-spinners/DotLoader';
import SyncLoader from 'react-spinners/SyncLoader';
import blank from '../../icons/blank.svg';
import * as moment from 'moment';




import './BinTable.css'
import MyContext from '../../../themeContext';


let BinTable_Tableloader = false;


const  InventoryPageSize=10;
const minHeight = '100%';

const style = theme => ({
    root: {
      width: 'calc(100% - 20px)',
      paddingLeft:'10px',
      paddingRight:'10px',
      paddingBottom:'0px',
     marginBottom:'0px',
      background:'',
      height:minHeight,
    },
    grow: {
      flexGrow: 1,
    },
    tableWrapper: {
      width: '100%',
      height:'calc(100% - 65px)', //30 px above 35 px below
      
      maxWidth:'calc(100%)',
      overflow: 'auto',
      display:'inline-block',
      background:'',
      verticalAlign:'top'
    },
    tableside:{
      background:'',
      
      width:'25%',
      minWidth:'150px',
      maxWidth:'25%',
      
      top:'0px',
      
      minHeight:'calc(100% - 30px)',//30 px above 35 px below
      height:'calc(100% - 30px)',
      overflow:'auto',
      display:'inline-block',
      
      
    },
    paper: {
      marginTop: theme.spacing(3),
      width: '100%',
   
      marginBottom: theme.spacing(2),
    },
    table: {
   background:''
    }
  


  })

  const StyledTableRow = withStyles(theme => ({
    root: {
     
      '&:nth-of-type(odd)': {
        
       
        // backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);


  const StyledTableCell = withStyles(theme => ({
    head: {
      fontFamily:' SF UI Text Regular',
      backgroundColor: '#F7F8FC',
      color: '#8B90A0',
      cursor:'default',
      borderBottom:'none'
    },
    body: {
      fontFamily:' SF UI Text Regular',
      fontSize: 13,
      cursor:'pointer',
      padding:'0px',
      paddingTop:'5px',
      paddingBottom:'5px',
          },
  }))(TableCell);
  
  

  
  const headerCell = ["Product" ,"Condition","Location","Date"]
  const headerShow = ["Photos","Product","UPC/GTIN","Quantity","Condition","Location","Date","Description"]
  // const periods =  ["Last 3 days","Last Week","Last Month"]


class BinTable extends Component {
  constructor(props) {
    super(props);
    this.state = { itr:0,ipn:1,modalopen:false,active:null,order:'asc',orderBy:'product',recordBy:30,anchorEl1:null,anchorEl3:null }
  }

  componentDidMount()
  {
   
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {
    if(this.props.Inventory.length>0)
    {
      
      let me=document.getElementById('DashboardInventoryTableWrapper');

      if((me.scrollTop>=me.scrollHeight-(me.clientHeight + 10)) && BinTable_Tableloader===false)
      {
        BinTable_Tableloader=true;
        console.log('reached bottom');
        console.log(InventoryPageSize)
        console.log(this.state.itr)
        if(InventoryPageSize*this.state.ipn<this.props.InventoryTotalRecords)
        {
          console.log('yes')
          this.props.nextPage(this.state.orderBy,this.state.order,this.state.recordBy,this.state.ipn+1)
        }
      }

      else me.addEventListener('scroll', this.handleScroller );
      
    }

    if(this.props.Inventory.length!=this.state.inventoryLength)
    {
      this.setState({inventoryLength:this.props.Inventory.length})
      BinTable_Tableloader=false;
    }

    
    if(prevProps.InventoryTotalRecords!=this.props.InventoryTotalRecords)
    {
      this.setState({itr:this.props.InventoryTotalRecords})
    }

    if(prevProps.InventoryPageNumber!=this.props.InventoryPageNumber)
    {
      this.setState({ipn:this.props.InventoryPageNumber})
    }
  }


  setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (10*365*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  handleChange = name => event => {
    let cookietext;
    let contexttext;
    if(name=="UPC/GTIN")
    { 
      cookietext="I1UPC"
      contexttext="IUPC"
    }
    else 
    {
      cookietext="I1"+name;
      contexttext="I"+name;
    }

    
    let newtable=this.context.state.ITable1;
    newtable[contexttext]=event.target.checked.toString();


    this.context.updateValue('ITable1',newtable);
   
    this.setCookie(cookietext,event.target.checked)
    
    //setState({ ...state, [name]: event.target.checked });
  };

  
  
  sortData(text){
    
    this.setState({anchorEl1:null})
    text=text.toLowerCase();
  
    if(text==='location')
      {
        text='bin-code'
      }
      else if(text==='date')
      {
        text='scan-on'
      }
  
    if(this.state.orderBy===text)
    { 
      
      if(this.state.order==='asc')
      {
        
        this.setState({order:'desc'})
        this.props.sortData(text,'desc',this.state.recordBy,1)
      }
      else 
      {
        this.setState({order:'asc'})
        this.props.sortData(text,'asc',this.state.recordBy,1)
      }
    }
   
   else {
    this.setState({order:'asc'})
    this.setState({orderBy:text})
    this.props.sortData(text,'asc',this.state.recordBy,1)
    }
  
  }

  Closepop1= () =>{this.setState({anchorEl1:null}) }
   Closepop3= () =>{this.setState({anchorEl3:null}) }

   handleScroller = event =>{

    let me=document.getElementById('DashboardInventoryTableWrapper');
    // console.log(this.state.ipn)
    // console.log(Tableloader)
    if((me.scrollTop>=me.scrollHeight-(me.clientHeight + 10)) && BinTable_Tableloader===false)
    {
      BinTable_Tableloader=true;
      // console.log('reached bottom');
      // console.log(InventoryPageSize)
     
      if(InventoryPageSize*this.state.ipn<this.state.itr)
      {
        // console.log('yes')
        this.props.nextPage(this.state.orderBy,this.state.order,this.state.recordBy,this.state.ipn+1)
      }
      
    }
  }

  Openpop1 = event => { this.setState({anchorEl1:event.currentTarget}) };
 

  Openpop3 = event => { this.setState({anchorEl3:event.currentTarget}) };

  
  handleChangePage = (newPage) => {
    this.props.nextPage(this.state.orderBy,this.state.order,this.state.recordBy,newPage)
  };

  modalClose=()=>{ this.setState({modalopen:false}) }
  modalOpen=()=>{  this.setState({modalopen:true}) }


  render() {
    
    const pop1open = Boolean(this.state.anchorEl1);
    const pop3open = Boolean(this.state.anchorEl3);
    const table = this.context.state.ITable1;

    const id1 = pop1open ? 'simple-popover' : undefined;
    const id3 = pop3open ? 'simple-popover' : undefined;
    const {classes} = this.props;
  
    return (
            <div
                style={{
                padding: '0px',
                display: 'block',
                position: 'relative',
                height: '100%'
            }}>

                
                <Paper className={classes.root} square elevation={1}>
                  
                  <Paper elevation={0} square style={{padding: '0 0 1em 0', clear: 'both'}}>
                      <div style={{overflow: 'hidden', position: 'relative'}}>
                        <div style={{ float: 'right' }}>
                            <Button
                                onClick={this.Openpop1}
                                disabled={Object
                                  .entries(this.props.Inventory)
                                  .length < 1}
                                size="small"
                                color="secondary"
                                variant="outlined">
                                <img
                                    src={SortByIcon}
                                    alt="Sort By"
                                    style={{
                                      paddingRight: '10px'
                                    }}/>
                                <p
                                    style={{
                                      fontFamily: 'SF UI TEXT Regular',
                                      color: '#8C949F',
                                      lineHeight: '30px',
                                      fontSize: '12px',
                                      padding: '0px',
                                      margin: '0px'
                                  }}>
                                    Sort By {this.state.orderBy ? this.state.orderBy : ''}
                                </p>
                                <ArrowDropDownIcon
                                  style={{
                                    color: '#B9BCC6'
                                  }}
                                />
                            </Button>
                            <Popover
                                id={id1}
                                open={pop1open}
                                anchorEl={this.state.anchorEl1}
                                onClose={this.Closepop1}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                elevation={3}
                                >
                                {headerCell.map((text, key) => <div onClick={() => this.sortData(text)} className={`Pop1 ${(this.state.orderBy && this.state.orderBy.toLowerCase() === text.toLowerCase()) ? 'selected' : ''}`} key={key}>{text}</div>)}
                            </Popover>

                            <Button
                                variant="text"
                                onClick={this.Openpop3}
                                disabled={this.props.InventoryResponse !== 'Success'}
                                style={{paddingRight: '0', paddingLeft: '0', marginLeft: '1em', minWidth: 'auto', background: this.props.InventoryResponse !== 'Success'
                                    ? 'rgba(216, 218, 226, 0.575)'
                                    : this.state.anchorEl3
                                        ? 'rgb(0,0,0,0.11)'
                                        : ''}} >
                              <MoreVertIcon fontSize="default" color="action" />
                            </Button>

                            <Popover
                              id={id3}
                              open={pop3open}
                              anchorEl={this.state.anchorEl3}
                              onClose={this.Closepop3}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }} elevation={3}>

                              {headerShow.map((text, index) => <div
                                  key={index}
                                  style={{
                                  paddingRight: '5px'
                              }}>

                                  <Checkbox
                                      style={{padding: '5px 1em 5px 1em'}}
                                      icon={<CheckBoxOutlineBlankIcon fontSize = "small" />}
                                      checkedIcon={<CheckBoxIcon fontSize = "small" />}
                                      checked={table
                                      ? text === "UPC/GTIN"
                                          ? table['IUPC'] === 'false'
                                              ? false
                                              : true
                                          : table['I' + text] === 'false'
                                              ? false
                                              : true
                                      : false}
                                      onChange={this.handleChange(text)}
                                      color="primary"
                                      inputProps={{
                                        'aria-label': 'secondary checkbox'
                                  }}/>
                                  <span
                                      className={'checkboxStyle'}
                                      style={{
                                        color: table
                                          ? text === "UPC/GTIN"
                                              ? table['IUPC'] === 'false'
                                                  ? '#8C949F'
                                                  : '' : table['I' + text] === 'false'
                                                      ? '#8C949F'
                                                      : '' : '#8C949F'
                                      }}>
                                      {text}
                                    </span>
                                </div>
                              )}

                            </Popover>
                          </div>
                        </div>
                    </Paper>

                    <div className={classes.flexWrapper} style={{clear: 'both'}}>
                      {table
                        ? table.IPhotos === 'true'
                            ? <div className={classes.tableside}>
                                  
                                    <div id="InventoryTablePhotosSectImage" 
                                      style={{
                                        display: 'flex',
                                        position: 'absolute',
                                        top: '-40px',
                                        left: '0',
                                        width: '100%',
                                        height: 'calc(100% - 80px)',
                                        cursor: 'pointer',
                                        // border: '2px solid #EBF4FD'
                                        background: this.state.active && this.state.active.imageUrl ? 'none' : `url(${blank}) no-repeat center center`, 
                                        backgroundSize: '25%', 
                                        // border: this.state.active && this.state.active.imageUrl ? 'none' : '2px solid #EBF4FD',
                                        }} onClick={this.modalOpen}>
                                        <img
                                          id="ProductImage"
                                          alt=""
                                          style={{maxWidth: '100%', maxHeight: '100%', minWidth: '100%', objectFit: 'cover', border: '2px solid #EBF4FD'}}
                                          src={this.state.active != null
                                            ? this.state.active.imageUrl !== "" ? this.state.active.imageUrl : ''
                                            : Object.entries(this.props.Inventory).length >= 1
                                              ? this.props.Inventory[0].imageUrl !== ""
                                                  ? this.props.Inventory[0].imageUrl
                                                  : ''
                                              : ''} />
                                    </div>


                                        <div
                                          style={{
                                            display: 'block',
                                            width: '100%',
                                            backgroundColor: '',
                                            position: 'absolute',
                                            bottom: '0px',
                                            background: 'white',
                                        }}>
                                          <table className={classes.inventoryTablePhoto}>
                                            <tr>
                                              <td style={{paddingRight: '1em'}}>Product:</td>
                                              <td>
                                                { this.state.active != null
                                                  ? this.state.active.productName
                                                  : Object.entries(this.props.Inventory).length >= 1
                                                    ? this.props.Inventory[0].productName
                                                    : null }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Where:</td>
                                              <td>
                                                 { this.state.active != null
                                                  ? this.state.active.binCode
                                                  : Object.entries(this.props.Inventory).length >= 1
                                                    ? this.props.Inventory[0].binCode
                                                    : null }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Serial:</td>
                                              <td>
                                                { this.state.active != null
                                                  ? this.state.active.productCode
                                                  : Object.entries(this.props.Inventory).length >= 1
                                                    ? this.props.Inventory[0].productCode
                                                    : null }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Date:</td>
                                              <td>
                                                { this.state.active != null
                                                  ? moment(this.state.active.scannedOn).format('M/d/YY')
                                                  : null }
                                              </td>
                                            </tr>
                                          </table>
                                        </div> 
                                </div>
                            : null
                        : null}

                    <div className={classes.tableWrapper} id="DashboardInventoryTableWrapper">
                        {table
                            ? <Table
                                    className={classes.table}
                                    stickyHeader
                                    size="small"
                                    aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                             <StyledTableCell
                                              style={{
                                                width: '12px',
                                                padding: '0'
                                            }} />
                                            {table.IProduct === 'true'
                                                ? <StyledTableCell style={{paddingLeft: '0'}} align="left">Product</StyledTableCell>
                                                : null}
                                            {table.IUPC === 'true'
                                                ? <StyledTableCell style={{}} align="left">Serial</StyledTableCell>
                                                : null}
                                            {table.IQuantity === 'true'
                                                ? <StyledTableCell style={{}} align="center">Quantity</StyledTableCell>
                                                : null}
                                            {table.ICondition === 'true'
                                                ? <StyledTableCell style={{}} align="left">Condition</StyledTableCell>
                                                : null}
                                            {table.ILocation === 'true'
                                                ? <StyledTableCell style={{}} align="left">Location</StyledTableCell>
                                                : null}
                                            {table.IDate === 'true'
                                                ? <StyledTableCell style={{}} align="left">Date</StyledTableCell>
                                                : null}
                                            {table.IDescription === 'true'
                                                ? <StyledTableCell style={{}} align="left">Description</StyledTableCell>
                                                : null}
                                           <StyledTableCell
                                              style={{
                                                width: '12px',
                                                padding: '0'
                                            }} />
                                        </TableRow>
                                    </TableHead>

                                    {this.props.Inventory.length > 0
                                        ? <TableBody id="TableBody">

                                                {this
                                                    .props
                                                    .Inventory
                                                    .map((row, index) => (
                                                        <StyledTableRow
                                                            key={index}
                                                            hover
                                                            onClick={() => {
                                                              this.handleChangeRow(row.inventoryId);
                                                            }}
                                                            style={{
                                                              background: this.state.active && this.state.active.inventoryId === row.inventoryId
                                                                ? 'rgb(247, 248, 252)'
                                                                : 'none'
                                                            }}>
                                                            <td className="spacer"></td>
                                                            {table.IProduct === 'true'
                                                                ? <StyledTableCell component="th" scope="row">
                                                                    
                                                                      <div style={{
                                                                        display: 'inline-block',
                                                                        border: '1px solid #EBF4FD',
                                                                        width: '36px',
                                                                        height: '36px',
                                                                        background: `white url(${blank}) no-repeat center center`, backgroundSize: '20px',
                                                                        overflow: 'hidden',
                                                                        verticalAlign: 'middle'
                                                                      }}>
                                                                          <img alt="" src={row.imageUrl} style={{maxHeight: '100%', objectFit: 'cover', verticalAlign: 'middle'}} />
                                                                      </div>
                                                                      <span>&nbsp;&nbsp;{row.productName}</span>
                                                                        
                                                                    </StyledTableCell>
                                                                : null}

                                                            {table.IUPC === 'true'
                                                                ? <StyledTableCell>{row.upc}</StyledTableCell>
                                                                : null}

                                                            {table.IQuantity === 'true'
                                                                ? <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                                                : null}
                                                            {table.ICondition === 'true'
                                                                ? <StyledTableCell>{row.condition}</StyledTableCell>
                                                                : null}

                                                            {table.ILocation === 'true'
                                                                ? <StyledTableCell>
                                                                        {row.binCode}
                                                                    </StyledTableCell>
                                                                : null}
                                                            {table.IDate === 'true'
                                                                ? <StyledTableCell>
                                                                        {moment(row.scannedOn).format('M/d/YY')}
                                                                    </StyledTableCell>
                                                                : null}
                                                            {table.IDescription === 'true'
                                                                ? <StyledTableCell>
                                                                        <div className="ProductTableWrap" title={row.notes}>{row.notes}</div>
                                                                    </StyledTableCell>
                                                                : null}
                                                          <td className="spacer"></td>
                                                        </StyledTableRow>
                                                    ))
}

                                            </TableBody>
                                        : null
}

                                </Table>
                            : null}
                        {this.props.Inventory.length > 0
                            ? this.props.Inventory.length < this.props.InventoryTotalRecords
                                ? <div
                                        style={{
                                        padding: '20px'
                                    }}>
                                        <SyncLoader size={10} margin={'10px'} color={'#e7e7e7'} loading={true} />
                                    </div>
                                : null
                            : null
}

                        {this.props.InventoryResponse !== 'Success' && this.props.Inventory.length < 1
                            ? <div
                                    style={{
                                    background: '',
                                    paddingLeft: 'calc(50% - 50px)',
                                    marginTop: 'calc(25% - 140px)'
                                }}>
                                    <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
                                </div>
                            : null
}
                    </div>
                  </div>

                  <div
                      style={{
                      float: 'right',
                      height: 'auto',
                      width: 'auto',
                      background: '',
                      paddingBottom: '0px',
                      marginBottom: '0px',
                  }}>
                      <span
                          style={{
                          paddingTop: '13px',
                          fontSize: '13px',
                          fontFamily: 'SF UI text Regular',
                          paddingRight: '0',
                          color: '#8B90A0'
                      }}>
              
                          {this.props.InventoryTotalRecords &&  this.props.InventoryTotalRecords !== "null" ?
                          (`1 - ${this.props.InventoryPageNumber * InventoryPageSize > this.props.InventoryTotalRecords
                            ? this.props.InventoryTotalRecords
                            : (this.props.InventoryPageNumber) * InventoryPageSize} of ${this.props.InventoryTotalRecords}`)
                        : ''}
                        </span>
                    </div>
                      
                </Paper>
            </div>
           
    )
  }
}

BinTable.contextType=MyContext;
export default withStyles(style)(BinTable);








// function periodData(index){
  
//   setAnchorEl2(null);


// setRecordIndex(index);

//   if(index===0){
//     if(recordBy===3)
//     {
//       console.log('Already Sort By Period')
      
//     }
//     else  {
//       setRecordBy(3);
//       props.sortData(orderBy,order,3,1)
//     }
//   }

//   else if(index===1){
//     if(recordBy===7)
//     {
//       console.log('Already Sort By Period')
      
//     }
//     else 
//      {
//       setRecordBy(7);
//       props.sortData(orderBy,order,7,1)
//     }
//   }

//   else if(index===2){
//     if(recordBy===30)
//     {
//       console.log('Already Sort By Period')
      
//     }
//     else  {
//       setRecordBy(30);
//       props.sortData(orderBy,order,30,1)
//     }
//   }

// }

     
      
