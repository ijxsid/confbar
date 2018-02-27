import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func, array, bool, number } from 'prop-types'
import Layout from '../components/shared/Layout'
import { doFetchTags, confActions } from '../lib/actions'
import TagsList from '../components/TagsList'
import { setupUser } from '../lib/utils'


class Tags extends Component {
  componentWillMount () {
    console.log("tags =>", this.props.tags)
    if (this.props.onClient && this.props.page === 0) {
      this.props.fetchTags()
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll)
    }
  }
  componentWillUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
  handleScroll = (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
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
  onClient: bool,
  page: number,
  fetching: bool
}


Tags.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  store.dispatch(confActions.changeSearch(''))
  if (!isServer) {
    return { onClient: true }
  }

  await setupUser(req, store)

  await store.dispatch(doFetchTags())
}

Tags = withRedux(makeStore,
  (state) => ({
    tags: Object.values(state.data.tags),
    user: state.auth.user,
    page: state.pagination.tag.page,
    fetching: state.pagination.tag.isFetching
  }),
  (dispatch) => ({
    fetchTags: () => (dispatch(doFetchTags()))
  })
)(Tags)

export default Tags
