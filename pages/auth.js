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

Auth.getInitialProps = ({ store, req, isServer, pathname, query }) => {

  console.log(req.cookies.token)
  store.dispatch({
    type: 'ADD_TOKEN',
    token: req.cookies.token
  })

  return { token: req.cookies.token }
}

Auth = withRedux(makeStore)(Auth)

export default Auth
