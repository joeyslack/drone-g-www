import React from 'react';


function Racks(props){
 
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

    return ( 
        props.Racks.map((rack,id)=>
            <div key={rack.code} style={{display:'block',paddingBottom:'5px',background:'',height:'45px',width:'34px'}}>
                <div style={{display:'inline-block',padding:'0px',width:'12px',height:'45px',verticalAlign:'top',background:'',paddingRight:'10px'}}>
                    {
                        rack.children.map((bin,id)=>
                        <div key={bin.code} style={{display:'block',border:'1px solid #94A2CE',background:bin.hasScanned? bin.hasError?'#EC6761':bin.hasChanged?'#3EE9CA':'#28A5F6':'white',height:'7px',width:'10px'}}> </div>

                        )
                    }
           
          
           </div>
                <div key={rack.code} style={{padding:'0px',display:'inline-block',border:'1px solid #94A2CE',background:rack.hasScanned? rack.hasError?'#EC6761':rack.hasChanged?'#3EE9CA':'#28A5F6':'white',height:'43px',width:'10px'}}>
                </div>
            </div>
        )

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
<Racks Racks={props.Aisle.children} />
</div>

</span>


</div> 



        </div>
    );

}