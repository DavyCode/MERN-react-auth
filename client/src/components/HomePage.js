import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as actions from '../actions/user'

class HomePage extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }
  componentDidMount(){
    // this.props.fetchUser()
  }
  render() {
    return (
      <div>
        <h1>Home page should be private</h1>
      </div>
    )
  }
}

export default connect(null)(HomePage)
