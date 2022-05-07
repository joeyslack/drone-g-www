import React from 'react';
import Noimage from './noImage.png';


function Bins(props){

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

    return (
        <div style={{width:'100%',height:'100%'}}>
           
           
                <div  key={props.Bins.code} style={{display:'block',background:'',height:'calc(100% / 5 - 4px)',width:'100%'}}>
                    <span style={{fontSize:'11px',fontFamily:'SF UI Text Regular ',}}> {props.Bins.label} </span>
                </div>
                { props.Bins.children.length>0?
                
                props.Bins.children.map((bin,text)=>
                    <div key={bin.code}  style={{marginBottom:'1px',textAlign:'center',display:'block',background:'white',height:`calc(100% / 5 - 2px)`,width:'calc(100% - 2px)',border:'1px solid #94A2CE',backgroundImage:`url(${Noimage})`,backgroundRepeat:' no-repeat',backgroundSize: '50px 30px', backgroundPosition: 'right'}}>
                       <div style={{border:bin.hasScanned? bin.hasError?'3px solid #EC6761':bin.hasChanged?'3px solid #3EE9CA':'3px solid #28A5F6':'white', width:'calc(100% - 6px)',height:'calc(100% - 6px)'}}>
                       <span style={{fontSize:'10px',fontFamily:'SF UI Text Semibold',color:'#8B90A0'}}> {bin.code} </span> 
                       </div>
                    </div>
                
                 )
                
            
            :
            <div key={'no null'}  style={{display:'block',border:'1px solid #94A2CE',background:'white',height:`calc(100% - 100%/5 - 2px)`,width:'calc(100% - 2px)'}}>
                        
            </div>
            }
        </div>
    )

}


function Racks(props){
 
    // const items = [];
    // for (var i =0;i<props.NumberOfRacks;i++)
    // {
    //     items.push( 
       
    //     <div key={"Rack " + props.Name + " " + i} style={{display:'inline-block',background:'',height:'100%',width:`calc(100% / ${props.NumberOfRacks})`}}>
    //         <Rack   Name={"Rack " + props.Name + " " + i} NumberOfBins={props.NumberOfBins} RackNumber={i+1}/>
    //    </div>
    //     )
       
    // }
    //return items;

    return(
    <div style={{width:'100%',height:'100%',background:''}}>
        {props.Racks.map((rack,id)=>
            <div key={rack.code} label={rack.label} id={rack.id}  style={{verticalAlign:'top',display:'inline-block',background:'',height:'100%',minWidth:'100px',width:`calc(100% / ${props.Racks.length})`}}>
             <Bins Bins={rack}/>
             {console.log(rack)}
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
    <div style={{background:'',textAlign:'center',width:'100%',height:'100%'}}>
            <Racks Racks={props.Structure.children} />
    </div>
    );

}