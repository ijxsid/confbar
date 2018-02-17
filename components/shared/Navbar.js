import React from 'react'
import { shape, string, func } from 'prop-types'
import config from '../../config'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { authActions } from '../../lib/actions'

const LoginWithTwitter = () => (
  <div className="navbar-item">
    <div className="field is-grouped">
      <p className="control">
        <a className="button is-primary" href={`${config.backend.base}${config.backend.auth}`}
          onClick={(e) => {
            Cookies.set('afterLoginPath', `${window.location.pathname}${window.location.search}`)
          }}>
          <span>Login With Twitter</span>
        </a>
      </p>
    </div>
  </div>
)

const UserInfoDropdown = ({ user, performLogout }) => (
  <div className="navbar-item has-dropdown is-hoverable">
    <a className="navbar-link is-active" href="/">
      {user.displayName}
    </a>
    <div className="navbar-dropdown ">
      <a className="navbar-item " href="/profile/">
        Profile
      </a>

      <a className="navbar-item " href="/settings/">
        Settings
      </a>

      <a className="navbar-item " href="#"
        onClick={(e) => {
          Cookies.remove('token')
          performLogout()
        }}>
        Logout
      </a>
    </div>
  </div>
)

UserInfoDropdown.propTypes = {
  user: shape({
    displayName: string.isRequired
  }),
  performLogout: func
}

class Navbar extends React.Component {
  constructor () {
    super()

    this.state = {
      hamburgerClicked: false
    }

    this.onHamburgerClicked = this.onHamburgerClicked.bind(this)
  }

  onHamburgerClicked () {
    this.setState((prevState) => ({
      hamburgerClicked: !prevState.hamburgerClicked
    }))
  }
  render () {
    const { hamburgerClicked } = this.state
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <img src="/static/images/Confbar_long.svg" alt="Confbar Logo"/>
            </a>
          </Link>


          <div className={`navbar-burger burger ${hamburgerClicked ? 'is-active' : ''}`}
            data-target="navMenuExample"
            onClick={this.onHamburgerClicked}>
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navMenuExample" className={`navbar-menu ${hamburgerClicked ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <div className="navbar-item is-tab">
              <a href="/conferences">
                Conferences
              </a>

            </div>
            <div className="navbar-item is-tab">
              <a href="/upcoming">
                Schedule
              </a>
            </div>

            <div className="navbar-item is-tab">
              <a href="/technologies">
                Technologies
              </a>
            </div>

            <div className="navbar-item is-tab">
              <a href="/speakers">
                Speakers
              </a>
            </div>
          </div>

          <div className="navbar-end">
            { !this.props.user.displayName ?
              <LoginWithTwitter /> :
              <UserInfoDropdown user={this.props.user} performLogout={this.props.performLogout} />
            }
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  user: shape({
    displayName: string
  }),
  performLogout: func
}

Navbar = connect(
  state => ({
    user: state.auth.user
  }),
  dispatch => ({
    performLogout: () => dispatch(authActions.performLogout())
  })
)(Navbar)
export default Navbar
