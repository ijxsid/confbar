import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { object, func, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchVideoById } from '../lib/actions'
import { setupUser } from '../lib/utils'
import SingleVideo from '../components/SingleVideo'
import { videoNormalizer } from '../lib/normalizers'

/**
 * Page for showing a single Video and information about that.
 * */

class Video extends React.Component {
  static propTypes = {
    user: object,
    fetchVideo: func,
    conferences: object,
    video: object,
    onClient: bool
  }
  componentWillMount () {
    if (this.props.onClient) {
      this.props.fetchVideo()
    }
  }
  render () {
    console.log("video", this.props.video)
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

  const props = { id: query.id }

  if (!isServer) {
    return { ...props, ...{ onClient: true } }
  }

  await setupUser(req, store)

  await store.dispatch(fetchVideoById(query.id))

  return props
}

Video = withRedux(makeStore,
  (state, ownProps) => ({
    video: videoNormalizer.denormalizeById(ownProps.id, state.data),
    user: state.auth.user
  }),
  (dispatch, ownProps) => ({
    fetchVideo: () => (dispatch(fetchVideoById(ownProps.id)))
  })
)(Video)

export default Video
