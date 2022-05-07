
const   GetData =   (url,index,functions) => {



let object;
     fetch(url,{
  method: 'GET',
  headers: {
    'Access-Control-Request-Headers':'Content-Type',
    'TOKEN':'gxM1TocEOW6s1D3oGlN/NlnvG0TSXYc+wL7qo4IWozEQGxUoukdJ3t4z/Lm7eyiIjXJ/Sa/EU3JG2pdSz4x5lgVnscvTLqkYLEpXUybb6PW2hY2E2vaGRJFykqaT8YoXgCjRFYcjm+wU20CjvtB8qxOdDdZ40vqBWF4JNmLqOFpMABw5ZdVWXq5DqlyHRweSTN8xoeckcXX00r6b9S6a0qtT1L91tiwLjDRKjDgDoyT37I8em738mD7LlOAgBJGegleMbo/HkzouYvVWPb6ygv3o30BWivFnCQHll3Ft+yTCmtyxFLkedpOzTLmBycWGNebaMvtt5/+6uDZ2ISDHEaRLjCMhFgU413BwsqWquA+Uya+bg1/b1aQgW29VNaUOeym1gjfEO4xi0Lto1cIdeKRLjCMhFgU40GkehSCd7PWdn1KGKYY0gEM878FWbZMkCr8IwyFltCI='
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
  if(data.responseCode=="Success")
  { console.log("Success")
    object=data;
  }
  else {object=data; console.log("Failed")}


  functions(object,index);

}

)




}


 
export default GetData;