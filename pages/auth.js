import React, { Component } from "react"
import { makeStore } from '../lib/reducers'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'


let Auth = ({ token }) => (
  <div>
    <Link href="/"><a>Go to Home Page</a></Link>
    <p>Token: {token}</p>
  </div>
)

Auth.getInitialProps = ({ store, isServer, pathname, query }) => {
  store.dispatch({
    type: 'ADD_TOKEN',
    token: query.jwt
  })

  return { token: query.jwt }
}

Auth = withRedux(makeStore)(Auth)

export default Auth
