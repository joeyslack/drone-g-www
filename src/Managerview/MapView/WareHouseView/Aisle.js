import React from 'react';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import ImageModal from '../AisleView/Imagemodal';
import DialogContent from '@material-ui/core/DialogContent';
import { Modal } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));


function Racks(props){

    const [activeBin,setActiveBin] = React.useState(null);
    const [activeId,setActiveId] = React.useState(null);

    const [modal,setModal] = React.useState(false);

    const handlePopoverOpen = (event,bin)  => {
        console.log(event)
        console.log(bin)
        setActiveBin(bin);
        setAnchorEl(event.currentTarget);
      };
    
    const handlePopoverClose = event => {
        setActiveBin(null)
        setAnchorEl(null);
      };

      const modalClose=()=>{
        setModal(false)
      }
    const  modalOpen=(id)=>{
        setActiveId(id)
        setModal(true)
      }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


   


 
    // const items = [];
    // for (var i =0;i<props.number;i++) {
    //     items.push( 
        
    //     <div key={"Rack " + props.Name + " " +  i} style={{display:'block',paddingBottom:'5px',background:'',height:'45px',width:'34px'}}>

    //             <div style={{display:'inline-block',padding:'0px',width:'12px',height:'45px',verticalAlign:'top',background:'',paddingRight:'10px'}}>

    //           <div key={"Rack " + props.Name + " " +  i + "Bin 1"} style={{display:'block',border:'1px solid #94A2CE',background:'white',height:'7px',width:'10px'}}> </div>
    //           <div key={"Rack " + props.Name + " " +  i + "Bin 2"} style={{display:'block',border:'1px solid #94A2CE',background:'white',height:'7px',width:'10px'}}> </div>
    //           <div key={"Rack " + props.Name + " " +  i + "Bin 3"} style={{display:'block',border:'1px solid #94A2CE',background:'white',height:'7px',width:'10px'}}> </div>
    //           <div key={"Rack " + props.Name + " " +  i + "Bin 4"} style={{display:'block',border:'1px solid #94A2CE',background:'white',height:'7px',width:'10px'}}> </div>
    //           <div key={"Rack " + props.Name + " " +  i + "Bin 5"} style={{display:'block',border:'1px solid #94A2CE',background:'white',height:'7px',width:'10px'}}> </div>
              
    //           </div>
              
    //          <div key={i} style={{padding:'0px',display:'inline-block',border:'1px solid #94A2CE',background:'white',height:'43px',width:'10px'}}> </div>
            

    //    </div>
    //     )
       
    // }
    //   return items;
    const classes = useStyles();
    return (
    <div>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
          elevation={2}
        >
        {
            activeBin!=null?
            <div id="WarehouseAisleBinPopperDiv"    style={{cursor:'pointer',marginBottom:'1px',textAlign:'center',display:'block',background:'white',height:`100px`,width:'100px',border:'1px solid #94A2CE',backgroundRepeat:' no-repeat', backgroundPosition: 'right'}}>
                        
                       <div style={{position:'relative',border:activeBin.hasScanned? activeBin.hasError?'3px solid #EC6761':activeBin.hasChanged?'3px solid #3EE9CA':'3px solid #28A5F6':'white', width:'calc(100% - 6px)',height:'calc(100% - 6px)'}}>
                            {activeBin.imageUrl!=null?<img src={activeBin.imageUrl} style={{zIndex:'0',position:'absolute',top:'0px',right:'0px',width:'auto',height:'100%',maxWidth:'100%',maxHeight:'100%'}}  />:null}
                            <span style={{position:'absolute',top:'0px',right:'0px',zIndex:'1',textAlign:'left',padding:'4px',background:'#8B90A0',fontSize:'10px',fontFamily:'SF UI Text Semibold',color:'white'}}> {activeBin.code} </span> 
                            <span style={{position:'absolute',top:'0px',left:'0px',zIndex:'1',textAlign:'left',padding:'4px',background:'#8B90A0',fontSize:'10px',fontFamily:'SF UI Text Semibold',color:'white'}}> {activeBin.itemCount} </span> 

                                  {/* <span id="AisleSmallItemCountDiv"> {activeBin.itemCount} </span> */}
                       </div>
            </div>
            
            :null
        }
      </Popover>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={modal}
            maxwidth={'100%'}
            maxheight={'100%'}
            //onClose={modalClose}
            >
            <DialogContent style={{height: '100%'}}>
              <ImageModal MissionId={ props.MissionId } binId={activeId} modalClose={modalClose} />
            </DialogContent>
          </Modal>



        {
            props.Racks.map((rack,id)=>
            <div key={rack.code} style={{display:'block',paddingBottom:'5px',background:'',height:'45px',width:'34px'}}>
                <div  style={{display:'inline-block',padding:'0px',width:'12px',height:'45px',verticalAlign:'top',background:'',paddingRight:'10px'}}>
                    {
                      rack.children.map((bin,id)=>
                      <div id="WareHouseAisleBinDiv" key={bin.code} onClick={()=>{ if(props.MissionId!=null&&bin.hasScanned){modalOpen(bin.id)}}} onMouseLeave={handlePopoverClose} onMouseOver={(e)=>{handlePopoverOpen(e,bin)}} style={{display:'block',border:'1px solid',borderColor:bin.hasScanned?'#2380D0':bin.hasError?'#2380D0':bin.hasChanged?'#44BB9E':'#94A2CE',background:bin.hasScanned? bin.hasError?'#EC6761':bin.hasChanged?'#3EE9CA':'#28A5F6':'white',height:'7px',width:'10px'}}> </div>

                      )
                    }
                </div>
                <div key={rack.code} style={{padding:'0px',display:'inline-block',border:'1px solid',borderColor:rack.hasScanned?'#2380D0':rack.hasError?'#2380D0':rack.hasChanged?'#44BB9E':'#94A2CE',background:rack.hasScanned? rack.hasError?'#EC6761':rack.hasChanged?'#3EE9CA':'#28A5F6':'white',height:'43px',width:'10px'}}>
                </div>
            </div>
            )
        }
    </div>

    )

}

export default function Aisle(props){

    return(
        <div style={{background:'',textAlign:'center',float:'left',padding:'10px',}}>



<div>
    

<span style={{display:'inline-block'}} >


<span style={{padding:'5px',marginBottom:'50px',border:'2px solid #2493F3',color:'#2493F3',marginLeft:'5px'}}>
    {props.aisleName}
</span>

<div style={{marginLeft:'15%',marginTop:'15px'}}>
<Racks Racks={props.Aisle.children} MissionId={props.MissionId} />
</div>

</span>


</div> 



        </div>
    );

}