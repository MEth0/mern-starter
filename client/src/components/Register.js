import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
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
    const { name, email, password } = this.state;
    // Send form data to API, create new user
    axios.post('/api/users', { name, email, password }).then(() => {
      this.props.history.push('/login');
    }).catch((error) => {
      this.setState({ feedback: error.response.data.message });
    });
  }

  render() {
    return (
      <Box mt={5}>
        <Container maxWidth="xs">
          <Typography variant="h2">Register</Typography>
          <form onSubmit={this.handleSubmit} style={{ marginTop: '16px' }}>
            <TextField
              autoComplete="fname"
              margin="normal"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              onChange={this.handleInputChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleInputChange}
              autoComplete="email"
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
              Sign Up
            </Button>
            <Link to="/login">
              Already have an account? Sign in
            </Link>
          </form>
          <Typography variant="body1">{this.state.feedback}</Typography>
        </Container>
      </Box>
    );
  }
}

// "withRouter" to use the history props
export default withRouter(Register);
