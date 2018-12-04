import React from 'react'
import { func } from 'prop-types'

class VideoState extends React.Component {
  state = {
    vidoeClicked: false
  };

  onVideoClick = () => {
    this.setState(() => ({
      vidoeClicked: true
    }))
  }
  render () {
    return this.props.render(
      {
        clicked: this.state.vidoeClicked,
        onClick: this.onVideoClick
      }
    )
  }
}

VideoState.propTypes = {
  render: func
}

export default VideoState
