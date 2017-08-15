import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { string, object, func, array } from 'prop-types'
import Layout from '../components/Layout'
import { fetchUserInfo, authActions, fetchConfById } from '../lib/actions'
import VideoList from '../components/VideoList'


class Conference extends React.Component {
  componentDidMount () {
    console.log("Current Conference Videos ->", this.props.conferences[this.props.id], this.props)
  }
  render () {
    return (
      <Layout user={this.props.user}>
        <div>
          <VideoList videos={this.props.conferences[this.props.id]} />
        </div>
      </Layout>
    )
  }
}

Conference.propTypes = {
  user: object,
  dispatch: func,
  conferences: object,
  id: string
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
  (state) => ({ conferences: state.conferences.items, user: state.auth.user })
)(Conference)

export default Conference
