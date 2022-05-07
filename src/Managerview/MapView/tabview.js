import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import WarehouseView from './WareHouseView/WarehouseView';
import AisleView from './AisleView/AisleView';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    height: 'calc(100% - 48px)', 
    overflow: 'auto',
    '& > *': {
      padding: '1em',
    }
  }
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.hasOwnProperty('selectedTab') ? props.selectedTab : 0);

  const handleChange = (event, newValue) => {
    // alert(newValue);
    setValue(newValue);
    if (props && props.changeState) props.changeState();
  };

  return (
    <div className={classes.root} style={{height: '100%', background: 'none'}}>
      <AppBar position="static" color="secondary" elevation={1}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" 
          indicatorColor="primary"
          color="primary"
          textColor="primary"
          variant="fullWidth"
          centered>
          <Tab label="Aisle" {...a11yProps(0)} />
          <Tab label="Warehouse" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <div style={{display: 'inline-block'}}>
          <AisleView Structure={props.Structure} MissionId={props.MissionId} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <WarehouseView Structure={props.Structure} MissionId={props.MissionId} />
      </TabPanel>
    </div>
  );
}
