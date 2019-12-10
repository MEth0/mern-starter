import React, { Component } from 'react';
import { Container, Typography, Box, TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      feedback: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Send form data to API
    axios.post('/api/auth/login', { email: this.state.email, password: this.state.password }).then((res) => {
      // Call login function in App component
      this.props.login(res.data.user)
      // Return to "/", no reload
      this.props.history.push('/');
    }).catch((error) => {
      this.setState({feedback: error.response.data.message});
    });
  }

  render() {
    const { connectedUser } = this.props;
    if (connectedUser) {
      return (
        <Typography variant="body1">Already Logged in</Typography>
      );
    }
    return (
      <Box mt={5}>
        <Container maxWidth="xs">
          <Typography variant="h2">Login</Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={this.handleInputChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handleInputChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </form>
          <Typography variant="body1">{this.state.feedback}</Typography>
        </Container>
      </Box>
    );
  }
}

// "withRouter" to use the history props
export default withRouter(Login);
