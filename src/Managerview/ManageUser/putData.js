const PutData= async(url,additionalData,callback)=>{

    
   
    var api_Token = additionalData.token;

  
    let token;
    
return fetch(url,{
    method:'Put',
    headers:{
        'Token':api_Token,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(additionalData.body)
    }).then(response=>{
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return response;
      }
  
      else { token=response.headers.get('Token'); return response.json() }
    
})
.then(response => callback(response,token))
.catch( err => alert('Unexpected error occured. Please refresh the page'))



}

export default PutData;