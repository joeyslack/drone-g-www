import React, {Component} from 'react';
import * as moment from 'moment';

import Checkbox from '@material-ui/core/Checkbox';
import './DashboardRackTable.css'
import MyContext from '../../../themeContext';

import {withStyles} from '@material-ui/core/styles';

// import RingLoader from 'react-spinners/RingLoader'; import RiseLoader from
// 'react-spinners/RiseLoader';
import DotLoader from 'react-spinners/DotLoader';
import SyncLoader from 'react-spinners/SyncLoader';
import BarLoader from 'react-spinners/BarLoader';

import {Button, Hidden} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import VerticalAlignBottomOutlinedIcon from '@material-ui/icons/VerticalAlignBottomOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import FilterListIcon from '@material-ui/icons/FilterList'; import
// DateRangeIcon from '@material-ui/icons/DateRange';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import PieChart from 'react-minimal-pie-chart'; import TablePagination from
// '@material-ui/core/TablePagination';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SortByIcon from '../../icons/SortBy.png';
import CalendarIcon from '../../icons/Calendar.png';
import PlayBack from '../../icons/file.png';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


// import MyContext from '../../../themeContext'; import ChevronRightIcon from
// '@material-ui/icons/ChevronRight'; import ChevronLeftIcon from
// '@material-ui/icons/ChevronLeft';

const minHeight = '100%';
let Tableloader = false;
const RackTablePageSize = 9;

const style = theme => ({
    root: {
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '15px',
        // width: 'calc(100% - 20px)',
        // display: 'inline-block',
        display: 'block',
        height: '100%',
        background: 'white',
        // border: 'thick solid red',
    },
    tableWrapper: {
        // height: 'calc(100% - 65px)', //30 px above 35 px below
        height: 'calc(100% - 85px)',
        overflow: 'auto',
        background: ''
    },
    paper: {},
    table: {},
    tablesideone: {
        paddingTop: '30px',

        width: '17%',
        // minWidth:'170px',
        maxWidth: '17%',

        height: 'calc(100% - 30px)',
        //maxHeight: 'calc(100)',

        display: 'inline-block',
        background: '',
        marginBottom: '30px'
    },
    tablesidetwo: {
        paddingTop: '30px',
        width: '21%',
        marginBottom: '30px',
        // minWidth:'150px',
        maxWidth: '21%',

        height: 'calc(100% - 30px)',

        //maxHeight: 'calc(100)',
        overflow: 'auto',
        display: 'inline-block',
        background: ''
    }

});

const StyledTableRow = withStyles(theme => ({
    root: props => ({
      // borderCollapse: 'collapse',
      // height: '45px', border: 'thick solid blue !important', '&:nth-of-type(odd)':
      // {   // backgroundColor: theme.palette.background.default, }
      // '& td, & th': {
      //   borderBottom: props.borderBottom
      // },
      '&:hover td, &:hover th': {
        // borderTop: '1px solid #e7e7e7',
        // borderBottom: '1px solid #e7e7e7',
        backgroundColor: '#f9f9f9',
      },
      // '&:hover td:first-child': {
      //   borderLeft: '2px solid #f1f1f1'
      // }
    })
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
    head: {
        fontFamily: 'SF UI Text Regular',
        backgroundColor: '#F7F8FC',
        textAlign: 'left',
        cursor: 'default',
        borderBottom: '1px solid #f1f1f1',
        lineHeight: '1',
        /* Nabla Grey */
        color: '#8B90A0',
        fontSize: '13px',
        padding: '12px'
    },
    body: {
        fontSize: '15px',
        fontFamily: 'SF UI Text Regular',
        /* Nabla Black */
        color: '#232735',
        border: 'none',
        /* Nabla Grey */
        // borderBottom: '1px solid rgba(139, 144, 160, 0.2)',
        borderBottom: '0.75px solid #f5f5f5',
        lineHeight: '13px',
        // '& Button': {   background: 'blue' }
        marginLeft: '0',
        padding: '1em',
        // '@media only screen and (max-width: 960px)': {
        //   padding: '1em',
        // }
    }
}))(TableCell);

class RackTableMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lrcLength: null,
            order: 'desc',
            orderBy: 'Mission',
            recordBy: 999,
            recordIndex: 0,
            anchorEl1: null,
            anchorEl2: null,
            anchorEl3: null
        }

        //   const [order, setOrder] = React.useState('desc');     const [orderBy,
        // setOrderBy] = React.useState('Mission');     const [recordBy,setRecordBy] =
        // React.useState(30);     const [recordIndex,setRecordIndex] =
        // React.useState(2);     const [anchorEl1, setAnchorEl1] =
        // React.useState(null); const [anchorEl2, setAnchorEl2] = React.useState(null);
        // const [anchorEl3, setAnchorEl3] = React.useState(null); const [records,
        // setRecords] = React.useState(0);
    }

    componentDidUpdate() {
        if (this.props.Lrc.length > 0) {
            let me = document.getElementById('DashboardRackTableTableWrapper');

            if ((me.scrollTop >= me.scrollHeight - (me.clientHeight + 10)) && Tableloader === false) {

                console.log('reached bottom');
                Tableloader = true;

                if (this.props.Lrc.length < this.props.LrcTotalRecords) {
                    // console.log('data loaded')
                    this.props.nextPage(this.state.orderBy, this.state.order, this.state.recordBy, this.props.LrcPageNumber + 1) // console.log('Event listener added')
                }
            } else 
                me.addEventListener('scroll', this.handleScroller);
            }
        
        if (this.props.Lrc.length !== this.state.lrcLength) {
            this.setState({lrcLength: this.props.Lrc.length})
            Tableloader = false;
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
        this.setState({anchorEl1: event.currentTarget});
    };
    Openpop2 = event => {
        this.setState({anchorEl2: event.currentTarget});
    };
    Openpop3 = event => {
        this.setState({anchorEl3: event.currentTarget});
    };

    handleChangePage = (newPage) => {
        // console.log(this.state.orderBy + this.state.order + this.state.recordBy +
        // (newPage))
        this.props.nextPage(this.state.orderBy, this.state.order, this.state.recordBy, newPage)
    };

    setCookie(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    handleChange = name => event => {
        let cookietext;
        let contexttext;

        if (name === "Racks changed") {
            contexttext = "SStructure";
            cookietext = "S1Structure";
        } else if (name === "By Count") {
            contexttext = "SCount";
            cookietext = "S1Count";
        } else {
            cookietext = "S1" + name;
            contexttext = "S" + name;
        }

        let newtable = this.context.state.STable1;
        newtable[contexttext] = event
            .target
            .checked
            .toString();

        this
            .context
            .updateValue('STable1', newtable);

        this.setCookie(cookietext, event.target.checked)
    };

    handleScroller = () => {
        let me = document.getElementById('DashboardRackTableTableWrapper');
        // console.log(this.props.Lrc.length) console.log(this.props.LrcTotalRecords);
        // console.log(Tableloader)
        if ((me.scrollTop >= me.scrollHeight - (me.clientHeight + 10)) && Tableloader === false) {
            Tableloader = true;
            // console.log('reached bottom'); console.log(InventoryPageSize)

            if (this.props.Lrc.length < this.props.LrcTotalRecords) {
                // console.log('data loaded')
                this.props.nextPage(this.state.orderBy, this.state.order, this.state.recordBy, this.props.LrcPageNumber + 1)
            }

        }
    }

    sortData(text) {
        this.setState({anchorEl1: null})
        text = text.toLowerCase();

        if (this.state.orderBy === text) {
            if (text === 'racks-changed') {
                text = "rack-changed";
            }

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
            this.setState({orderBy: text})
            if (text === 'racks-changed') {
                text = "rack-changed";
            }
            this.setState({order: 'asc'})
            this
                .props
                .sortData(text, 'asc', this.state.recordBy, 1)
        }
    }
    periodData(index) {
        this.setState({anchorEl2: null, recordIndex: index});

        if (index === 0) {
          if (this.state.recordBy === 999) {
                console.log('Already Sort By Period')
            } else {
                this.setState({recordBy: 999})
                this.props.sortData(this.state.orderBy, this.state.order, 999, 1)
            }
        }
        else if (index === 1) {
            if (this.state.recordBy === 3) {
                console.log('Already Sort By Period')
            } else {
                this.setState({recordBy: 3})
                this
                    .props
                    .sortData(this.state.orderBy, this.state.order, 3, 1)
            }
        } else if (index === 2) {
            if (this.state.recordBy === 7) {
                console.log('Already Sort By Period')
            } else {
                this.setState({recordBy: 7})
                this.props.sortData(this.state.orderBy, this.state.order, 7, 1)
            }
        } else if (index === 3) {
            if (this.state.recordBy === 30) {
                console.log('Already Sort By Period')
            } else {
                this.setState({recordBy: 30})
                this.props.sortData(this.state.orderBy, this.state.order, 30, 1)
            }
        } else if (index === 4) {
            if (this.state.recordBy === 90) {
                console.log('Already Sort By Period')
            } else {
                this.setState({recordBy: 90})
                this.props.sortData(this.state.orderBy, this.state.order, 90, 1)
            }
        }

    }

    render() {

        const table = this.context.state.STable1;

        const headerCell = [
            "Mission", this.props.structureName + "-changed",
            "Time",
            "Date"
        ]
        const headerShow = [
            "Mission", this.props.structureName + " changed",
            "By Count",
            "Download"
        ]
        const periods = ["All", "3 Days", "Week", "Month", "3 Months"]
        const {classes} = this.props;

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

        return (
            <div
              style={{
                display: 'inline-block',
                position: 'relative',
                width: 'calc(100%)',
                background: '',
                height: '100%'
              }}
            >

                <Paper className={classes.root} square elevation={1}>
                    <Paper elevation={0} square style={{padding: '0 0 1em 0'}}>
                        <div className={classes.grow} />
                       
                        <div style={{overflow: 'hidden', position: 'relative'}}>
                          <div style={{float: 'left', fontSize: '13px', color:'#8B90A0', fontFamily:'SF UI Text Regular'}}>
                            <Hidden mdDown>
                              <div style={{position: 'absolute', bottom: '11px'}}>
                                Mission Details
                              </div>
                            </Hidden>
                          </div>
                          
                          <div style={{ float: 'right' }}>
                            <Button
                                onClick={this.Openpop1}
                                disabled={Object
                                  .entries(this.props.Lrc)
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
                                    Sort By <Hidden mdDown>{this.state.orderBy ? this.state.orderBy : ''}</Hidden>
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
                                onClick={this.Openpop2}
                                disabled={this.props.LrcResponse !== 'Success'}
                                size="small"
                                color="secondary"
                                variant="outlined"
                                style={{
                                  marginLeft: '1em'
                                }}>
                                <img
                                    src={CalendarIcon}
                                    alt="List By"
                                    style={{
                                    paddingRight: '10px'
                                }}/>
                                <p
                                    style={{
                                    color: '#8C949F',
                                    lineHeight: '30px',
                                    fontSize: '12px',
                                    fontFamily: 'SF UI TEXT Regular',
                                    padding: '0px',
                                    margin: '0px'
                                }}>
                                    {periods[this.state.recordIndex]}
                                </p>
                                <ArrowDropDownIcon
                                    style={{
                                    color: '#B9BCC6'
                                }}/>
                            </Button>

                            <Popover
                                id={id2}
                                open={pop2open}
                                anchorEl={this.state.anchorEl2}
                                onClose={this.Closepop2}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            elevation={3}>
                                {periods.map((text, index) => <div onClick={() => this.periodData(index)} className="Pop1" key={index}>{text}</div>)}
                            </Popover>

                            <Button
                                variant="text"
                                onClick={this.Openpop3}
                                disabled={this.props.LrcResponse !== 'Success'}
                                style={{paddingRight: '0', paddingLeft: '0', marginLeft: '1em', minWidth: 'auto', background: this.props.LrcResponse !== 'Success'
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
                                }}
                                elevation={3}
                                >

                                {headerShow.map((text, index) => <div
                                    key={index}
                                    style={{
                                    paddingRight: '5px'
                                }}>
                                    <Checkbox
                                        style={{padding: '0.5em 1em 0.5em 1em'}}
                                        icon={< CheckBoxOutlineBlankIcon fontSize = "small" />}
                                        checkedIcon={< CheckBoxIcon fontSize = "small" />}
                                        checked={table
                                        ? text === "Racks changed"
                                            ? table['SStructure'] === 'false'
                                                ? false
                                                : true
                                            : text === "By Count"
                                                ? table['SCount'] === 'false'
                                                    ? false
                                                    : true
                                                : table['S' + text] === 'false'
                                                    ? false
                                                    : true
                                        : false}
                                        onChange={this.handleChange(text)}
                                        size="medium"
                                        color="primary"
                                        variant="outline"
                                        inputProps={{
                                          'aria-label': 'secondary checkbox'
                                        }}/>
                                    <span className={'checkboxStyle'}>
                                      {text}
                                    </span>
                                </div>)}
                            </Popover>
                        </div>
                      </div>
                    </Paper>





                    <div className={classes.tableWrapper} id="DashboardRackTableTableWrapper">
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
                                            {table.SMission === 'true'
                                                ? <StyledTableCell style={{paddingLeft: '0'}}>Mission</StyledTableCell>
                                                : null}
                                            {table.SStructure === 'true'
                                                ? <StyledTableCell>{this.props.structureName}&nbsp;Changed</StyledTableCell>
                                                : null}
                                            {table.SCount === 'true'
                                                ? <StyledTableCell>By Count&nbsp;</StyledTableCell>
                                                : null}
                                            {table.SDownload === 'true' && this.props.Mini === false
                                                ? <StyledTableCell>Download&nbsp;</StyledTableCell>
                                                : null}
                                            {table.SDate === 'true'
                                                ? <StyledTableCell>Date&nbsp;</StyledTableCell>
                                                : null}
                                            {table.STime === 'true'
                                                ? <StyledTableCell>Time&nbsp;</StyledTableCell>
                                                : null}
                                            <StyledTableCell
                                                style={{
                                                width: '12px',
                                                padding: '0'
                                            }} />
                                        </TableRow>
                                    </TableHead>

                                    {Object
                                        .entries(this.props.Lrc)
                                        .length > 0
                                        ? <TableBody>
                                                {this
                                                    .props
                                                    .Lrc
                                                    .map((row, index) => (
                                                        <StyledTableRow 
                                                          style={{
                                                            background: this.props.ActiveMissionId === row.missionId
                                                              ? '#F7F8FC'
                                                              : null,
                                                            cursor: this.props.triggerMissionOn === true
                                                              ? 'pointer'
                                                              : 'not-allowed'
                                                          }}
                                                          key={row.missionId + '_' + index}
                                                          onClick={() => this.props.triggerMission(row.missionId)}>

                                                            <td className="spacer"></td>
                                                            {table.SMission === 'true'
                                                                ? <StyledTableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        style={{
                                                                        paddingLeft: '0'
                                                                    }}>
                                                                        {row.missionName}
                                                                    </StyledTableCell>
                                                                : null}
                                                            {table.SStructure === 'true'
                                                                ? <StyledTableCell>
                                                                        {row.changeCount}&nbsp;Racks {/* <ArrowRightIcon
                                                                      color="action"
                                                                      style={{
                                                                        verticalAlign: 'middle'
                                                                    }}/> */}
                                                                    </StyledTableCell>
                                                                : null}
                                                            {table.SCount === 'true'
                                                                ? <StyledTableCell>Run&nbsp;{row.runCounter}
                                                                        {row.runCounter === 0
                                                                            ? 'th'
                                                                            : null}
                                                                        {row.runCounter === 1
                                                                            ? 'st'
                                                                            : null}
                                                                        {row.runCounter > 2
                                                                            ? 'nd'
                                                                            : null}
                                                                        {row.runCounter > 3
                                                                            ? 'rd'
                                                                            : null}
                                                                        {row.runCounter > 4
                                                                            ? 'th'
                                                                            : null}
                                                                        {/* <ArrowDropDownIcon
                                                                          color="action"
                                                                          style={{
                                                                            verticalAlign: 'middle'
                                                                        }}/> */}
                                                                    </StyledTableCell>
                                                                : null}
                                                            {/* {state.date?  <StyledTableCell align="left"> {row.createdOn.split('T')[0]} </StyledTableCell> : null} */}
                                                            {table.SDownload === 'true' && this.props.Mini === false
                                                                ? <StyledTableCell size="small" style={{margin:'0', padding:'0'}}>
                                                                        <Button
                                                                            onClick={() => this.props.GetDownload(row.missionId)}
                                                                            color="primary"
                                                                            size="small" style={{margin:'0', padding: '0', fontSize: '0'}}>
                                                                            <VerticalAlignBottomOutlinedIcon size="small" />
                                                                        </Button>
                                                                    </StyledTableCell>
                                                                : null}

                                                            {table.SDate === 'true'
                                                                ? <StyledTableCell>
                                                                        {moment(row.completedOn).format('M/D/YY')}
                                                                    </StyledTableCell>
                                                                : null}
                                                            {table.STime === 'true'
                                                                ? <StyledTableCell>
                                                                        {moment(row.completedOn).format('LT')}
                                                                    </StyledTableCell>
                                                                : null}
                                                            <td className="spacer">
                                                              {/* <IconButton aria-label="delete" onClick={() => {
                                                                if (this.props && this.props.postAndUpdate) {
                                                                  this.props.postAndUpdate(`/missions/${row.missionId}/delete`, {'missionId': row.missionId}, () => {
                                                                    // Do nothing
                                                                    // this.forceUpdate();
                                                                    window.location.reload();
                                                                  });
                                                                }
                                                              }} color="default">
                                                                <DeleteIcon />
                                                              </IconButton> */}
                                                            </td>
                                                        </StyledTableRow>
                                                    ))
}
                                                <tr
                                                  style={{
                                                    height: '0',
                                                    width: '0'
                                                }}></tr>
                                            </TableBody>
                                        : null}
                                </Table>
                            : null}

                        {this.props.Lrc.length > 0
                            ? this.props.Lrc.length < this.props.LrcTotalRecords
                                ? <div
                                        style={{
                                        padding: '20px'
                                    }}>
                                        <SyncLoader size={10} margin={'10px'} color={'#e7e7e7'} loading={true} />
                                    </div>
                                : null
                            : null
}

                        {this.props.LrcResponse !== 'Success'
                            ? <div
                                    style={{
                                    background: '',
                                    paddingLeft: 'calc(50% - 50px)',
                                    height: '122px',
                                    paddingTop: '100px'
                                }}>
                                    <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
                                </div>
                            : null
}

                    </div>

                    {/* <div style={{height:'40px',width:'100%',background:'',marginTop:'-5px'}}>
                  <TablePagination
                  onChangePage=   {handleChangePage}
                  component=   "div"
                  count=   {props.LrcTotalRecords || 0}
                  rowsPerPageOptions = {[]}
                  rowsPerPage={3}
                  page={props.LrcPageNumber-1}
                  />
                  </div> */}
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
                            {this.props.LrcTotalRecords &&  this.props.LrcTotalRecords !== "null" ?
                              (`1 - ${this.props.LrcPageNumber * RackTablePageSize > this.props.LrcTotalRecords
                                ? this.props.LrcTotalRecords
                                : (this.props.LrcPageNumber) * RackTablePageSize} of ${this.props.LrcTotalRecords}`)
                            : ''}
                        </span>
                            {/* <span className="tablebutton1Style" style={{background:this.props.LrcPageNumber<2?'none':''}} onClick={()=>this.props.LrcPageNumber>1?handleChangePage(this.props.LrcPageNumber-1):null}>   <ChevronLeftIcon  style={{ color:this.props.LrcPageNumber>1?'black':'rgb(0,0,0,0.2) '}}/>  </span>
<span className="tablebutton1Style" style={{background:RackTablePageSize*this.props.LrcPageNumber>=this.props.LrcTotalRecords?'none':''}} onClick={()=>RackTablePageSize*this.props.LrcPageNumber<this.props.LrcTotalRecords?handleChangePage(this.props.LrcPageNumber+1):null}>   <ChevronRightIcon style={{color:RackTablePageSize*this.props.LrcPageNumber<this.props.LrcTotalRecords?'black':'rgb(0,0,0,0.2)'}}/> </span> */}
                    </div>

                </Paper>
                {/*
                  <div className={classes.tablesideone}>
                    {props.LrcResponse=='Success' ?
                      <PieChart
                      style={{margin:'0px',padding:'0px'}}
                      animate={!props.render}
                      animationDuration={3000}
                      style={{height:'100%'}}
                      radius="45"
                      data={[
                        { title: 'Structure Changed', value: props.Chart.structureChanged, color: '#6D6E71' },
                        { title: 'Structure Error', value: props.Chart.structureScanned, color: '#BE1E2D' },
                        { title: 'Structure Scanned', value: props.Chart.structureError, color: '#45B649' },
                        { title: 'Structure Unchanged', value: props.Chart.structureUnchanged, color: '#36BEBD' },
                      ]}
                      />
                    :null
                    }
                  </div>
                  */}

                {/*
                  {props.LrcResponse=='Success' ?
                    <div className={classes.tablesidetwo}>
                      <div style={{display: 'flex', flexDirection: 'column',justifyContent:'center',height:'100%'}}>
                        <div style={{marginBottom:'10px'}}>
                          <span style={{height:'10px',width:'10px',background:'#6D6E71',display:'inline-block',marginRight:'10px'}}></span>
                          <span style={{ color: '#8B90A0',fontSize: 13, fontFamily:'SF UI TEXT Regular'}}> Structure Changed  : <span style={{fontFamily:'SF UI TEXT Bold',color: 'black'}} >{props.Chart.structureChanged}</span>   </span>
                        </div>
                        <div style={{marginBottom:'10px'}}>
                          <span style={{height:'10px',width:'10px',background:'#BE1E2D',display:'inline-block',marginRight:'10px'}}></span>
                          <span style={{ color: '#8B90A0',fontSize: 13, fontFamily:'SF UI TEXT Regular'}}> Structure Error : <span style={{fontFamily:'SF UI TEXT Bold',color: 'black'}} > {props.Chart.structureScanned}</span>  </span>
                        </div>
                        <div style={{marginBottom:'10px'}}>
                          <span style={{height:'10px',width:'10px',background:'#45B649',display:'inline-block',marginRight:'10px'}}></span>
                          <span style={{ color: '#8B90A0',fontSize: 13, fontFamily:'SF UI TEXT Regular'}}>Structure Scanned : <span style={{fontFamily:'SF UI TEXT Bold',color: 'black'}} > {props.Chart.structureError} </span>   </span>
                        </div>
                        <div style={{marginBottom:'10px'}}>
                          <span style={{height:'10px',width:'10px',background:'#36BEBD',display:'inline-block',marginRight:'10px'}}></span>
                          <span style={{ color: '#8B90A0',fontSize: 13, fontFamily:'SF UI TEXT Regular'}}>Structure Unchanged : <span style={{fontFamily:'SF UI TEXT Bold',color: 'black'}} >{props.Chart.structureUnchanged}</span>  </span>
                        </div>
                      </div>
                    </div>
                  :
                    null
                  }
                  */}
            </div>
        )
    }
}

RackTableMap.contextType = MyContext;
export default withStyles(style)(RackTableMap);