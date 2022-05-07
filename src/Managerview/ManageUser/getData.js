const GetData= async(url,additionalData,callback)=>{

    
    var api_Token = additionalData.token;

  
    let token;
    
return fetch(url,{
    method:'GET',
    headers:{
        'Token':api_Token
    }
}).then(response=>{
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return response;
      }
  
      else { token=response.headers.get('Token'); return response.json() }
    
}).then(response => callback(response,token))
.catch(err => alert(err + ' Unexpected error occured. Please refresh the page'))
 

}

export default GetData;