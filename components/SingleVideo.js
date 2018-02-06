import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { object } from 'prop-types'
import { getEmbed } from '../lib/youtubeUtils'
import ConferenceSticky from './ConferenceSticky'
import SpeakerSticky from './SpeakerSticky'
import TagSticky from './TagSticky'
import config from '../config'

const Container = styled.div`
  width: 75%;
  max-width: 850px;
  min-width: 450px;
  margin: 0 auto;
  padding: 15px 0;
  min-height: 100vh;
`

const VideoContainer = styled.div`
  margin-top: 2em;
  padding-top: 1em;
  background-color: white;
  box-shadow: 0px 0px 12px 8px rgba(170, 170, 190, 0.15);
`

const VideoInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;

`

const YoutubeEmbed = styled.iframe`
  width: 100%;
  min-height: 450px;
  padding: 0px 10px;
`

const VideoFooter = styled.div`
  background-color: #FFFFD3;
  padding: 7px 20px;
  font-weight: 600;
  color: #E20049;
  margin-top: 15px;

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

const getFullLink = (video) => `${config.frontend.base}/video?id=${video._id}`

const SingleVideo = ({ video }) => (
  <Container>
    <VideoContainer>
      <VideoInfoContainer>
        <div className="title is-4" style={{ marginBottom: '1.2rem', textAlign: 'center', width: '100%' }}>
          <Link href={`/video?id=${video._id}`}>
            <a>{video.name}</a>
          </Link>
        </div>
      </VideoInfoContainer>
      <YoutubeEmbed src={getEmbed(video.link)} frameBorder="0" allowFullScreen/>
      <VideoInfoContainer>
        {
          video.conference &&
          <ConferenceSticky conference={video.conference} />
        }
        {
          video.speaker &&
          <SpeakerSticky speaker={video.speaker}/>
        }
        {
          video.tags && video.tags.length > 0 &&
          <TagSticky tags={video.tags}/>
        }
      </VideoInfoContainer>
      <VideoFooter>
        <div>
          <span>Share on: </span>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${getFullLink(video)}`}>
            <Icon className="icon-facebook"/>
          </a>
          <a href={`https://twitter.com/home?status=Watch '${video.name}' on Confbar: ${getFullLink(video)}}`}>
            <Icon className="icon-twitter"/>
          </a>
        </div>
      </VideoFooter>
    </VideoContainer>
  </Container>
)

SingleVideo.propTypes = {
  video: object.isRequired
}

export default SingleVideo
