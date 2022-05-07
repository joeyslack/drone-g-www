import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Image from '../images/image2.png';
import Email from './email';
//import Team from './teamname';
import Logo from '../images/Gather_Logo_Color.png'
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'; import Button
// from '@material-ui/core/Button';
import MyContext from '../themeContext';

import './usersignin.css';

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

class UserSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            team: '',
            password: '',
            email: ''
        }
        this.handleNext = this
            .handleNext
            .bind(this);
        this.handleBack = this
            .handleBack
            .bind(this);
        this.updateState = this
            .updateState
            .bind(this);

    }

    componentDidMount() {
        let memberType = this.context.state.user;

        if (memberType != null) {
            if (memberType === "Manager") {

                this
                    .context
                    .history
                    .push('/ManagerView/Dashboard')

            } else if (memberType === "Member") {
                this
                    .context
                    .history
                    .push('/UserView/Home')

            } else {
                console.log('Undefined User Type', memberType)
            }
        }

    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    updateState(state, value) {

        this.setState({[state]: value})

    }

    handleNext() {
        this.setState({
            value: this.state.value + 1
        })
    }
    handleBack() {

        if (this.state.value === 0) {
            this.setState({value: 0})
        } else 
            this.setState({
                value: this.state.value - 1
            })
    }
    render() {

        return (
            <div>
                <img
                    src={Image}
                    alt={"SignUp"}
                    style={{
                    float: 'left',
                    margin: '0px',
                    padding: '0px',
                    width: '40%',
                    height: "100vh"
                }}/>

                <div className="rightdiv">
                    {/* <Button style={{paddingLeft:'20px',paddSingRight:'20px',position:'absolute',left:'50%',margin:'0px'}} onClick={this.props.back} startIcon={<ArrowBackIosIcon />} > Back </Button> */}
                    <div style={{
                        marginTop: '20px'
                    }}>
                        <img
                            src={Logo}
                            alt="Nabla Ascent"
                            style={{
                            maxWidth: '400px'
                        }}/>
                    </div>

                    <div className="flex-containercol">
                        <SwipeableViews
                            axis={'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleValue}>
                            {/* <TabPanel value={this.state.value} index={0}>

<Team next={()=>this.handleNext()}  updateState={(team,value)=>this.updateState(team,value)} history={this.props.history}/>

      </TabPanel> */}

                            <Email history={this.props.history}/>

                        </SwipeableViews>

                    </div>

                    {/* <p
                        style={{
                        fontSize: '13px',
                        color: 'grey',
                        lineHeight: '19px',
                        fontFamily: 'SF UI Text'
                    }}>Need a new team?
                        <span
                            onClick={() => {
                            this
                                .props
                                .history
                                .push('./createATeam')
                        }}
                            className="link">Create a team</span>
                    </p> */}

                </div>

            </div>
        );
    }
}
UserSignIn.contextType = MyContext;
export default UserSignIn;