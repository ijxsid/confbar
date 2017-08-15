import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { string, object, func, array } from 'prop-types'
import Layout from '../components/Layout'
import { authActions, doFetchConferences, fetchUserInfo } from '../lib/actions'


/**
 * Index will show a list of All Conferences.
 * TODO: This will move to Conferences page afterwards.
 */

class Index extends Component {
  componentDidMount () {
    console.log("Component Did Mount")
    console.log(this.props.conferences, this.props.token)
  }
  render () {
    const { user } = this.props
    return (
      <Layout user={user}>
        <div>
          <pre><code>{ JSON.stringify({ conferences: this.props.conferences }, 2, 4)}</code></pre>
        </div>
      </Layout>
    )
  }
}

Index.propTypes = {
  token: string,
  user: object,
  dispatch: func,
  conferences: array
}


Index.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (isServer && req.cookies.token) {
    store.dispatch(authActions.addToken(req.cookies.token))
  } else {
    console.log(store.getState())
  }
  const token = store.getState().auth.token
  await store.dispatch(doFetchConferences())

  if (token) {
    await store.dispatch(fetchUserInfo(token))
  }
}

Index = withRedux(makeStore,
  (state) => ({ token: state.auth.token, conferences: state.conferences, user: state.auth.user })
)(Index)

export default Index
