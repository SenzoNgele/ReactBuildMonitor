import React from 'react';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core';
import Theme from './theme'
import BuildMonitor from './build-monitor/buildMonitor'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <BuildMonitor />
      </MuiThemeProvider>
    );
  }
}

export default App;
