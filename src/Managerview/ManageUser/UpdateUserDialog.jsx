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

import PutData from './putData';

import DotLoader from 'react-spinners/DotLoader';




const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(3),
    },
  }));

export default function UpdateUserDialog  (props)  {

    const context = React.useContext(MyContext)



    
    const [value, setValue] = React.useState(props.role||'Manager');
    const [firstName, setFName] = React.useState(props.fname||'');
    const [lastName, setLName] = React.useState(props.lname||'');
    const [mobile, setMobile] = React.useState(props.mobile||'');


    const [error, setError] = React.useState('');

    const [loader,setLoader] = React.useState(false);
    const [response,setResponse] = React.useState(false);
    const [invalid,setInvalid] = React.useState(null);
 


      
    // const handleClose = updated  => {
    //     setValue('Manager');
    //     setFName('');
    //     setLName('');
    //     setEmail('');
    //     setPassword('');
    //     setCPassword('');
    //     setError('');
    //     setLoader(false);
    //     setResponse(false);
    //     setInvalid(null);
    //     setUpdated(false);
    //     props.handleClose(updated);
    //     };

   

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
                "firstName":firstName,
                "lastName":lastName,
                "mobile":mobile,
                "type":role,
            }
        }
        setLoader(true);
        PutData(context.state.baseUrl+'/users/'+props.userId,additionalData,userUpdated)
       
    }

    const handleChange = event => {
        setValue(event.target.value);
        };
    
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

    const userUpdated = (response,token) => {

        
        setLoader(false);


        if(response.responseCode==='Success')
        {   console.log(response.response)
            context.updateValue('token',token)

            context.updateValue('firstName',firstName)
            context.updateValue('lastName',lastName)
            context.updateValue('mobile',mobile)

            
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

   
  
    

    const classes = useStyles();

    return ( <div>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
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
                            User updated successfully
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                   
                </div>
                :
                <div>
                    <DialogTitle id="form-dialog-title">Update User</DialogTitle>
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
                        <Button onClick={props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={UpdateUser} color="primary">
                            Reset
                        </Button>
                    </DialogActions>
                </div>
            }
        </Dialog>

    </div> );
}
 
