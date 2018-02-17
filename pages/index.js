import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func, array, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchFeatured } from '../lib/actions'
import { setupUser } from '../lib/utils'
import HomeSections from '../components/HomeSections'


class Index extends Component {
  componentWillMount () {
    if (this.props.onClient) {
      this.props.fetchFeatured()
    }
  }
  render () {
    const { user, sections } = this.props
    return (
      <Layout user={user}>
        <div>
          <HomeSections sections={sections} />
        </div>
      </Layout>
    )
  }
}

Index.propTypes = {
  user: object,
  fetchFeatured: func,
  sections: array,
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
    sections: state.data.featured,
    user: state.auth.user
  }),
  (dispatch) => ({
    fetchFeatured: () => (dispatch(fetchFeatured()))
  })
)(Index)

export default Index
