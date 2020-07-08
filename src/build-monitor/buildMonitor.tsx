import React from 'react'
import { Container } from '@material-ui/core';
import MonitorCard from './MonitorCard';

class BuildMonitor extends React.Component {

  render() {
    return (
      <Container>
        <MonitorCard />
      </Container>
    )
  }
}

export default BuildMonitor;