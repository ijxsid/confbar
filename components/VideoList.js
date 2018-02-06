import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { getThumbnail, getEmbed } from '../lib/youtubeUtils'
import ConferenceSticky from './ConferenceSticky'
import SpeakerSticky from './SpeakerSticky'
import TagSticky from './TagSticky'
import { object, array } from 'prop-types'
import config from '../config'


const VideoListContainer = styled.div`
  width: 75%;
  max-width: 850px;
  min-width: 450px;
  margin: 0 auto;
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 50%);
  justify-content: center;
`
const VideoContainer = styled.div`
  margin: 15px 20px;
  box-shadow: 0px 0px 12px 8px rgba(170, 170, 190, 0.15);
  background: white;
  :hover {
    box-shadow: 0px 0px 20px 15px rgba(170, 170, 190, 0.1);
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const VideoInfoContainer = styled.div`
  padding: 10px 20px 10px;
`


const YoutubeEmbed = styled.iframe`
  width: 100%;
  min-height: 280px;
`

const ThumbnailOverlay = styled.div`
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  min-height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  color: #3498DB;
  cursor: pointer;
  text-shadow: 0px 0px 15px #0B409C;
  :hover {
    color: #0B409C;
  }
`
const VideoFooter = styled.div`
  background-color: #FFFFD3;
  padding: 7px 20px;
  font-weight: 600;
  color: #E20049;

  a {
    color: #E20049;
  }

  a:hover {
    color: #3273dc;
  }
`
const Icon = styled.i`
  font-size: inherit;
  color: inherit;
  vertical-align: middle;
  margin-right: 8px;
`

class VideoInfo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      videoClicked: false
    }

    this.onThumbnailClick = this.onThumbnailClick.bind(this)
  }

  onThumbnailClick () {
    this.setState(() => ({
      videoClicked: true
    }))
  }
  render () {
    const { video, hideComponents } = this.props
    const { videoClicked } = this.state
    const fullLink = `${config.frontend.base}/video?id=${video._id}`
    return (
      <VideoContainer>
        <VideoInfoContainer>
          <div className="title is-6" style={{ marginBottom: '0.15rem' }}>
            <Link href={`/video?id=${video._id}`}>
              <a>{video.name}</a>
            </Link>
          </div>
        </VideoInfoContainer>
        { videoClicked ?
          <YoutubeEmbed src={getEmbed(video.link)} frameBorder="0" allowFullScreen /> :
          <ThumbnailOverlay background={getThumbnail(video.link)} onClick={this.onThumbnailClick}>
            <div><i className="icon-play" /></div>
          </ThumbnailOverlay>
        }
        <VideoInfoContainer>
          {
            !hideComponents.conference && video.conference &&
            <ConferenceSticky conference={video.conference} />
          }

          {
            !hideComponents.speaker && video.speaker &&
            <SpeakerSticky speaker={video.speaker}/>
          }

          {
            !hideComponents.tag && video.tags.length > 0 &&
            <TagSticky tags={video.tags}/>
          }
        </VideoInfoContainer>
        <VideoFooter>
          <div>
            <span>Share on: </span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${fullLink}`}>
              <Icon className="icon-facebook"/>
            </a>
            <a href={`https://twitter.com/home?status=Watch '${video.name}' on Confbar: ${fullLink}`}>
              <Icon className="icon-twitter"/>
            </a>
          </div>
        </VideoFooter>
      </VideoContainer>
    )
  }
}

VideoInfo.propTypes = {
  video: object.isRequired,
  hideComponents: object
}

const VideoList = ({ videos, hideComponents }) => (
  <VideoListContainer>
    {
      Array.isArray(videos) && videos.map(v => (
        <VideoInfo
          video={v}
          hideComponents={hideComponents}
          key={v._id}
        />
      ))
    }
  </VideoListContainer>
)

VideoList.propTypes = {
  videos: array.isRequired,
  hideComponents: object
}

VideoList.defaultProps = {
  hideComponents: {}
}

export default VideoList
