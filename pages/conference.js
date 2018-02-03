import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { string, object, func } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchUserInfo, authActions, fetchConfById } from '../lib/actions'
import VideoList from '../components/VideoList'
import ConfInfo from '../components/ConfInfo'
import { confById } from '../lib/normalizers'


class Conference extends React.Component {
  render () {
    const conference = this.props.entities.conferences[this.props.id]
    const videoData = confById.denormalizeVideos(conference.videos, this.props.entities)
    const videos = videoData.videos
    return (
      <Layout>
        <ConfInfo conference={conference} />
        <div>
          <VideoList
            videos={videos}
            hideComponents={{ conference: true }}
          />
        </div>
      </Layout>
    )
  }
}

Conference.propTypes = {
  user: object,
  entities: object,
  id: string,
  dispatch: func
}

Conference.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (isServer && req.cookies.token) {
    store.dispatch(authActions.addToken(req.cookies.token))
  }
  const token = store.getState().auth.token

  await store.dispatch(fetchConfById(query.id))

  if (token) {
    await store.dispatch(fetchUserInfo(token))
  }
  return { id: query.id }
}

Conference = withRedux(makeStore,
  (state) => ({
    entities: state.data
  })
)(Conference)

export default Conference
