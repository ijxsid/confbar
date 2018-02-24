import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { string, object, func, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchSpeakerById, confActions } from '../lib/actions'
import { setupUser } from '../lib/utils'
import VideoList from '../components/VideoList'
import SpeakerInfo from '../components/SpeakerInfo'
import { speakerNormalizer } from '../lib/normalizers'


class Speaker extends React.Component {
  componentWillMount () {
    if (this.props.onClient) {
      this.props.fetchSpeaker()
    }
  }
  componentWillUpdate (nextProps) {
    if (this.props.id !== nextProps.id) {
      this.props.fetchSpeaker(nextProps.id)
    }
  }
  render () {
    const speaker = this.props.entities.speakers[this.props.id]
    const videoData = speakerNormalizer.denormalizeVideos(speaker.videos, this.props.entities)
    const videos = videoData.videos
    return (
      <Layout user={this.props.user}>
        <SpeakerInfo speaker={speaker} />
        <div>
          <VideoList
            videos={videos}
            hideComponents={{ speaker: true }}
          />
        </div>
      </Layout>
    )
  }
}

Speaker.propTypes = {
  user: object,
  entities: object,
  id: string,
  fetchSpeaker: func,
  onClient: bool
}

Speaker.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  const props = { id: query.id }

  store.dispatch(confActions.changeSearch(''))

  if (!isServer) {
    return { ...props, ...{ onClient: true } }
  }

  await setupUser(req, store)

  await store.dispatch(fetchSpeakerById(query.id))

  return props
}

Speaker = withRedux(makeStore,
  (state) => ({
    user: state.auth.user,
    entities: state.data
  }),
  (dispatch, ownProps) => ({
    fetchSpeaker: (id) => (dispatch(fetchSpeakerById(id || ownProps.id)))
  })
)(Speaker)

export default Speaker
