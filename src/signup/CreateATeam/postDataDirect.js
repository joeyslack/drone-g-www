
const   PostData =   (url,req,functions) => {

  var credentials = { 'Method': 'ANONYMOUS', 'MethodIdentity': 'GUEST', 'TeamName': '', 'MethodPasscode': 'GUEST', 'DeviceKey': 'MyPC', 'ApplicationKey': 'MyBrowser', 'Platform': 'DESKTOP' };




    let object;
    fetch(url,{
    method: 'POST',
    headers: {
    
      'Content-Type': 'application/json',
      "Authorization": "Basic " + btoa(JSON.stringify(credentials))



    },
 body: JSON.stringify(req)
  })
  .then (  function (response)  {
    console.log(response)
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return response;
    }

    else return response.json()
    
  
  
  
  })
  .then (  function(data) {
    
    console.log(data)
    if(data.responseCode==="Success")
    { console.log("Success")
      object=data;
    }
    else {object=data; console.log("Failed")}


    functions(object);

  }
  
  )



 
}

 
   
  export default PostData;