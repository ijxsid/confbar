import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { getThumbnail, getEmbed } from '../lib/youtubeUtils'
import ConferenceSticky from './ConferenceSticky'
import SpeakerSticky from './SpeakerSticky'
import TagSticky from './TagSticky'
import { object, array } from 'prop-types'


const VideoListContainer = styled.div`
  width: 75%;
  max-width: 850px;
  min-width: 450px;
  margin: 0 auto;
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 50%);
`
const VideoContainer = styled.div`
  margin: 15px 20px;
  box-shadow: 0px 0px 12px 8px rgba(170, 170, 190, 0.15);
  background: white;
  :hover {
    box-shadow: 0px 0px 20px 15px rgba(170, 170, 190, 0.1);
  }
`
const VideoInfoContainer = styled.div`
  padding: 2px 20px 15px;
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
`

class VideoInfo extends React.Component {
  constructor () {
    super()

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
    const { video } = this.props
    const { videoClicked } = this.state
    return (
      <VideoContainer>
        { videoClicked ?
          <YoutubeEmbed src={getEmbed(video.link)} frameBorder="0" allowFullScreen /> :
          <ThumbnailOverlay background={getThumbnail(video.link)} onClick={this.onThumbnailClick}>
            <div><i className="icon-play" /></div>
          </ThumbnailOverlay>
        }
        <VideoInfoContainer>
          <div className="title is-6" style={{ marginBottom: '0.65rem' }}>
            <Link href={`/videos?id=${video._id}`}>
              <a>{video.name}</a>
            </Link>
          </div>
          <ConferenceSticky conference={video.conference} />
          <SpeakerSticky speaker={video.speaker}/>
          <TagSticky tags={video.tags}/>
        </VideoInfoContainer>
        <VideoFooter>
          Comments | Shares
        </VideoFooter>
      </VideoContainer>
    )
  }
}

VideoInfo.propTypes = {
  video: object.isRequired
}

const VideoList = ({ videos }) => (
  <VideoListContainer>
    {
      Array.isArray(videos) && videos.map(v => <VideoInfo video={v} key={v._id}/>)
    }
  </VideoListContainer>
)

VideoList.propTypes = {
  videos: array.isRequired
}

export default VideoList
