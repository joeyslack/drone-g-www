import React from 'react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'


import Button from '@material-ui/core/Button'; 

import MyContext from '../themeContext';



import PutData from './putData';

import DotLoader from 'react-spinners/DotLoader';






export default function UpdateUserDialog  (props)  {

    const context = React.useContext(MyContext)



    
    const [firstName, setFName] = React.useState(props.fName||'');
    const [lastName, setLName] = React.useState(props.lName||'');
    const [mobile, setMobile] = React.useState(props.mobile||'');


    const [error, setError] = React.useState('');

    const [loader,setLoader] = React.useState(false);
    const [response,setResponse] = React.useState(false);
    const [invalid,setInvalid] = React.useState(null);
 




   

    const UpdateUser = () => {

        
        if(firstName==="")
        {
            setError('F')
            return;
        }
        else if(lastName==="")
        {
            setError('L')
            return;
        }

        let role=null
        if(props.user==="Manager")
        {
            role=2
        }
        else if(props.user==="Member")
        {
            role=3
        }
        else if(props.user==="Device")
        {
            role=4
        }

         console.log('firstName',firstName,'lastName',lastName,'mobile',mobile,'userid',props.userid,'role',props.user)
        

        if(role!==null)
        {
            let additionalData={
            token:context.state.token,
            body:{
                "firstName":firstName,
                "lastName":lastName,
                "mobile":mobile,
                "type":role
            }
        }
        setLoader(true);
        PutData(context.state.baseUrl+'/users/'+props.userid,additionalData,userUpdated)
        }

        else { alert('Unexpected Error Ocuured, Please Refresh The Page') }
       
    }

   
    
    const handleTextFieldChange = (event) => {
        setError('');
        if(event.target.id==='fname')
        {
        setFName(event.target.value)
        }

        else if(event.target.id==='lname')
        {
        setLName(event.target.value)
        }
        else if(event.target.id==='mobile')
        {
        setMobile(event.target.value)
        }
       
    }

    function  setCookie(cname, cvalue, exmins) {      
        var d = new Date();
        d.setMinutes( d.getMinutes() + exmins );
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue +  ";" + expires +";path=/";
      }

    const userUpdated = (response,token) => {

        
        setLoader(false);


        if(response.responseCode==='Success')
        {   
            context.updateValue('token',token)

            //update user in client side

            context.updateValue('firstName',firstName)
            context.updateValue('lastName',lastName)
            context.updateValue('mobile',mobile)

            setCookie('firstName',firstName,3000)
            setCookie('lasttName',lastName,3000)
            setCookie('mobile',mobile,3000)

            


            setResponse(true);
            context.updateSession();
            //props.handleClose(true);
        }
        else if (response.status===401){
            context.logout();
        }
        
        else if (response.responseCode==='Failed')
        {
            setInvalid(response.validationErrorsList[0].errorMessage)
        }
     
       
        else console.log(response)

        

    }

    const handleClose = () =>
    {
        setError('');
        setLoader(false);
        setResponse(false);
        setInvalid(null);
        props.handleClose();
    }

   
  
    

    // const classes = useStyles();

    return ( <div>
      
        <Dialog  open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            { loader===true?
                <div style={{textAlign:'center',paddingTop:'20px',height:'calc(100vh - 144px)', width:'100%'}}>
                    <div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
            
                        <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
                
                        
                    </div>
                </div>
                :invalid!==null? 
                <div>
                    <DialogTitle> Update Profile </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Error: {invalid}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setInvalid(null)} color="primary">
                            Ok
                        </Button>
                    </DialogActions>

                </div>
                : response===true?
                <div>
                    <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            User updated successfully
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                   
                </div>
                :
                <div>
                    <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please Enter Credentials to Update
                        </DialogContentText>
                        <TextField
                            error={error==='F'}
                            autoFocus
                            margin="dense"
                            id="fname"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={firstName}
                            onChange={handleTextFieldChange}
                        />
                        <TextField
                            error={error==='L'}
                            
                            margin="dense"
                            id="lname"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={lastName}
                            onChange={handleTextFieldChange}
                        />
                        <TextField
                            error={error==='M'}
                            
                            margin="dense"
                            id="mobile"
                            label="Mobile"
                            type="text"
                            value={mobile}
                            fullWidth
                            onChange={handleTextFieldChange}
                        />
                        
                        
                     
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={UpdateUser} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </div>
            }
        </Dialog>

    </div> );
}
 
