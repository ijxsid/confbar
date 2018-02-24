import React from 'react'
import { string, func } from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import AdminTools from './AdminTools'
import { editVideo } from '../../lib/actions'
import StyledIcon from '../styled/Icon'

const Styled = {
  Icon: styled.i`
  ${StyledIcon}
`
}
let VideoAdminTools = ({ id, startEditingVideo }) => (
  <AdminTools
    render={
      [
        <div key={0}>
          <button className="button is-info is-small" onClick={() => { startEditingVideo(id) }}>
            <Styled.Icon className="icon-edit"/> Edit
          </button>
        </div>,
        <div key={1}>
          <button className="button is-danger is-small">
            <Styled.Icon className="icon-delete"/> Delete
          </button>
        </div>
      ]
    }
  />
)

VideoAdminTools.propTypes = {
  id: string,
  startEditingVideo: func
}

VideoAdminTools = connect(null, dispatch => ({
  startEditingVideo: id => dispatch(editVideo(id))
}))(VideoAdminTools)

export default VideoAdminTools

