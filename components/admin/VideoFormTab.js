import React from 'react'
import { func, object } from 'prop-types'
import TextField from '../common/TextField'

const VideoFormTab = ({ video, onChange }) => (
  <div>
    <TextField
      label="Video Name"
      name="name"
      value={video.name}
      onChange={onChange}
    />
    <TextField
      label="Description"
      name="description"
      value={video.description}
      onChange={onChange}
    />
    <TextField
      label="Link"
      name="link"
      value={video.link}
      onChange={onChange}
    />
    <TextField
      label="Youtube Channel Id"
      name="youtubeChannelId"
      value={video.youtubeChannelId}
      onChange={onChange}
    />
    <TextField
      label="Youtube Channel"
      name="youtubeChannelTitle"
      value={video.youtubeChannelTitle}
      onChange={onChange}
    />
  </div>
)
VideoFormTab.propTypes = {
  video: object,
  onChange: func
}


export default VideoFormTab
