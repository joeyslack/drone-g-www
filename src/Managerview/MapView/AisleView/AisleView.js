import React, {
  Component
} from 'react';
import AisleSmall from './AisleSmall';
import './aisleview.css';

// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


class AisleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0,
      totalKey: null,
      modal: false,
      newStructure: []
    }
    this.handleNext = this.handleNext.bind(this);
  }

  compare(a, b) {

    let labelOne = a.label.match(/\d+$/);
    labelOne = parseInt(labelOne, 10)

    let labelTwo = b.label.match(/\d+$/);
    labelTwo = parseInt(labelTwo)

    let comparison = 0;
    if(labelOne > labelTwo) {
      comparison = 1;
    } else if(labelOne < labelTwo) {
      comparison = -1;
    }
    return comparison;
  }


  componentDidMount() {
    // console.log('cDm')
    let newStructure = this.props.Structure;
    // newStructure = JSON.parse(newStructure);
    let array = this.props.Structure.children;
    for(let i = 0; i < array.length; i++) {
      let sortMe = array[i].children
      sortMe.sort(this.compare)
      newStructure.children[i].children = sortMe;
    }

    this.setState({
      newStructure
    })

  }

  handleNext(state) {
    if(state === true) {
      let activeKey = this.state.activeKey;
      if(this.state.activeKey < this.props.Structure.children.length - 1) {
        activeKey = activeKey + 1;
        this.setState({
          activeKey
        });
      }
    } else if(state === false) {
      let activeKey = this.state.activeKey;
      if(this.state.activeKey > 0) {
        activeKey = activeKey - 1;
        this.setState({
          activeKey
        });
      }
    }
  }
  render() { 
    const multiplier=this.props.Structure.children.length;
    return ( 
    <div id="AisleViewDiv" style={{height: '100%', width: '100%'}}>           
      { this.state.newStructure.children  && this.state.newStructure.children.map((child,id) =>
        <div key={id} style={{background:'',display:'inline-block'}}>

          <div style={{display:'block',height:'29px',background:'',textAlign:'left',borderBottom:'1px solid #C9D0E2',marginLeft:'10px',}}>
            <span style={{lineHeight:'30px',fontFamily:'SF UI Text Regular',fontSize:'12px'}}> {child.label} | {child.side} </span> 
          </div>

          <div style={{display:'flex'}}>
            {/* this is the problem area */}
            <div style={{whiteSpace:'nowrap',display:'inline-block',minHeight:'calc(100% - 31px)', marginLeft:'10px'}}>  
                <AisleSmall Structure={child} MissionId={this.props.MissionId} />
            </div>

            {/* <div style={{marginTop:'10px',width:'0px',borderLeft:'5px dotted #F7F8FC',background:'#94A2CE',verticalAlign:'top',display:'inline-block',marginLeft:'10px'}}>
            </div> */}
            <div style={{marginTop:'10px',width:'0px',paddingLeft: '5px', borderLeft:'none',background:'none',verticalAlign:'top',display:'inline-block',marginLeft:'10px'}}>
            </div>
          </div>
        </div>
      )}

      {/* <div style={{width:'100%'}}>
              
                {/* <div style={{display:'inline-block',width:`calc(100%/ ${multiplier})`,height:'29px',background:'green',textAlign:'left',borderBottom:'1px solid #C9D0E2'}}>
                  <span style={{lineHeight:'30px',fontFamily:'SF UI Text Regular',fontSize:'12px'}}> </span> 
                </div> //
          
      </div> */}
          

      {/* <div style={{height:'29px',background:'',textAlign:'left',borderBottom:'1px solid #C9D0E2'}}>
      <span style={{lineHeight:'30px',fontFamily:'SF UI Text Regular',fontSize:'12px'}}> {this.props.Structure.children[this.state.activeKey].label} | {this.props.Structure.children[this.state.activeKey].side} </span>

      <div style={{display:'inline-block',float:'right'}}>
          <span className="ChevronIcon" style={{color:this.state.activeKey<1?'#8B90A0':'black', background:this.state.activeKey<1?'#F7F8FC':null }} onClick={()=>this.handleNext(false)} > <ChevronLeftIcon  style={{verticalAlign:'text-bottom'}}   /> </span>
          <span className="ChevronIcon" style={{color:this.state.activeKey<this.props.Structure.children.length-1?'black':'#8B90A0',background:this.state.activeKey<this.props.Structure.children.length-1?null:'#F7F8FC'}}>  <ChevronRightIcon style={{verticalAlign:'text-bottom'}}  onClick={()=>this.handleNext(true)}  /> </span>
      </div>
      </div> */}

      {/* <div style={{height:'calc(100% - 30px)',width:'100%'}}>

      <AisleSmall Structure={this.props.Structure.children[this.state.activeKey]} />
      </div> */}

    </div>  );
  }
}
 
export default AisleView;