
const   GetData =   (url,token,functions) => {



    let object;
       fetch(url,{
    method: 'GET',
    headers: {
      'Access-Control-Request-Headers':'Content-Type',
      'TOKEN':token
      ,
    }
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

 

  export default GetData;