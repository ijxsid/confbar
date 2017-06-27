import React, { Component } from "react"
import { makeStore } from '../lib/reducers'
import withRedux from 'next-redux-wrapper'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import config from '../config'
import { string, object } from 'prop-types'
import UserCard from '../components/UserCard'

class Index extends Component {
  componentDidMount () {
    console.log("Component Did Mount")
  }
  render () {
    const { token, user } = this.props
    return (
      <div>
        { !token && <a href={`${config.backend.base}${config.backend.auth}`}>Login With Twitter</a> }
        { !!token && <UserCard user={user} /> }
      </div>
    )
  }
}

Index.propTypes = {
  token: string,
  user: object
}


Index.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (isServer) {
    console.log("req.cookies =>", req.cookies)
    store.dispatch({
      type: 'ADD_TOKEN',
      token: req.cookies.token
    })
  } else {
    console.log(store.getState())
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

Index = withRedux(makeStore, (state) => ({ token: state.token }))(Index)

export default Index
