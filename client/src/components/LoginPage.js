import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/auth'



class LoginPage extends Component {
  constructor(props){
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }
  componentDidMount(){
    if(this.props.auth.userData){
      this.setState(() => ({email: this.props.auth.userData.email }))
    }else{
      console.log('No email currently in state')
    }
  }
  onFormSubmit (e) {
    e.preventDefault()
    const { email, password } = this.state;
    this.props.authLogin({email, password}, this.props.history);
  }
  handleChange (e) {
    const val = e.target.value;
    const name = e.target.name;

    this.setState(() => ({[name] : val}))
  }

  render() {
    return (
      <div>
        <h1>Landing && Login</h1>
        <form onSubmit={this.onFormSubmit}>
          <input onChange={this.handleChange} value={this.state.email} name="email" type="text" placeholder="Email"/> <br/>
          <input onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="Password"/>
          <button>LOGIN</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  return { auth : state.auth }
}

export default connect(mapStateToProps, actions)(LoginPage)

