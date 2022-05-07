import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Toolbar from '@material-ui/core/Toolbar';
import Google from './Google/Google';
import PostData from './postDataDirect';
import MyContext from '../themeContext';
import DotLoader from 'react-spinners/DotLoader';

const styles1 = theme => ({
  button: {
    marginBottom: '0px',
    marginTop: '10px',
    minWidth: '150px',
    width: '100%',
    minHeight: '40px',
    height: '3vw',
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  textField: {
    marginBottom: '0px',
    marginTop: '10px',
    boxSizing: 'border-box',
    background: 'white',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tick: {
    verticalAlign: 'middle'
  },
  dense: {
    marginTop: theme.spacing(1),
  },
  input: {
    minWidth: '150px',
    width: '100%',
    background: 'white',
    padding: '10px',
    marginBottom: '10px',
  },

});

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errorMessage: '', error: false, loading: false, team: '' }
    this.checkMe = this.checkMe.bind(this);
    this.postData = this.postData.bind(this);
    this.getData = this.getData.bind(this)
  }

  handleEmail = (event) => {
    this.setState({ errorMessage: '', error: false, [event.target.name]: event.target.value })
  }

  checkMe() {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
      if (this.state.password.length > 5) {
        // if(this.context.state.token==null)
        // {
        //   this.setState( {errorMessage:'Server Error , Please Try Again Later!',error:true})
        // }
        // else
        // {
        this.setState({ loading: true })
        this.postData();
      } else alert('please enter a valid password')
    } else alert("Please enter a valid email address")
  }

  postData() {
    var credentials = { 'Method': 'LOCAL', 'MethodIdentity': this.state.email, 'TeamName': this.state.team, 'MethodPasscode': this.state.password, 'DeviceKey': 'MyPC', 'ApplicationKey': 'MyBrowser', 'Platform': 'DESKTOP' };
    PostData(this.context.state.baseUrl + '/authenticate', credentials, this.getData);
  }

  resetApiUrl(apiUrl) {
    this.context.updateValue('baseUrl', apiUrl);
    this.setCookie('baseUrl', '', 0);
  }

  setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setMinutes(d.getMinutes() + exmins);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getData(response, token) {
    this.setState({ loading: false });
    const apiUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

    if (response) {
      if (response.responseCode === "Success") {
        if (response.response) {
          // Update API URL in production only
          if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "devproduction") {
            // Special handling for saladinos
            if (this.state.team.toLowerCase() === "saladinos") {
              // Make sure not just to set the current context, but set the cookie, so if we lose context, we re-init with proper path (refresh)
              this.context.updateValue('baseUrl', 'https://saladinos-api.gather-ai.com');
              this.setCookie('baseUrl', 'https://saladinos-api.gather-ai.com', 30000);
            }
            else {
              this.context.updateValue('baseUrl', apiUrl);
              this.setCookie('baseUrl', apiUrl, 30000);
            }
          }

          let user = response.response;
          let firstName = user.firstName;
          let lastName = user.lastName;
          let mobile = user.mobile;

          if (firstName == null) {
            firstName = ""
          }
          if (lastName == null) {
            lastName = ""
          }
          if (mobile == null) {
            mobile = ""
          }

          this.context.updateValue('user', user.memberType)
          this.context.updateValue('token', token)
          this.context.updateValue('userid', user.profileId)

          this.context.updateValue('firstName', firstName)
          this.context.updateValue('lastName', lastName)
          this.context.updateValue('email', user.email)
          this.context.updateValue('mobile', mobile)

          this.setCookie('token', token, 3000)
          this.setCookie('user', user.memberType, 3000)
          this.setCookie('userid', user.profileId, 3000)

          this.setCookie('firstName', firstName, 3000)
          this.setCookie('lastName', lastName, 3000)
          this.setCookie('email', user.email, 3000)
          this.setCookie('mobile', mobile, 3000)

          if (user.memberType === 'Member') {
            this.props.history.push('./UserView/Home')
          } else if (user.memberType === 'Manager') {
            this.props.history.push('./ManagerView/Dashboard')
          }
        } 
        else { 
          console.log('Undefined Response');
          this.setState({ errorMessage: 'Undefined Response' });
          this.resetApiUrl(apiUrl);
        }
      }
      else { 
        console.log('Invalid Credentials');
        this.setState({ errorMessage: 'Invalid Credentials', error: true });
        this.resetApiUrl(apiUrl);
      }
    } 
    else {
      if (token === "Server Error") {
        this.setState({ errorMessage: 'Invalid login. Check your credentials and try again.', error: true })
      } else {
        this.setState({ errorMessage: 'Undefined Response', error: true })
      }
      this.resetApiUrl(apiUrl);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        { this.state.loading ?
          <div style={{marginLeft:'calc(50% - 50px)',height:'140px'}} >
            <DotLoader sizeUnit={"px"} size={50} color={'#e7e7e7'} loading={true} />
          </div>
          :
          <div style={{width:'50%',margin:'auto'}}>
            <Toolbar>
              <p style={{margin:'auto',fontSize:'24px',lineHeight:'32px',fontWeight:'bold',fontFamily:'SF UI Text'}}> Sign In  {/* to <span style={{color:'#2493F3'}}>Gather Ai</span>*/}</p>
            </Toolbar>
            <p style={{paddingTop:'0px',paddingBottom:'10px',marginBottom:'0px',fontSize:'15px',color:'grey',lineHeight:'24px'}}>Enter your email address and password</p>
            <Input
              placeholder="Email address"
              className={classes.input}
              inputProps={{
                'aria-label': 'description',
              }}
              value={this.state.email}
              onChange={this.handleEmail}
              name='email'
              type='email'
            />
            <Input
              placeholder="Password"
              className={classes.input}
              inputProps={{
                'aria-label': 'description',
              }}
              name="password"
              onChange={this.handleEmail}
              value={this.state.password}
              type='password'
            />
            <Input
              placeholder="Team Name"
              className={classes.input}
              inputProps={{
                'aria-label': 'description',
              }}
              value={this.state.team}
              onChange={this.handleEmail}
              name='team'  
            />
            { this.state.error ? <div style={{color:'red'}}>{this.state.errorMessage}</div> : null }    
            <Toolbar disableGutters={true}>
              <div style={{}}> 
                <CheckCircleOutlineIcon className={classes.tick} color="primary"/>
                <span style={{fontSize:'13px',color:'rgb(35, 39, 53,0.8)',verticalAlign:'middle'}}> Remember me</span>
              </div>
            </Toolbar>
            <Button variant="contained" color="primary" style={{background:'#2493F3'}} className={classes.button} onClick={this.checkMe}>
              Sign In
            </Button>
            {/* <Google history={this.props.history} /> */}
            <p style={{paddingTop:'10px',fontSize:'13px',color:'grey',lineHeight:'19px',fontFamily:'SF UI Text'}}>
              <span onClick={()=>{this.props.history.push('./reset')}} className="link">Forgot Password?</span>
            </p>
          </div> }        
      </div>);
  }
}

Email.contextType = MyContext;
export default withStyles(styles1)(Email);