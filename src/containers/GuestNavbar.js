import React, { Component } from 'react'
import { Button } from 'antd'
import LoginModal from '../components/LoginModal'

export default class GuestNavbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoginModalActive: false
    }
  }

  toggleLoginModal(modalValue) {
    this.setState({ isLoginModalActive: modalValue })
  }

  render() {
    return (
      <div>
        <nav className="navbar is-transparent is-fixed-top is-dark">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              FGxBIO
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="/search">
                Search The Database
              </a>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Database Statistic</a>
                <div className="navbar-dropdown is-boxed">
                  <a className="dropdown-item" href="/statistic/locus">
                    Locus Statistic
                  </a>
                  <hr className="navbar-divider" />
                  <a className="dropdown-item" href="/statistic/geographic">
                    Geographical Statistic
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Button
                    type="primary"
                    onClick={() => this.toggleLoginModal(true)}
                  >
                    Login
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </nav>
        <LoginModal
          modalState={this.state.isLoginModalActive}
          onCloseLoginModal={() => this.toggleLoginModal(false)}
        />
      </div>
    )
  }
}
