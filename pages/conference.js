import React from 'react'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { string, object, func, bool } from 'prop-types'
import Layout from '../components/shared/Layout'
import { fetchConfById, adminActions, confActions } from '../lib/actions'
import { setupUser } from '../lib/utils'
import VideoList from '../components/VideoList'
import ConfInfo from '../components/ConfInfo'
import { confNormalizer } from '../lib/normalizers'
import Dialog from '../components/common/Dialog'

const EditVideoDynamic = dynamic(import('../components/admin/EditVideo'))

class Conference extends React.Component {
  componentWillMount () {
    if (this.props.onClient) {
      this.props.fetchConf()
    }
  }
  componentWillUpdate (nextProps) {
    if (this.props.id !== nextProps.id) {
      this.props.fetchConf(nextProps.id)
    }
  }
  render () {
    const { id, entities, editor, cancelEditing } = this.props
    const conference = this.props.entities.conferences[id]
    const videoData = confNormalizer.denormalizeVideos(conference.videos, entities)
    const videos = videoData.videos || []
    return (
      <Layout>
        <ConfInfo conference={conference} />
        <div>
          <VideoList
            videos={videos}
            hideComponents={{ conference: true }}
          />
        </div>
        <Dialog
          open={!!(editor.type === 'video' && editor.id)}
          onOuterClick={cancelEditing}
        >
          <EditVideoDynamic />
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
  editor: object,
  cancelEditing: func
}

Conference.getInitialProps = async ({ store, isServer, req, pathname, query }) => {
  const props = { id: query.id }

  store.dispatch(confActions.changeSearch(''))

  if (!isServer) {
    return { ...props, ...{ onClient: true } }
  }

  await store.dispatch(fetchConfById(query.id))

  await setupUser(req, store)

  return props
}

Conference = connect(
  (state) => ({
    entities: state.data,
    editor: state.editor
  }),
  (dispatch, ownProps) => ({
    fetchConf: (id) => dispatch(fetchConfById(id || ownProps.id)),
    cancelEditing: () => dispatch(adminActions.resetEditVideo())
  })
)(Conference)

export default Conference
