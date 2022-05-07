const PostData = async (url, additionalData, callback) => {
  var api_Token = additionalData.token;
  let token;

  return fetch(url, {
      method: 'Post',
      headers: {
        'Token': api_Token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(additionalData.body)
    })
    .then(response => {
      if (response.status !== 200 && response.status !== 201) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return response;
      } else { token = response.headers.get('Token'); return response.json() }

    })
    .then(response => callback(response, token))

}

export default PostData;