import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { string, object, func } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchUserInfo, authActions, fetchTagById } from '../lib/actions'
import VideoList from '../components/VideoList'
import TagInfo from '../components/TagInfo'
import { tagById } from '../lib/normalizers'


class Technology extends React.Component {
  render () {
    const tag = this.props.entities.tags[this.props.id]
    console.log("tag", tag)
    const videoData = tagById.denormalizeVideos(tag.videos, this.props.entities)
    const videos = videoData.videos
    return (
      <Layout user={this.props.user}>
        <TagInfo tag={tag} />
        <div>
          <VideoList
            videos={videos}
            hideComponents={{ tag: true }}
          />
        </div>
      </Layout>
    )
  }
}

Technology.propTypes = {
  user: object,
  entities: object,
  id: string,
  dispatch: func
}

Technology.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (isServer && req.cookies.token) {
    store.dispatch(authActions.addToken(req.cookies.token))
  }
  const token = store.getState().auth.token

  await store.dispatch(fetchTagById(query.id))
  console.log("get State()", store.getState().data)

  if (token) {
    await store.dispatch(fetchUserInfo(token))
  }
  return { id: query.id }
}

Technology = withRedux(makeStore,
  (state) => ({
    user: state.auth.user,
    entities: state.data
  })
)(Technology)

export default Technology
