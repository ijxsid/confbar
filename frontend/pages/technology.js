import React from 'react'
import connect from 'react-redux'
import { string, object, func, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchTagById, confActions } from '../lib/actions'
import { setupUser } from '../lib/utils'
import VideoList from '../components/VideoList'
import TagInfo from '../components/TagInfo'
import { tagNormalizer } from '../lib/normalizers'


class Technology extends React.Component {
  componentWillMount () {
    if (this.props.onClient) {
      this.props.fetchTag()
    }
  }
  componentWillUpdate (nextProps) {
    if (this.props.id !== nextProps.id) {
      this.props.fetchTag(nextProps.id)
    }
  }
  render () {
    const tag = this.props.entities.tags[this.props.id]
    const videoData = tagNormalizer.denormalizeVideos(tag.videos, this.props.entities)
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
  fetchTag: func,
  onClient: bool
}

Technology.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  const props = { id: query.id }
  store.dispatch(confActions.changeSearch(''))
  if (!isServer) {
    return { ...props, ...{ onClient: true } }
  }

  await setupUser(req, store)

  await store.dispatch(fetchTagById(query.id))

  return props
}

Technology = connect(
  (state) => ({
    user: state.auth.user,
    entities: state.data
  }),
  (dispatch, ownProps) => ({
    fetchTag: (id) => (dispatch(fetchTagById(id || ownProps.id)))
  })
)(Technology)

export default Technology
