import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { string, object, func } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchUserInfo, authActions, fetchVideoById } from '../lib/actions'
import SingleVideo from '../components/SingleVideo'
import { videoById } from '../lib/normalizers'

/**
 * Page for showing a single Video and information about that.
 * */

class Video extends React.Component {
  componentDidMount () {
    console.log("Current Conference Videos ->", this.props)
  }
  render () {
    const video = videoById.denormalize(this.props.id, this.props.entities)
    return (
      <Layout user={this.props.user}>
        <div>
          <SingleVideo video={video} />
        </div>
      </Layout>
    )
  }
}

Video.propTypes = {
  user: object,
  dispatch: func,
  conferences: object,
  id: string,
  entities: object
}

Video.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  if (isServer && req.cookies.token) {
    store.dispatch(authActions.addToken(req.cookies.token))
  }
  const token = store.getState().auth.token

  await store.dispatch(fetchVideoById(query.id))

  if (token) {
    await store.dispatch(fetchUserInfo(token))
  }

  return { id: query.id }
}

Video = withRedux(makeStore,
  (state) => ({ entities: state.data, user: state.auth.user })
)(Video)

export default Video
