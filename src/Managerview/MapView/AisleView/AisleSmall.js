import React from 'react';
import Noimage from './noImage.png';

import Dialog from '@material-ui/core/Dialog';
import ImageModal from './Imagemodal';
import DialogContent from '@material-ui/core/DialogContent';

import './aislesmall.css'
import { Modal } from '@material-ui/core';

function Bins(props){
  const [modal,setModal] = React.useState(false);
  const [activeId,setActiveId] = React.useState(null);
  const modalClose=()=>{
    setModal(false)
  }
  const modalOpen=(id)=>{
    setActiveId(id)
    setModal(true)
  }

  console.log(props.Bins.children, '--children');

  
  // const items = [];
  // items.push( 
  //     <div  key={props.Name + "Header "  + props.RackNumber} style={{display:'block',background:'',height:`calc(100% / ${props.NumberOfBins+1})`,width:'100%'}}>
  //     <span style={{fontSize:'11px',fontFamily:'SF UI Text Regular ',}}> {props.RackNumber} </span>
  //     </div>
  // )

  // for (var i =0;i<props.NumberOfBins;i++)
  // {
  //     items.push( 
  //         <div key={ props.Name + "Bin "  + i}  style={{display:'block',border:'1px solid #94A2CE',background:'white',height:`calc(100% / ${props.NumberOfBins+1} - 2px)`,width:'100%'}}>

  //         </div>
  //     )
  // }
  // return items;

  /*

    <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.modalopen}
                  onClose={this.modalClose}>
                  <DialogContent>
                      <ImageModal
                          Inventory={this.props.Inventory}
                          active={this.state.active != null
                          ? this.state.active
                          : Object
                              .entries(this.props.Inventory)
                              .length > 1
                              ? this.props.Inventory[0]
                              : null}
                          modalClose={this.modalClose}/>
                  </DialogContent>

              </Modal>

              */

    return (
      <div style={{width:'100%',height:'100%',whiteSpace:'no-wrap',}}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modal}
          fullWidth={true}
          maxWidth={'100%'}
          maxHeight={'100%'}
          //onClose={modalClose}
          >
          <DialogContent style={{height: '100%'}}>
            <ImageModal MissionId={ props.MissionId } binId={activeId} modalClose={modalClose} />
          </DialogContent>
        </Modal>
          
        <div  key={props.Bins.code}  style={{display:'block',background:'',height:'calc(10% - 4px)',minHeight:'40px',width:'100%',textAlign:'center'}}>
          <span style={{fontSize:'11px',fontFamily:'SF UI Text Regular '}}>{ props.Bins.label }</span>
        </div>
          
          { 
            props.Bins.children.length > 0 ?
              props.Bins.children.map((bin,text) =>
                <div className="BinMainDiv" 
                  key={bin.code} 
                  onClick = {()=>{ if( props.MissionId != null && bin.hasScanned ){ modalOpen(bin.id) }}} 
                  style={{
                    cursor:'pointer',
                    marginBottom:'1px',
                    textAlign:'center',
                    display:'block',
                    background:'',
                    height:`calc(90% / 5 - 2px)`,
                    minHeight:'60px',
                    width:'calc(100% - 2px)',
                    border:'1px solid #94A2CE',
                    backgroundRepeat:' no-repeat', 
                    backgroundPosition: 'right'}}>
                    
                  <div style={{
                    position:'relative',
                    border:bin.hasScanned ? bin.hasError ?'3px solid #EC6761' : bin.hasChanged ? '3px solid #3EE9CA' : '3px solid #28A5F6' : 'white', 
                    width:'100%',
                    height:'100%', 
                    minHeight:'60px',background:''
                  }}>
                    { bin.imageUrl !=null ? <img alt="" src={bin.imageUrl} style={{zIndex:'0',position:'absolute',top:'0px',right:'0px',width:'auto',height:'auto',maxWidth:'100%',maxHeight:'100%'}}  /> : null }
                    <div style={{display:'block',position:'absolute',top:'0px',zIndex:'2',padding:'4px',background:'#8B90A0',fontSize:'10px',fontFamily:'SF UI Text Semibold',color:'white',width:'100%',height:'auto', minHeight: '20px'}}>
                      <span className="BinMainDivItemCount">{bin.itemCount}</span> 
                      <span className="BinMainDivBinCode">{bin.code}</span> 
                    </div>
                    
                    {/* <span id="AisleSmallItemCountDiv"> {bin.itemCount} </span> */}
                  </div>
                </div>
              )
          :
          <div key={'no_null'}  style={{display:'block',border:'1px solid #94A2CE',background:'white',height:`calc(100% - 100%/5 - 2px)`,width:'calc(100% - 2px)'}}>
          </div>
        }    
      </div>
  )
}

function Racks(props){
  let items = props.Racks.slice();
  if (props.side.toLowerCase() === "left") {items = items.reverse() }

  return(
    <div style={{width:'100%',minHeight:'100%',textAlign:'left',whiteSpace:'wrap'}}>
        {items.map((rack,id) =>
          <div key={rack.code} label={rack.label} id={rack.id}  style={{verticalAlign:'top',display:'inline-block',background:'',minHeight:'100%',minWidth:'100px',width:`calc(100% / ${props.Racks.length})`}}>
            <Bins Bins={rack} MissionId={props.MissionId}/>
          </div>
        )}
    </div>
  )
}

export default function Aisle(props){
  return(
  //    props.Structure.children.map((aisle,id)=>{
  //         console.log(aisle);
  //     })
  <div style={{textAlign:'center',width:'100%',minHeight:'270px',height:'100%',whiteSpace:'wrap'}}>
    <Racks Racks={props.Structure.children} MissionId={props.MissionId} side={props.Structure.side} />
  </div>
  );
}