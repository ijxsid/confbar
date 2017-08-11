import React from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import config from '../config'

let Authenticated = ({ user }) => (
  <div>
    <Link href="/"><a>Go to Home Page</a></Link>
    <p>Successfully Logged in As: {user.displayName}</p>
  </div>
)

Authenticated.getInitialProps = async ({ store, req, isServer, pathname, query }) => {
  console.log(req.cookies.token)

  if (req.cookies.token) {
    store.dispatch({
      type: 'ADD_TOKEN',
      token: req.cookies.token
    })
  }

  try {
    const userReq = await fetch(`${config.backend.base}${config.backend.api}/me`, {
      headers: {
        'Authorization': `JWT ${store.getState().token}`,
        'Content-Type': 'application/json'
      }
    })
    const user = await userReq.json()
    return { user }
    console.log("user =>", user)
  } catch (err) {
    console.log("err => ", err)
    return { err }
  }
}

Authenticated = withRedux(makeStore)(Authenticated)

export default Authenticated
