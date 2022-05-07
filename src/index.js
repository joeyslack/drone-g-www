import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { ListItemIcon } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2493F3',
      light: '#8DC6F7',
      dark: '#0A73CE',
      disabled: '#8EC8FB',
      // active: '#0A73CE',
    },
    secondary: {
      main: '#fff',
      dark: '#0A73CE',
      // light: '#fff',
      contrastText: '#2493F3',
      // active: '#0E7EDF'
    },
    text: {
      primary: '#232735',
      secondary: '#8B90A0',
      light: '#CED3E2',
      dark: '#232735'
    },
    button: {
      active: '#000'
    },
    // action: {
    //   active: '#2493F3',
    //   hover: '#0E7EDF',
    //   selected: '#0A73CE',
    //   disabled: '#8EC8FB',
    //   disabledBackground: '#F0F1F3',
    //   secondary: '#8B90A0',
    //   white: '#fff'
    // },
    background: {
      default: '#F7F8FC',
      paper: '#fff',
      light: '#F7F8FC',
      dark: '#F0F1F3'
    },
    success: {
      main: '#39E8BE'
    },
    error: {
      main: '#E54F4F'
    },
    warning: {
      main: '#F7C150'
    },
    divider: '#e7e7e7',
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.1)",
    "0px 4px 8px rgba(0, 0, 0, 0.1)",
    "0px 6px 12px rgba(0, 0, 0, 0.1)",
  ],
  overrides: {
    MuiButton: {
      text: {
        // borderRadius: 0,
        // background: 'red'
        // '& .MuiButton-label': {
        //   paddingRight: '0',
        // },
      },
      root: {
        textTransform: 'capitalize',
      },
      contained: {
        textTransform: 'capitalize',
        // fontFamily: "SF UI Text Regular",
        padding: '16px 32px 16px 32px',
      },
      containedPrimary: {
        // backgroundColor: 'green'
        border: '1px solid #EBF4FD',
      },
      containedSecondary: {
        '&:hover': {
          color: '#fff'
        },

        border: '1px solid #EBF4FD',
        // boxSizing: 'border-box',
      },
      outlined: {
        borderColor: '#EBF4FD'
      },
      outlinedSecondary: {
        borderColor: '#EBF4FD',
        border: '1px solid #EBF4FD',
        '&:hover': {
          borderColor: '#2493F3'
        }
      }
    },
    MuiButtonGroup: {
      contained: {
        boxShadow: 'none',
      },
      groupedContained: {
        padding: '7px 20px 7px 20px'
      },
    },
    //   groupedContainedSecondary: {
    //     // boxShadow: 'none',
    //     textTransform: 'capitalize',
    //     borderRadius: 0,
    //     background: 'white',
    //     borderColor: '#2493F3'
    //   }
    // },
    MuiMenuItem: {
      root: {
        color: '#8B90A0',
        // padding: '14em 2em 14em 2em',
        paddingTop: '1em',
        paddingBottom: '1em',
        borderBottom: '1px solid #F0F1F3',
        margin: '0 2em 0 2em',

        '&:hover': {
          backgroundColor: 'white',
          color: '#232735',
          // border: '1px solid #e7e7e7',
          // borderLeft: '2px solid blue'
        },

        '&:last-child': {
          borderBottom: 'none'
        }
      },
    },
    MuiListItem: {
      root: {
        padding: '20em 20em 20em 20em',
      }
    },
    MuiListItemIcon: {
      root: {
        color: '#8B90A0',
        borderColor: '#fff'
      }
    },
    MuiPopover: {
      root: {
        color: '#000'
      }
    },
    MuiCheckbox: {
      root: {
        backgroundColor: 'none',
        padding: '0 2em 0 2em',
        '&:hover': {
          backgroundColor: 'none'
        }
      }
    },
  },
  typography: {
    fontFamily: [
      'SF UI Text Regular',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    fontSize: 14,
    lineHeight: '24px',
    color: '#232735',
    
    body1: {
      color: '#8B90A0',
    },
    body2: {
      color: '#CED3E2'
    }
  },
  shape: {
    borderRadius: 0
  }

});

ReactDOM.render(<ThemeProvider theme={theme}><App /></ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
