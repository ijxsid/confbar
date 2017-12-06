import React from 'react'
import { shape, string } from 'prop-types'
import config from '../../config'
import Link from 'next/link'

const LoginWithTwitter = () => (
  <div className="navbar-item">
    <div className="field is-grouped">
      <p className="control">
        <a className="button is-primary" href={`${config.backend.base}${config.backend.auth}`}>
          <span>Login With Twitter</span>
        </a>
      </p>
    </div>
  </div>
)

const UserInfoDropdown = ({ user }) => (
  <div className="navbar-item has-dropdown is-hoverable">
    <a className="navbar-link is-active" href="/">
      {user.displayName}
    </a>
    <div className="navbar-dropdown ">
      <a className="navbar-item " href="/documentation/overview/start/">
        Profile
      </a>

      <a className="navbar-item " href="/documentation/overview/start/">
        Settings
      </a>

      <a className="navbar-item " href="/documentation/overview/start/">
        Logout
      </a>
    </div>
  </div>
)

UserInfoDropdown.propTypes = {
  user: shape({
    displayName: string.isRequired
  })
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
              <h1 className="title is-3" style={{ color: '#C02727' }}>Confbar</h1>
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
              <a href="/confs">
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
              <UserInfoDropdown user={this.props.user} />
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
  })
}
export default Navbar
