
import React , { Component } from 'react';
import * as moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Button, Hidden } from '@material-ui/core';

import PlayBack from '../icons/file.png'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Popover from '@material-ui/core/Popover';
import RingLoader from 'react-spinners/RingLoader';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import SortByIcon from '../icons/SortBy.png'
import CalendarIcon from '../icons/Calendar.png'

import Checkbox from '@material-ui/core/Checkbox';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import VerticalAlignBottomOutlinedIcon from '@material-ui/icons/VerticalAlignBottomOutlined';


// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import RiseLoader from 'react-spinners/RiseLoader';
import DotLoader from 'react-spinners/DotLoader';
import SyncLoader from 'react-spinners/SyncLoader';
import MyContext from '../../themeContext';

import './rackTable.css';
const minHeight = '100%';
const LrcPageSize = 30;

var RackTable_Tableloader=false;

const style = theme => ({
    root: {
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '15px',
        // width: 'calc(100% - 20px)',
        // display: 'inline-block',
        display: 'block',
        // height: 'calc(100% - 180px)',
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
        fontSize: 13,
        padding: '12px'
    },
    body: {
        fontSize: 15,
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
        // padding: '1em 12px 1em 12px'
        padding: '1em',
    }
}))(TableCell);


class RackTable extends Component {
  constructor(props) {
    super(props);
    this.state = {order:'asc',orderBy:'date',recordBy:999,recordIndex:0,anchorEl1:null,anchorEl2:null,anchorEl3:null,  }
  }

  componentDidUpdate() {
    if (this.props.Lrc.length>0) { 
      let me=document.getElementById('LrcPageRackTableWrapper');

      if ((me.scrollTop>=me.scrollHeight - (me.clientHeight + 10)) && RackTable_Tableloader===false) {
        console.log('reached bottom');
        RackTable_Tableloader=true;
     
        if (this.props.Lrc.length<this.props.LrcTotalRecords) {
          // console.log('data loaded')
          this.props.nextPage(this.state.orderBy,this.state.order,this.state.recordBy,this.props.LrcPageNumber+1)
        }
      }
      // console.log('Event listener added')
      else me.addEventListener('scroll', this.handleScroller );
    }

    if (this.props.Lrc.length!==this.state.lrcLength) {
      this.setState({lrcLength:this.props.Lrc.length});
      RackTable_Tableloader=false;
    }
  }

  handleChangePage = (newPage) => {
    // console.log(this.state.orderBy + this.state.order + this.state.recordBy + (newPage))
    this.props.nextPage(this.state.orderBy,this.state.order,this.state.recordBy,newPage)
  };


  Closepop1= () =>{this.setState({anchorEl1:null})}
  Closepop2= () =>{this.setState({anchorEl2:null})}
  Closepop3= () =>{this.setState({anchorEl3:null})}

  Openpop1 = event => { this.setState({anchorEl1:event.currentTarget}); };
  Openpop2 = event => { this.setState({anchorEl2:event.currentTarget}); };
  Openpop3 = event => { this.setState({anchorEl3:event.currentTarget}); };

  setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (10*365*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  handleChange = name => event => {

    let cookietext;
    let contexttext;

    if(name==="Racks changed")
    {
      contexttext="SStructure";
      cookietext="S2Structure";
    }
    else if(name==="By Count")
    {
      contexttext = "SCount";
      cookietext = "S2Count";
    }
    else 
      {
        cookietext="S2"+name;
        contexttext="S"+name;
      }

    let newtable=this.context.state.STable2;
    newtable[contexttext]=event.target.checked.toString();

    this.context.updateValue('STable2',newtable);
    
    this.setCookie(cookietext,event.target.checked)

  };

  handleScroller = () =>
  {
    let me=document.getElementById('LrcPageRackTableWrapper');
    
    if((me.scrollTop>=me.scrollHeight-(me.clientHeight + 10)) && RackTable_Tableloader===false)
    {
      RackTable_Tableloader=true;
     
      if(this.props.Lrc.length<this.props.LrcTotalRecords)
      {
        // console.log('data loaded')
        this.props.nextPage(this.state.orderBy,this.state.order,this.state.recordBy,this.props.LrcPageNumber+1)
      }
      
    }
  }

  sortData(text){
    
    this.setState({anchorEl1:null})  
    text=text.toLowerCase();
    
    if(this.state.orderBy===text)
    {
      if(text==='racks-changed')
      {
        text="rack-changed";
      }

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
    
      
    else 
    {
      this.setState({orderBy:text})
      if(text==='racks-changed')
      {
        text="rack-changed";
      }
      this.setState({order:'asc'})
      this.props.sortData(text,'asc',this.state.recordBy,1)
    }
  }

  periodData(index)
  {
    this.setState({anchorEl2:null,recordIndex:index})
    
    if(index===0)
    {
      if(this.state.recordBy===999)
      {
        console.log('Already Sort By Period')
      }

      else
      {
        this.setState({recordBy:999})
        this.props.sortData(this.state.orderBy,this.state.order,999,1)
      }
    }
    
    else if(index===0)
    {
      if(this.state.recordBy===3)
      {
        console.log('Already Sort By Period')
      }

      else
      {
        this.setState({recordBy:3})
        this.props.sortData(this.state.orderBy,this.state.order,3,1)
      }
    }
    
    else if(index===1)
    {
      if(this.state.recordBy===7)
      {
        console.log('Already Sort By Period')
      }
      else 
      {
        this.setState({recordBy:7})
        this.props.sortData(this.state.orderBy,this.state.order,7,1)
      }
    }
    
    else if(index===2)
    {
      if(this.state.recordBy===30)
      {
        console.log('Already Sort By Period')
      }
      else  
      {
        this.setState({recordBy:30})
        this.props.sortData(this.state.orderBy,this.state.order,30,1)
      }
    }
    else if(index===3)
    {
      if(this.state.recordBy===90)
      {
        console.log('Already Sort By Period')
      }
      else  
      {
        this.setState({recordBy:90})
        this.props.sortData(this.state.orderBy,this.state.order,90,1)
      }
    }
    
  }


  render() { 
    const table = this.context.state.STable2;
    const headerCell = ["Mission",this.props.structureName+"-changed","Date","Time"]
    const headerShow = ["Mission",this.props.structureName+" changed","By Count","Date","Download","Time"]
    const periods=["All", "3 days","Week","Month", "3 Months"]

    const {classes} = this.props;

    const pop1open = Boolean(this.state.anchorEl1);
    const pop2open = Boolean(this.state.anchorEl2);
    const pop3open = Boolean(this.state.anchorEl3);


    const id1 = pop1open ? 'simple-popover' : undefined;
    const id2 = pop2open ? 'simple-popover' : undefined;
    const id3 = pop3open ? 'simple-popover' : undefined;

    
    return (  
      <div style={{
          display: 'inline-block',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
        <Paper className={classes.root} square>
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
                  </div>
                )}
            </Popover>
          </div>
        </div>
      </Paper>


    <div id="LrcPageRackTableWrapper" className={classes.tableWrapper}>
      {table?
        <Table className={classes.table}   stickyHeader size="small"  aria-label="customized table">
          <TableHead>
            <TableRow >
              {table.SMission==='true'? <StyledTableCell>Mission</StyledTableCell>:null}
              {table.SStructure==='true'? <StyledTableCell align="left">{this.props.structureName} Changed</StyledTableCell>:null}
              {table.SCount==='true'?   <StyledTableCell align="left">By Count</StyledTableCell>:null}
              {table.SDownload==='true'? <StyledTableCell align="center">Download</StyledTableCell>:null}
              {table.SDate ==='true'? <StyledTableCell align="left">Date</StyledTableCell>:null}
              {table.STime==='true'?  <StyledTableCell align="left">Time</StyledTableCell>:null}
            </TableRow>
          </TableHead>
          { Object.entries(this.props.Lrc).length>0 ?   <TableBody style={{height:'100px'}}>
            {/* {console.log(this.props.triggerMissionOn)} */}
            { this.props.Lrc.length>0?this.props.Lrc.map((row,index) => (
              <StyledTableRow 
                style={{
                  background:row.missionId===this.props.ActiveMissionId?'#F7F8FC':null,
                  cursor:this.props.triggerMissionOn===true?'pointer':'not-allowed'}} 
                  key={row.missionId} 
                  hover 
                  onClick={()=>{this.props.changeView(true); this.props.triggerMission(row.missionId)}}>
                  
                  {table.SMission==='true'?  
                    <StyledTableCell component="th" scope="row">
                      {row.missionName}
                    </StyledTableCell> : null }
                {table.SStructure==='true'? <StyledTableCell align="left">{row.changeCount} Racks</StyledTableCell> :null}
                {table.SCount==='true'?  <StyledTableCell align="left">Run {row.runCounter} {row.runCounter===0?'th':null} {row.runCounter===1?'st':null} {row.runCounter>2?'nd':null} {row.runCounter>3?'rd':null} {row.runCounter>4?'th':null}</StyledTableCell> :null}
  
                { table.SDownload==='true' ? 
                  <StyledTableCell size="small" style={{padding:'0', margin:'0'}}>
                    <Button
                      onClick={() => this.props.GetDownload(row.missionId)}
                      color="primary"
                      size="small" style={{margin:'0', padding: '0'}}>
                      <VerticalAlignBottomOutlinedIcon size="small" />
                    </Button>
                  </StyledTableCell> :
                null }
  
                {table.SDate ==='true'? <StyledTableCell align="left">{moment(row.completedOn).format('M/D/YY')}</StyledTableCell> :null}
                {table.STime==='true'?   <StyledTableCell align="left">{moment(row.completedOn).format('LT')}</StyledTableCell> :null}
              </StyledTableRow>
            )):
           null
            
            
            
            }
          </TableBody> :null
          }
  
          </Table>
          :null }

          { this.props.Lrc.length>0  ? this.props.Lrc.length<this.props.LrcTotalRecords ? 
              <div
                  style={{
                  padding: '20px'
              }}>
                  <SyncLoader size={10} margin={'10px'} color={'#e7e7e7'} loading={true} />
              </div>
            :
              null
            : 
              null
            }
          { this.props.LrcResponse!=='Success' ?
              <div
                  style={{
                  background: '',
                  paddingLeft: 'calc(50% - 50px)',
                  height: '122px',
                  paddingTop: '100px'
              }}>
                  <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
              </div>
  :null

  }
          </div>
          <div    style={{float:'right',height:'40px',minWidth:'250px',width:'30%',background:'',paddingBottom:'0px',marginBottom:'0px'}}>
            <div style={{float:'right'}}>
              <span style={{paddingTop:'10px',fontSize:'13px',fontFamily:'SF UI text Regular',paddingRight:'30px'}}> 1 - { (this.props.LrcPageNumber)*LrcPageSize > this.props.LrcTotalRecords? this.props.LrcTotalRecords : (this.props.LrcPageNumber)*LrcPageSize }  of {this.props.LrcTotalRecords} </span>
              
              {/* <span className="rackTablebutton1Style" style={{background:this.props.LrcPageNumber<2?'none':''}} onClick={()=>this.props.LrcPageNumber>1?this.handleChangePage(this.props.LrcPageNumber-1):null}>   <ChevronLeftIcon  style={{ color:this.props.LrcPageNumber>1?'black':'rgb(0,0,0,0.2) '}}/>  </span>
              <span className="rackTablebutton1Style" style={{background:LrcPageSize*this.props.LrcPageNumber>=this.props.LrcTotalRecords?'none':''}} onClick={()=>LrcPageSize*this.props.LrcPageNumber<this.props.LrcTotalRecords?this.handleChangePage(this.props.LrcPageNumber+1):null}>   <ChevronRightIcon style={{color:LrcPageSize*this.props.LrcPageNumber<this.props.LrcTotalRecords?'black':'rgb(0,0,0,0.2)'}}/> </span> */}
             
            </div>
          </div>
  
         
          </Paper>
  
  
              </div>
             
      )
  }
}
RackTable.contextType = MyContext;
export default withStyles(style)(RackTable);
    

      






  
  
      
  
      
