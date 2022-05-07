const PostData = (url, req, functions) => {
  let object;
  let token;
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Basic " + btoa(JSON.stringify(req))
      },
      body: JSON.stringify(req)
    }).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return response;
      } 
      else { 
        // token = response.headers.get('Token'); 
        return response.json(); 
      }
    }).then(function(data) {
        token = data.headers['Token'];
        if (data.responseCode === "Success") {
          object = data;
        } else if (data.responseCode === "Failed") {
          object = data;
        } else { object = null;
          token = "Server Error";
          console.log("Failed") 
        }

        functions(object, token);
      }
    ).catch(function() {
      console.log("Server Error");
      functions(null, "Server Error");
    });
}

export default PostData;