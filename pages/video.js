import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchUserInfo, authActions, fetchVideoById } from '../lib/actions'
import SingleVideo from '../components/SingleVideo'
import { videoNormalizer } from '../lib/normalizers'

/**
 * Page for showing a single Video and information about that.
 * */

class Video extends React.Component {
  static propTypes = {
    user: object,
    dispatch: func,
    conferences: object,
    video: object
  }
  render () {
    return (
      <Layout user={this.props.user}>
        <div>
          <SingleVideo video={this.props.video} />
        </div>
      </Layout>
    )
  }
}


Video.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (isServer && req.cookies.token) {
    store.dispatch(authActions.addToken(req.cookies.token))
  }
  const token = store.getState().auth.token

  if (token) {
    await store.dispatch(fetchUserInfo(token))
  }

  await store.dispatch(fetchVideoById(query.id))

  return { id: query.id }
}

Video = withRedux(makeStore,
  (state, ownProps) => ({
    video: videoNormalizer.denormalizeById(ownProps.id, state.data),
    user: state.auth.user
  })
)(Video)

export default Video
