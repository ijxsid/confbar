import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func, array, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { doFetchConferences } from '../lib/actions'
import ConfList from '../components/ConfList'
import { setupUser } from '../lib/utils'


class Conferences extends Component {
  componentWillMount () {
    if (this.props.onClient) {
      this.props.fetchConferences()
    }
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

Conferences.propTypes = {
  user: object,
  fetchConferences: func,
  conferences: array,
  onClient: bool
}


Conferences.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (!isServer) {
    return { onClient: true }
  }

  await setupUser(req, store)

  await store.dispatch(doFetchConferences())
}

Conferences = withRedux(makeStore,
  (state) => ({
    conferences: Object.values(state.data.conferences),
    user: state.auth.user
  }),
  (dispatch) => ({
    fetchConferences: () => (dispatch(doFetchConferences()))
  })
)(Conferences)

export default Conferences
