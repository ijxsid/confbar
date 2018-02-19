import React, { Component } from "react"
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func, array, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { doFetchSpeakers } from '../lib/actions'
import SpeakersList from '../components/SpeakersList'
import { setupUser } from '../lib/utils'


class Speakers extends Component {
  componentWillMount () {
    if (this.props.onClient) {
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
  onClient: bool
}


Speakers.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (!isServer) {
    return { onClient: true }
  }

  await setupUser(req, store)

  await store.dispatch(doFetchSpeakers())
}

Speakers = withRedux(makeStore,
  (state) => ({
    speakers: Object.values(state.data.speakers),
    user: state.auth.user
  }),
  (dispatch) => ({
    fetchSpeakers: () => (dispatch(doFetchSpeakers()))
  })
)(Speakers)

export default Speakers
