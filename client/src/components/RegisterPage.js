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
      confirmPasswordError: '',
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
      this.setState(() => ({confirmPasswordError: 'Password do not match'}))
    }

    if(this.props.auth.errors) {
      this.setState(() => ({error : { ...this.props.auth.errors}}))
      console.log(this.state.error)
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
        <form onSubmit={this.onFormSubmit}>
            {this.state.error.message && <p>{this.state.error.message}</p> }
          <input onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="Username"/> <br/>
            {this.state.error.name && <p>{this.state.error.name}</p> }
          <input onChange={this.handleChange} value={this.state.email} name="email" type="text" placeholder="Email"/> <br/>
            {this.state.error.email && <p>{this.state.error.email}</p> }
          <input onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="Password"/>
            {this.state.error.password && <p>{this.state.error.password}</p> }
          <input onChange={this.handleChange} value={this.state.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password"/>
            {this.state.confirmPasswordError && <p>{this.state.confirmPasswordError}</p> }

          <button>Register</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  return { auth : state.auth }
}

export default connect(mapStateToProps, actions)(RegisterPage)

