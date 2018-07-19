import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/auth'


class RegisterPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
      error: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  } 
  onFormSubmit(e) {
    e.preventDefault();

    const { username, email, password, confirmPassword } = this.state;

    if(password === confirmPassword){
      this.props.authRegister({username, email, password}, this.props.history)
    }else{
      this.setState(() => ({ error: 'Password do not match'}))
    }
  }
  handleChange(e) {
    const val = e.target.value;
    const name = e.target.name;

    this.setState(() => ({[name] : val}))
  }

  render() {
    return (
      <div>
        <h1>REGISTER</h1>
        { this.state.error && <p>{ this.state.error } </p> }
        <form onSubmit={this.onFormSubmit}>
          <input onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="Username"/> <br/>
          <input onChange={this.handleChange} value={this.state.email} name="email" type="text" placeholder="Email"/> <br/>
          <input onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="Password"/>
          <input onChange={this.handleChange} value={this.state.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password"/>
          <button>Register</button>
        </form>
      </div>
    )
  }
}

export default connect(null, actions)(RegisterPage)

