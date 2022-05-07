import React from 'react';


function Blocks(props){
 
    const items = [];
    for (var i =0;i<props.number;i++) {
        items.push( <div key={i} style={{border:'1px solid #94A2CE',background:'white',height:'50px',width:'20px'}}> </div> )
       
    }
      return items;

}

export default function Aisle(props){

    return(
        <div style={{textAlign:'center',float:'left',padding:'5px',}}>

{ props.aisleSide==='Right'?<div style={{paddingLeft:'50px'}}>
    
    <span style={{color:'#8B90A0',paddingRight:'5px'}}>{props.aisleSide}</span>

    <span style={{display:'inline-block'}} >

   
<span style={{padding:'5px',border:'2px solid #2493F3',color:'#2493F3'}}> {props.aisleName} </span>

<div style={{marginLeft:'15%',marginTop:'15px'}}>
<Blocks   number={props.aisleLength}  />
</div>

</span>

</div>


:

<div>
    

<span style={{display:'inline-block'}} >


<span style={{padding:'5px',marginBottom:'50px',border:'2px solid #2493F3',color:'#2493F3'}}> {props.aisleName} </span>

<div style={{marginLeft:'15%',marginTop:'15px'}}>
<Blocks   number={props.aisleLength} />
</div>

</span>
<span style={{color:'#8B90A0',paddingLeft:'5px'}}>{props.aisleSide}</span>

</div> }



        </div>
    );

}