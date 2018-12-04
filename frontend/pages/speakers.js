import React, { Component } from "react"
import { connect } from 'react-redux'
import { object, func, array, bool, number } from 'prop-types'
import Layout from '../components/shared/Layout'
import { doFetchSpeakers, confActions } from '../lib/actions'
import SpeakersList from '../components/SpeakersList'
import { setupUser } from '../lib/utils'
import PagedList from '../components/common/PagedList'

class Speakers extends Component {
  render () {
    const { user, onClient, page, fetchSpeakers } = this.props
    return (
      <Layout user={user}>
        <PagedList fetchItems={fetchSpeakers} onClient={onClient} page={page}>
          <SpeakersList speakers={this.props.speakers} />
        </PagedList>
      </Layout>
    )
  }
}

Speakers.propTypes = {
  user: object,
  fetchSpeakers: func,
  speakers: array,
  onClient: bool,
  page: number,
  fetching: bool
}


Speakers.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  store.dispatch(confActions.changeSearch(''))
  if (!isServer) {
    return { onClient: true }
  }

  await setupUser(req, store)

  await store.dispatch(doFetchSpeakers())
}

Speakers = connect(
  (state) => ({
    speakers: Object.values(state.data.speakers),
    user: state.auth.user,
    page: state.pagination.speaker.page,
    fetching: state.pagination.speaker.isFetching
  }),
  (dispatch) => ({
    fetchSpeakers: () => (dispatch(doFetchSpeakers()))
  })
)(Speakers)

export default Speakers
