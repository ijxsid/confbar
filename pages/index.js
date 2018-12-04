import React, { Component } from "react"
import { connect } from 'react-redux'
import { object, func, array, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchFeatured, confActions } from '../lib/actions'
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
      <Layout
        user={user}
        meta={{
          'description': `Watch & follow best the Technology Conferences from around the world.
          Learn from the best doing their best.`,
          'twitter:title': 'Confbar: The Best place to watch & follow top Tech Conferences.',
          'twitter:description': `Watch & follow best the Technology Conferences from around the world.
          Learn from the best doing their best.`,
          'twitter:url': 'https://confbar.com',
          'og:type': 'website'
        }}
      >
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
  store.dispatch(confActions.changeSearch(''))
  if (!isServer) {
    return { onClient: true }
  }

  await setupUser(req, store)

  await store.dispatch(fetchFeatured())
}

Index = connect(
  (state) => ({
    sections: state.data.featured,
    user: state.auth.user
  }),
  (dispatch) => ({
    fetchFeatured: () => (dispatch(fetchFeatured()))
  })
)(Index)

export default Index
