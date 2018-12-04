import React, { Component } from "react"
import { connect } from 'react-redux'
import { object, func, array, bool, number } from 'prop-types'
import Layout from '../components/shared/Layout'
import { doFetchConferences, confActions, paginationActions } from '../lib/actions'
import ConfList from '../components/ConfList'
import { setupUser } from '../lib/utils'
import PagedList from '../components/common/PagedList'


class Conferences extends Component {
  render () {
    const { user, onClient, page, fetchConferences, fetching, query } = this.props
    return (
      <Layout user={user}>
        <PagedList
          fetchItems={fetchConferences}
          onClient={onClient}
          page={page}
          fetching={fetching}
          query={query}
        >
          <ConfList conferences={this.props.conferences} />
        </PagedList>
      </Layout>
    )
  }
}

Conferences.propTypes = {
  user: object,
  fetchConferences: func,
  conferences: array,
  onClient: bool,
  page: number,
  fetching: bool,
  query: object
}


Conferences.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  store.dispatch(confActions.changeSearch(''))

  if (!isServer) {
    return { onClient: true, query }
  }

  await setupUser(req, store)
  Object.keys(query)
    .map(queryKey => (
      store.dispatch(paginationActions.setFilters(queryKey, query[queryKey]))
    ))
  await store.dispatch(doFetchConferences(query))
}

Conferences = connect(
  (state) => ({
    conferences: Object.values(state.data.conferences),
    user: state.auth.user,
    page: state.pagination.conference.page,
    fetching: state.pagination.conference.isFetching
  }),
  (dispatch) => ({
    fetchConferences: (query) => (dispatch(doFetchConferences(query)))
  })
)(Conferences)

export default Conferences
