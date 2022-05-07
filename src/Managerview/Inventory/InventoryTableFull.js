import React, {Component} from 'react';
import * as moment from 'moment';

import DialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import ImageIcon from '@material-ui/icons/Image'; import FilterListIcon from
// '@material-ui/icons/FilterList';
import {Button} from '@material-ui/core';
// import DateRangeIcon from '@material-ui/icons/DateRange'; import Toolbar from
// '@material-ui/core/Toolbar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import blank from '../icons/blank.svg';
import Popover from '@material-ui/core/Popover';
import Modal from '@material-ui/core/Modal';
import ImageModal from '../Dashboard/ListView/Imagemodal';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import SortByIcon from '../icons/SortBy.png'
import CalendarIcon from '../icons/Calendar.png'

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import Checkbox from '@material-ui/core/Checkbox';
import '../Dashboard/ListView/InventoryTable.css'
import '../Dashboard/ListView/listview.css';
import MyContext from '../../themeContext';
import DotLoader from 'react-spinners/DotLoader';
import SyncLoader from 'react-spinners/SyncLoader';

const minHeight = '100%';

const style = theme => ({
    root: {
        // width: 'calc(100% - 20px)', paddingLeft: '10px', paddingRight: '10px',
        // paddingBottom: '0px', marginBottom: '0px', background: '', height: minHeight
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '15px',
        // width: 'calc(100% - 20px)', display: 'inline-block',
        display: 'block',
        height: 'calc(100% - 48px)',
        background: 'white',
        // margin: '0 2em 2em 2em'
        margin: '0'
    },
    grow: {
        flexGrow: 1
    },
    flexWrapper: {
        display: 'flex',
        height: 'calc(100% - 85px)', //30 px above 35 px below
    },
    tableWrapper: {
        // width: '75%', maxWidth: 'calc(100% - 150px)',
        overflow: 'scroll',
        display: 'block',
        background: '',
        verticalAlign: 'top',
        flexGrow: 1,
        maxWidth: '75%'
    },
    tableside: {
        // minHeight: 'calc(100% - 30px)', //30 px above 35 px below height: 'calc(100%
        // - 30px)'
        minWidth: '25%',
        display: 'block',
        height: '100%',

        background: 'none',
        marginRight: '2em',

        flexGrow: 1,
        position: 'relative'
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {},
    inventoryTablePhoto: {
        fontSize: "15px",
        lineHeight: "20px",
        '& td:first-child': {
            color: '#8B90A0'
        },
        '& td': {
            color: '#232735'
        }
    }
});

const StyledTableRow = withStyles(theme => ({
    root: props => ({
        // '&:hover': { },
        borderCollapse: 'collapse',
        // height: '45px', border: 'thick solid blue !important', '&:nth-of-type(odd)':
        // {   // backgroundColor: theme.palette.background.default, }
        '& td, & th': {
            borderBottom: props.borderBottom
        },
        '&:hover td, &:hover th': {
            // borderTop: '1px solid #e7e7e7', borderBottom: '1px solid #e7e7e7',
            backgroundColor: '#fcfcfc',
            cursor: 'pointer'
        },
        // '&:hover td:first-child': {   borderLeft: '2px solid #f1f1f1' }
    })
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
    head: {
        fontFamily: 'SF UI Text Regular',
        backgroundColor: '#F7F8FC',
        cursor: 'default',
        borderBottom: '1px solid #f1f1f1',
        lineHeight: '1',
        /* Nabla Grey */
        color: '#8B90A0',
        fontSize: 13,
        padding: '12px'
    },
    body: {
        fontSize: 15,
        fontFamily: 'SF UI Text Regular',
        /* Nabla Black */
        color: '#232735',
        border: 'none',
        borderBottom: '0.75px solid #f5f5f5',
        lineHeight: '13px',
        marginLeft: '0',
        padding: '1em 12px 1em 12px'
    }
}))(TableCell);

var InventoryTable_Tableloader = false;
const headerCell = ["Product", "Condition", "Location", "Date"]
const headerShow = [
    "Photos",
    "Product",
    "UPC/GTIN",
    "Quantity",
    "Condition",
    "Location",
    "Date",
    "Description"
]
const periods = ["Last 3 days", "Last Week", "Last Month", "Last 3 Months"]

const InventoryPageSize = 30;
let searchInput;

class InventoryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itr: 0,
            ipn: 1,
            modalopen: false,
            active: null,
            order: 'asc',
            orderBy: 'date',
            recordBy: 30,
            anchorEl1: null,
            anchorEl2: null,
            anchorEl3: null,
            recordIndex: 2
        }
    }

    componentDidMount() {
      searchInput  = document.getElementById('globalsearch');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.Inventory.length > 0) {
          let me = document.getElementById('DashboardInventoryTableWrapper');

          if ((me.scrollTop >= me.scrollHeight - (me.clientHeight + 10)) && InventoryTable_Tableloader === false) {
              InventoryTable_Tableloader = true;
              if (InventoryPageSize * this.state.ipn < this.props.InventoryTotalRecords) {
                  this.props.nextPage(this.state.orderBy, this.state.order, this.state.recordBy, this.state.ipn + 1)// console.log('Event listener added')
              }
          } else {
            me.addEventListener('scroll', this.handleScroller);
          }

          // Default to "active" being the first item
          if (!this.state.active) {
            this.setState({active: this.props.Inventory[0]});
          }
        }
        
      
        if (this.props.Inventory.length != this.state.inventoryLength) {
            this.setState({inventoryLength: this.props.Inventory.length})
            InventoryTable_Tableloader = false;
        }

        if (prevProps.InventoryTotalRecords != this.props.InventoryTotalRecords) {
            this.setState({itr: this.props.InventoryTotalRecords})
        }

        if (prevProps.InventoryPageNumber != this.props.InventoryPageNumber) {
            this.setState({ipn: this.props.InventoryPageNumber})
        }
    }

    setCookie(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    handleChange = name => event => {
        let cookietext;
        let contexttext;
        if (name === "UPC/GTIN") {
            cookietext = "I2UPC"
            contexttext = "IUPC"
        } else {
            cookietext = "I2" + name;
            contexttext = "I" + name;
        }

        let newtable = this.context.state.ITable2;
        newtable[contexttext] = event
            .target
            .checked
            .toString();

        this
            .context
            .updateValue('ITable2', newtable);

        this.setCookie(cookietext, event.target.checked)
        //setState({ ...state, [name]: event.target.checked });
    };

    handleScroller = event => {

        let me = document.getElementById('DashboardInventoryTableWrapper');
        // console.log(this.state.ipn) console.log(Tableloader)
        if ((me.scrollTop >= me.scrollHeight - (me.clientHeight + 10)) && InventoryTable_Tableloader === false) {
            InventoryTable_Tableloader = true;
            // console.log('reached bottom'); console.log(InventoryPageSize)

            if (InventoryPageSize * this.state.ipn < this.state.itr) {
                // console.log('yes')
                this
                    .props
                    .nextPage(this.state.orderBy, this.state.order, this.state.recordBy, this.state.ipn + 1)
            }

        }
    }

    Closepop1 = () => {
        this.setState({anchorEl1: null})
    }
    Closepop2 = () => {
        this.setState({anchorEl2: null})
    }
    Closepop3 = () => {
        this.setState({anchorEl3: null})
    }

    Openpop1 = event => {
        this.setState({anchorEl1: event.currentTarget})
    };
    Openpop2 = event => {
        this.setState({anchorEl2: event.currentTarget})
    };
    Openpop3 = event => {
        this.setState({anchorEl3: event.currentTarget})
    };

    modalClose = () => {
        this.setState({modalopen: false})
    }
    modalOpen = () => {
        this.setState({modalopen: true})
    }

    handleChangePage = (newPage) => {
        this
            .props
            .sortData(this.state.orderBy, this.state.order, this.state.recordBy, newPage)
    };

    handleChangeRow(id) {
        let obj = this
            .props
            .Inventory
            .find(o => o.productId || o.inventoryId === id);
        if (obj != null) {
            this.setState({active: obj})
        }
    }

    sortData(text) {

        this.setState({anchorEl1: null})

        text = text.toLowerCase();

        if (text === 'location') {
            text = 'bin-code'
        } else if (text === 'date') {
            text = 'scan-on'
        }

        if (this.state.orderBy === text) {

            if (this.state.order === 'asc') {
                this.setState({order: 'desc'})
                this
                    .props
                    .sortData(text, 'desc', this.state.recordBy, 1)
            } else {
                this.setState({order: 'asc'})

                this
                    .props
                    .sortData(text, 'asc', this.state.recordBy, 1)
            }
        } else {

            this.setState({order: 'asc'})
            this.setState({orderBy: text})
            this
                .props
                .sortData(text, 'asc', this.state.recordBy, 1)
        }

    }

    periodData(index) {
        this.setState({anchorEl2: null})
        this.setState({recordIndex: index})

        if (index === 0) {
            if (this.state.recordBy === 3) {
                console.log('Already Sort By Period')
            } else {
                this.setState({recordBy: 3})
                this
                    .props
                    .sortData(this.state.orderBy, this.state.order, 3, 1)
            }
        } else if (index === 1) {
            if (this.state.recordBy === 7) {
                console.log('Already Sort By Period')
            } else {
                this.setState({recordBy: 7})
                this
                    .props
                    .sortData(this.state.orderBy, this.state.order, 7, 1)
            }
        } else if (index === 2) {
            if (this.state.recordBy === 30) {
                console.log('Already Sort By Period')

            } else {
                this.setState({recordBy: 30})
                this
                    .props
                    .sortData(this.state.orderBy, this.state.order, 30, 1)
            }
        } else if (index === 3) {
            if (this.state.recordBy === 90) {
                console.log('Already Sort By Period')
            } else {
                this.setState({recordBy: 90})
                this
                    .props
                    .sortData(this.state.orderBy, this.state.order, 90, 1)
            }
        }

    }

    render() {
        const table = this.context.state.ITable2;
        const pop1open = Boolean(this.state.anchorEl1);
        const pop2open = Boolean(this.state.anchorEl2);
        const pop3open = Boolean(this.state.anchorEl3);

        const id1 = pop1open
            ? 'simple-popover'
            : undefined;
        const id2 = pop2open
            ? 'simple-popover'
            : undefined;
        const id3 = pop3open
            ? 'simple-popover'
            : undefined;

        const {classes} = this.props;
        const active = this.state.active;

        return (
            <div style={{width:'100%',height:'100%',whiteSpace:'no-wrap'}}>
              <div style={{position: 'relative', fontSize: '20px', color:'#8B90A0', fontFamily:'SF UI Text Regular'}}>
                Inventory {searchInput && searchInput.value ? ' containing "' +  searchInput.value + '"' : "" }
              </div><br />

              <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.modalopen}
                  onClose={this.modalClose}>
                  <DialogContent style={{height: '100%'}}>
                      <ImageModal
                          Inventory={this.props.Inventory}
                          active={this.state.active != null
                          ? this.state.active
                          : Object
                              .entries(this.props.Inventory)
                              .length >= 1
                              ? this.props.Inventory[0]
                              : null}
                          modalClose={this.modalClose}/>
                  </DialogContent>
              </Modal>

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
                                        backgroundImage: this.state.active && this.state.active.imageUrl ? 'none' : `url(${blank}) no-repeat center center`, 
                                        backgroundSize: '25%', 
                                        // border: this.state.active && this.state.active.imageUrl ? 'none' : '2px solid #EBF4FD',
                                        }} onClick={this.modalOpen}>
                                        <img
                                          id="ProductImage"
                                          alt=""
                                          style={{backgroundImage: this.state.active && this.state.active.imageUrl ? 'none' : `url(${blank}) no-repeat center center`, 
                                        backgroundSize: '25%', maxWidth: '100%', maxHeight: '100%', minWidth: '100%', objectFit: 'contain', border: 'none'}}
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
                                              <tbody>
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
                                            </tbody>
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
                                                              this.handleChangeRow(row.productId || row.inventoryId);
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
                                                                          { row.productName === "Empty" ? "" : 
                                                                            <img alt="" src={row.imageUrl} style={{maxHeight: '100%', objectFit: 'contain', verticalAlign: 'middle'}} />
                                                                          }
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
                          (`1 - ${this.props.InventoryPageNumber * InventoryPageSize > this.props.InventoryTotalRecords || this.props.Inventory.length >= this.props.InventoryTotalRecords
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

InventoryTable.contextType = MyContext;
export default withStyles(style)(InventoryTable);