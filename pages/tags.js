import React, { Component } from "react"
import { connect } from 'react-redux'
import { object, func, array, bool, number } from 'prop-types'
import Layout from '../components/shared/Layout'
import { doFetchTags, confActions } from '../lib/actions'
import TagsList from '../components/TagsList'
import { setupUser } from '../lib/utils'
import PagedList from '../components/common/PagedList'


class Tags extends Component {
  render () {
    const { user, onClient, page, fetchTags } = this.props
    return (
      <Layout user={user}>
        <PagedList fetchItems={fetchTags} onClient={onClient} page={page}>
          <TagsList tags={this.props.tags} />
        </PagedList>
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

Tags = connect(
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
