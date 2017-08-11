import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import fetch from 'isomorphic-unfetch'
import config from '../config'
import { string, object, func } from 'prop-types'
import Layout from '../components/Layout'
import { authActions } from '../lib/actions'


/**
 * Index will show a list of All Conferences.
 * TODO: This will move to Conferences page afterwards.
 */

class Index extends Component {
  componentDidMount () {
    console.log("Component Did Mount")
    this.props.dispatch(authActions.addToken('2949401002394994'))
    this.props.dispatch(authActions.addUserInfo(
      {
        name: 'Inderjit'
      }
    ))
    this.props.dispatch({
      type: 'AJD_1'
    })
  }
  render () {
    const { token } = this.props
    return (
      <Layout>
        <div>
          { !token && <a href={`${config.backend.base}${config.backend.auth}`}>Login With Twitter</a> }
        </div>
      </Layout>
    )
  }
}

Index.propTypes = {
  token: string,
  user: object,
  dispatch: func
}


Index.getInitialProps = ({ store, isServer, req, pathname, query }) => {
  if (isServer && req.cookies.token) {
    console.log("req.cookies =>", req.cookies)
    store.dispatch(authActions.addToken(req.cookies.token))
  } else {
    console.log(store.getState())
  }
}

Index = withRedux(makeStore, (state) => ({ token: state.token }))(Index)

export default Index
