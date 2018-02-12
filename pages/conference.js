import React from 'react'
import makeStore from '../lib/makeStore'
import withRedux from 'next-redux-wrapper'
import { string, object, func, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchConfById } from '../lib/actions'
import { setupUser } from '../lib/utils'
import VideoList from '../components/VideoList'
import ConfInfo from '../components/ConfInfo'
import { confNormalizer } from '../lib/normalizers'
import Dialog from '../components/common/Dialog'
import EditVideo from '../components/admin/EditVideo'


class Conference extends React.Component {
  componentWillMount () {
    if (this.props.onClient) {
      this.props.fetchConf()
    }
  }
  render () {
    const { id, entities, editing } = this.props
    const conference = this.props.entities.conferences[id]
    const videoData = confNormalizer.denormalizeVideos(conference.videos, entities)
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
        <Dialog open={editing.type === 'video' && editing.id}>
          <EditVideo />
        </Dialog>
      </Layout>
    )
  }
}

Conference.propTypes = {
  user: object,
  entities: object,
  id: string,
  fetchConf: func,
  onClient: bool,
  editing: object
}

Conference.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  const props = { id: query.id }

  if (!isServer) {
    return { ...props, ...{ onClient: true } }
  }

  await setupUser(req, store)

  await store.dispatch(fetchConfById(query.id))

  return props
}

Conference = withRedux(makeStore,
  (state) => ({
    entities: state.data,
    editing: state.data.editing
  }),
  (dispatch, ownProps) => ({
    fetchConf: () => dispatch(fetchConfById(ownProps.id))
  })
)(Conference)

export default Conference
