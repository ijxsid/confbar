import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func, array, bool, number } from 'prop-types'
import Layout from '../components/shared/Layout'
import { doFetchSpeakers, confActions } from '../lib/actions'
import SpeakersList from '../components/SpeakersList'
import { setupUser } from '../lib/utils'


class Speakers extends Component {
  componentWillMount () {
    if (this.props.onClient && this.props.page === 0) {
      this.props.fetchSpeakers()
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
      this.props.fetchSpeakers()
    }
  }
  render () {
    const { user } = this.props
    return (
      <Layout user={user}>
        <div>
          <SpeakersList speakers={this.props.speakers} />
        </div>
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

Speakers = withRedux(makeStore,
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
