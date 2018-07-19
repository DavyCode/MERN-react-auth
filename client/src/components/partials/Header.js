// import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';


// //auth button markup
// const authMarkup = () => {
//   return (
//     <div>
//       <li><Link to="/">Login</Link></li>
//       <li><Link to="/register">Register</Link></li>
//       <li><a href="/auth/google">Login with Google</a></li>
//       <li><a href="/auth/facebook">Login with Facebook</a></li>
//     </div>
//   );
// };


// export class Header extends Component {

//   renderContent () {
//     switch (this.props.auth) {
//       case null:
//         return authMarkup();
//       case false:  
//         return authMarkup();
//       default:
//         return [
//           <li key="1" >User</li>,
//           <li key="3">
//               Welcome : {this.props.auth.user}
//           </li>,
//           <li key="2" ><a href="/api/logout">Logout</a></li>
//         ]; 
//     }
//   };

//   render() {
//     return (
//       <div>
//         <nav>
//           <Link 
//             to={this.props.auth? '/home' : '/'} 
//             className="left brand-logo"
//           >
//             Circle
//           </Link>
//           <ul id="nav-mobile" className="right ">
//             {this.renderContent()}   
//           </ul>
//         </nav>
//       </div>
//     )
//   }
// }


import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Container, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false,
        };

        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this)
    }
    logout(event) {
      event.preventDefault()
    }
    onClick(){
        this.setState({ collapse: !this.state.collapse });
    }
    toggle() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    render() {
        return (
          <Navbar color="indigo" dark expand="md" scrolling>
            <Container>
              <NavbarNav left>
                <NavLink to='/home' 
                ><strong>Circle</strong>
                </NavLink>
              </NavbarNav>

              { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
              <Collapse isOpen = { this.state.collapse } navbar>
                <NavbarNav left>
                  <NavItem active>
                    <NavLink to="/home">Home</NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink to="/">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/register">Register</NavLink>
                  </NavItem>
                </NavbarNav>                
                <NavbarNav right>
                  <NavItem>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle nav caret>Account</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href="#">Current_user</DropdownItem>
                        <DropdownItem href="#" onClick={this.logout}>Logout</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavItem>
                </NavbarNav>
              </Collapse>
            </Container>
          </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    auth : state.auth
  }
}


export default connect(mapStateToProps)(Header);










    // componentDidMount(){
    //   if(this.props.auth != null){
    //     this.props.history.push('/home')
    //   }else{
    //     this.props.history.push('/')
    //   }
    // }

    // componentWillReceiveProps(nextProps){
    //   if(nextProps.auth.username){
    //     this.setState(() => {
    //       return {
    //         loggedIn: !!!this.state.loggedIn,
    //         username: nextProps.auth.username
    //       }
    //     })
    //   }

    //   console.log('does it exist???')
    // }
