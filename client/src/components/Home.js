import React, { Component } from 'react';
import { Container, Typography, Box } from '@material-ui/core';

class Home extends Component {

  displayWelcome() {
    const {connectedUser} = this.props;
    if (connectedUser) {
      return <Typography variant="body2">Welcome {connectedUser.name}</Typography>
    }
    return <Typography variant="body2">Welcome, You are not connected</Typography>
  }

  render() {
    return (
      <Box mt={5}>
        <Container>
          <Typography variant="h2">Home</Typography>
          {this.displayWelcome()}
        </Container>
      </Box>
    );
  }
}

export default Home;
