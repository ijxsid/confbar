import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { string, object, func } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchUserInfo, authActions, fetchSpeakerById } from '../lib/actions'
import VideoList from '../components/VideoList'
import SpeakerInfo from '../components/SpeakerInfo'
import { speakerNormalizer } from '../lib/normalizers'


class Speaker extends React.Component {
  render () {
    const speaker = this.props.entities.speakers[this.props.id]
    console.log("speaker", speaker)
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
  dispatch: func
}

Speaker.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (isServer && req.cookies.token) {
    store.dispatch(authActions.addToken(req.cookies.token))
  }
  const token = store.getState().auth.token

  await store.dispatch(fetchSpeakerById(query.id))

  if (token) {
    await store.dispatch(fetchUserInfo(token))
  }
  return { id: query.id }
}

Speaker = withRedux(makeStore,
  (state) => ({
    user: state.auth.user,
    entities: state.data
  })
)(Speaker)

export default Speaker
