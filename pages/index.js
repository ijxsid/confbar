import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func, array } from 'prop-types'
import Layout from '../components/Layout'
import { authActions, doFetchConferences, fetchUserInfo } from '../lib/actions'
import ConfList from '../components/ConfList'


/**
 * Index will show a list of All Conferences.
 * TODO: This will move to Conferences page afterwards.
 */

class Index extends Component {
  componentDidMount () {
    console.log(this.props.conferences)
  }
  render () {
    const { user } = this.props
    return (
      <Layout user={user}>
        <div>
          <ConfList conferences={this.props.conferences} />
        </div>
      </Layout>
    )
  }
}

Index.propTypes = {
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
  (state) => ({
    conferences: Object.values(state.conferences.items),
    user: state.auth.user
  })
)(Index)

export default Index
