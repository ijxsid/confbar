import React from "react"
import makeStore from '../lib/makeStore'
import { authActions, fetchUserInfo } from '../lib/actions'
import withRedux from 'next-redux-wrapper'
import { object } from 'prop-types'
import Cookies from 'js-cookie'
import Router from 'next/router'
import Layout from '../components/shared/Layout'
import AuthSuccess from '../components/AuthSuccess'

class Authenticated extends React.Component {
  componentDidMount () {
    this.timeout = setTimeout(() => {
      const afterLogin = Cookies.get('afterLoginPath') || '/'
      Cookies.remove('afterLoginPath')
      Router.push(afterLogin)
    }, 1000)
  }
  componentWillUnmount () {
    window.clearTimeout(this.timeout)
  }
  render () {
    const { user } = this.props
    return (
      <Layout>
        <AuthSuccess user={user}/>
      </Layout>
    )
  }
}

Authenticated.getInitialProps = async ({ store, req, isServer, pathname, query }) => {
  if (isServer && req.cookies.token) {
    store.dispatch(authActions.addToken(req.cookies.token))
  } else {
    console.log(store.getState())
  }
  const token = store.getState().auth.token
  await store.dispatch(fetchUserInfo(token))
  return { user: store.getState().auth.user }
}

Authenticated.propTypes = {
  user: object
}

Authenticated = withRedux(makeStore)(Authenticated)

export default Authenticated
