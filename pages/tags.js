import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func, array, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { doFetchTags } from '../lib/actions'
import TagsList from '../components/TagsList'
import { setupUser } from '../lib/utils'


class Tags extends Component {
  componentWillMount () {
    if (this.props.onClient) {
      this.props.fetchTags()
    }
  }
  render () {
    const { user } = this.props
    return (
      <Layout user={user}>
        <div>
          <TagsList tags={this.props.tags} />
        </div>
      </Layout>
    )
  }
}

Tags.propTypes = {
  user: object,
  fetchTags: func,
  tags: array,
  onClient: bool
}


Tags.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (!isServer) {
    return { onClient: true }
  }

  await setupUser(req, store)

  await store.dispatch(doFetchTags())
}

Tags = withRedux(makeStore,
  (state) => ({
    tags: Object.values(state.data.tags),
    user: state.auth.user
  }),
  (dispatch) => ({
    fetchTags: () => (dispatch(doFetchTags()))
  })
)(Tags)

export default Tags
