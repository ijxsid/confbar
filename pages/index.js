import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func, array, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchFeatured } from '../lib/actions'
import { setupUser } from '../lib/utils'


class Index extends Component {
  componentWillMount () {
    if (this.props.onClient) {
      this.props.fetchFeatured()
    }
  }
  render () {
    const { user } = this.props
    return (
      <Layout user={user}>
        <div>
          Index Page
          <pre><code>
            {JSON.stringify(this.props.featured, 2, 4)}
          </code></pre>
        </div>
      </Layout>
    )
  }
}

Index.propTypes = {
  user: object,
  fetchFeatured: func,
  featured: array,
  onClient: bool
}


Index.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (!isServer) {
    return { onClient: true }
  }

  await setupUser(req, store)

  await store.dispatch(fetchFeatured())
}

Index = withRedux(makeStore,
  (state) => ({
    featured: state.data.featured,
    user: state.auth.user
  }),
  (dispatch) => ({
    fetchFeatured: () => (dispatch(fetchFeatured()))
  })
)(Index)

export default Index
