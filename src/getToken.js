const GetToken = (baseUrl, callback) => {

  var apiUrl = baseUrl + '/authenticate';
 
  // var api_Token = null;
  // var user_profile = null;

  var credentials = {
    'Method': 'ANONYMOUS',
    'MethodIdentity': 'GUEST',
    'TeamName': '',
    'MethodPasscode': 'GUEST',
    'DeviceKey': 'MyPC',
    'ApplicationKey': 'MyBrowser',
    'Platform': 'DESKTOP'
  };
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Access-Control-Request-Headers': 'Content-Type',
      'Content-Type': 'application/json',
      "Authorization": "Basic " + btoa(JSON.stringify(credentials))
    },
    body: null
  }).then(function (response) {
    if (response.status !== 204) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      callback(null);
      return true;
    } else {
      callback(response.headers.get('Token'));
      return true;
    }
  }).catch(function () {
    callback(null);
  })



}

export default GetToken;