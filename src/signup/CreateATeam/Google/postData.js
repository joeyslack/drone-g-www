const PostData = (res,redirect) => {
  if(res.profileObj.email){

    alert("SignUp Post Method For " + res.profileObj.email  + " called" )
  }
    
    return true;
}
 
export default PostData;