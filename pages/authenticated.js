import React from "react"
import makeStore from '../lib/makeStore'
import { authActions, fetchUserInfo } from '../lib/actions'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import { object } from 'prop-types'

let Authenticated = ({ user }) => (
  <div>
    <Link href="/"><a>Go to Home Page</a></Link>
    <p>Successfully Logged in As: {user.displayName}</p>
  </div>
)

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
