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



    
    const [password, setPassword] = React.useState('');
    const [npassword, setNPassword] = React.useState('');
    const [cpassword, setCPassword] = React.useState('');
   

    const [error, setError] = React.useState('');

    const [loader,setLoader] = React.useState(false);
    const [response,setResponse] = React.useState(false);
    const [invalid,setInvalid] = React.useState(null);
 




   

    const resetPassword = () => {

        
        if(password.length<8)
        {
            setError('P')
            return;
        }
        else if(npassword.length<8)
        {
            setError('N')
            return;
        }
        else if(cpassword!==npassword)
        {
            setError('C')
            return;
        }
        

        let additionalData={
            token:context.state.token,
            body:{
              "password":password,
              "newPassword":npassword,
              "confirmPassword":cpassword
            }
        }
        setLoader(true);
        PutData(context.state.baseUrl+'/users/'+props.userid+'/reset',additionalData,passwordReseted)
       
    }

  
    
    const handleTextFieldChange = (event) => {
        setError('');
        if(event.target.id==='password')
        {
          setPassword(event.target.value)
        }

        else if(event.target.id==='npassword')
        {
          setNPassword(event.target.value)
        }
        else if(event.target.id==='cpassword')
        {
          setCPassword(event.target.value)
        }
       
    }

    const handleClose = () =>
    {
      setPassword('');
      setNPassword('');
      setCPassword('');
      setError('');
      setLoader(false);
      setResponse(false);
      setInvalid(null);
      props.handleClose();
    }

    const passwordReseted = (response,token) => {

        
        setLoader(false);


        if(response.responseCode==='Success')
        {   
            context.updateValue('token',token)
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

   
  
    


    return ( <div>
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            { loader===true?
                <div style={{textAlign:'center',paddingTop:'20px',height:'calc(100vh - 144px)', width:'100%'}}>
                    <div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
            
                        <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
                
                        
                    </div>
                </div>
                :invalid!==null? 
                <div>
                    <DialogTitle> Reset Password </DialogTitle>
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
                    <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Password Resetted Successfully
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
                    <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter Current and New password to reset
                        </DialogContentText>
                        <TextField
                            error={error==='P'}
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Current Password"
                            type="password"
                            fullWidth
                            onChange={handleTextFieldChange}
                        />
                        <TextField
                            error={error==='N'}
                            
                            margin="dense"
                            id="npassword"
                            label="New Password"
                            type="password"
                            fullWidth
                            onChange={handleTextFieldChange}
                        />
                        <TextField
                            error={error==='C'}
                            
                            margin="dense"
                            id="cpassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            onChange={handleTextFieldChange}
                        />
                        
                        
                     
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={resetPassword} color="primary">
                            Reset
                        </Button>
                    </DialogActions>
                </div>
            }
        </Dialog>

    </div> );
}
 
