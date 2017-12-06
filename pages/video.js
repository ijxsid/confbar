import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { string, object, func } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchUserInfo, authActions, fetchConfById } from '../lib/actions'
import SingleVideo from '../components/SingleVideo'


class Video extends React.Component {
  componentDidMount () {
    console.log("Current Conference Videos ->", this.props.videos, this.props)
  }
  render () {
    return (
      <Layout user={this.props.user}>
        <div>
          <SingleVideo video={this.props.videos[0]} />
        </div>
      </Layout>
    )
  }
}

Video.propTypes = {
  user: object,
  dispatch: func,
  conferences: object,
  id: string
}

Video.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
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

Video = withRedux(makeStore,
  (state) => ({ videos: state.data.videos, user: state.auth.user })
)(Video)

export default Video
