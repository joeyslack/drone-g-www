import React from 'react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button'; 

import MyContext from '../../themeContext';


import { makeStyles } from '@material-ui/core/styles';

import PostData from './postData';

import DotLoader from 'react-spinners/DotLoader';




const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(3),
    },
  }));

export default function AddUserDialog  (props)  {

    const context = React.useContext(MyContext)



    const [value, setValue] = React.useState('Manager');
    const [firstName, setFName] = React.useState('');
    const [lastName, setLName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cpassword, setCPassword] = React.useState('');

    const [error, setError] = React.useState('');

    const [loader,setLoader] = React.useState(false);
    const [response,setResponse] = React.useState(false);
    const [invalid,setInvalid] = React.useState(null);
    const [updated,setUpdated] = React.useState(false);


      
    const handleClose = updated  => {
        setValue('Manager');
        setFName('');
        setLName('');
        setEmail('');
        setPassword('');
        setCPassword('');
        setError('');
        setLoader(false);
        setResponse(false);
        setInvalid(null);
        setUpdated(false);
        props.handleClose(updated);
        };

    const handleChange = event => {
    setValue(event.target.value);
    };

    const AddUser = () => {

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
        else if(!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            setError('E')
            return;
        }
        else if(password.length<6)
        {
            setError('P')
            return;
        }
        else if(password!==cpassword)
        {
            setError('C')
            return;
        }
        let role=null;
        if(value==='Manager')
        {
            role=2;
        }
        else if (value==='Member')
        {
            role=3;
        }
        else role=4;

        let additionalData={
            token:context.state.token,
            body:{
                'firstName':firstName,
                'lastName':lastName,
                'email':email,
                'type':role,
                'password':password,
                'confirmPassword':cpassword
            }
        }
        setLoader(true);
        PostData(context.state.baseUrl+'/users',additionalData,userAdded)
       
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
        else if(event.target.id==='email')
        {
        setEmail(event.target.value)
        }
        else if(event.target.id==='password')
        {
        setPassword(event.target.value)
        }
        else if(event.target.id==='cpassword')
        {
        setCPassword(event.target.value)
        }
    }

    const userAdded = (response,token) => {

        
        setLoader(false);


        if(response.responseCode==='Success')
        {   console.log(response.response)
            context.updateValue('token',token)
            setResponse(true);
            setUpdated(true);
            this.context.updateSession(token)
            //props.handleClose(true);
        }
        else if (response.status===401){
            context.logout();
        }
        
        else if (response.responseCode==='Failed')
        {
            console.log(response.validationErrorsList[0].errorMessage);
            setInvalid(response.validationErrorsList[0].errorMessage)
        }
     
       
        else console.log(response)

        

    }

   
  
   

    const classes = useStyles();

    return ( <div>
        <Dialog open={props.open} onClose={()=>handleClose(updated)} aria-labelledby="form-dialog-title">
            { loader===true?
                <div style={{textAlign:'center',paddingTop:'20px',height:'calc(100vh - 144px)', width:'100%'}}>
                    <div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
            
                        <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
                
                        
                    </div>
                </div>
                :invalid!==null? 
                <div>
                    <DialogTitle> Add User </DialogTitle>
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
                    <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            User Added Successfully
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>handleClose(updated)} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                   
                </div>
                :
                <div>
                    <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please Enter Credentials to Add User
                        </DialogContentText>
                        <TextField
                            error={error==='F'}
                            autoFocus
                            margin="dense"
                            id="fname"
                            label="First Name"
                            type="text"
                            fullWidth
                            onChange={handleTextFieldChange}
                        />
                        <TextField
                            error={error==='L'}
                            
                            margin="dense"
                            id="lname"
                            label="Last Name"
                            type="text"
                            fullWidth
                            onChange={handleTextFieldChange}
                        />
                        <TextField
                            error={error==='E'}
                            
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            onChange={handleTextFieldChange}
                        />
                        <TextField
                            error={error==='P'}
                            
                            margin="dense"
                            id="password"
                            label="Password"
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
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Role</FormLabel>
                            <RadioGroup aria-label="role" name="role" value={value} onChange={handleChange}>
                                <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                                <FormControlLabel value="Member" control={<Radio />} label="Member" />
                                <FormControlLabel value="Device" control={<Radio />} label="Device" />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>handleClose(updated)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={AddUser} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </div>
            }
        </Dialog>

    </div> );
}
 
