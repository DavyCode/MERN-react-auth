import React, { Component } from 'react';
import { connect } from 'react-redux'
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
    }
    // logout(event) {
    //   event.preventDefault()
    // }
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
                <NavLink to='/home'>
                  <strong>Circle</strong>
                </NavLink>
              </NavbarNav>

              { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
              <Collapse isOpen = { this.state.collapse } navbar>
                
                { !this.props.isAuthenticated? (
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
                ):( 
                <NavbarNav right>
                  <NavItem>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle nav caret>Account</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href="#">Current_user</DropdownItem>
                        <DropdownItem href="">
                          <NavLink to="/logout">Logout</NavLink>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavItem>
                </NavbarNav>
                )}
                
              </Collapse>
            </Container>
          </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated : state.auth.token !== null
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
