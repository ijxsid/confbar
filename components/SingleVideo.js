import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { object } from 'prop-types'
import { getEmbed } from '../lib/youtubeUtils'
import { getFullLink, getFBShareLink, getTwitterShareLink } from '../lib/utils'
import { ConferenceSticky, TagSticky, SpeakerSticky } from './common/Sticky'

const Styled = {
  Container: styled.div`
    width: 75%;
    max-width: 850px;
    min-width: 450px;
    margin: 0 auto;
    padding: 15px 0;
    min-height: 100vh;
  `,
  Video: styled.div`
    margin-top: 2em;
    padding-top: 1em;
    background-color: white;
    box-shadow: 0px 0px 12px 8px rgba(170, 170, 190, 0.15);
  `,
  Info: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  `,
  Embed: styled.iframe`
    width: 100%;
    min-height: 450px;
    padding: 0px 10px;
  `,
  Footer: styled.div`
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
  `,
  Icon: styled.i`
    font-size: inherit;
    color: inherit;
    vertical-align: middle;
    margin-right: 8px;
  `
}

const SingleVideo = ({ video }) => (
  <Styled.Container>
    <Styled.Video>
      <Styled.Info>
        <div className="title is-4" style={{ marginBottom: '1.2rem', textAlign: 'center', width: '100%' }}>
          <Link href={`/video?id=${video._id}`} as={`/video/${video._id}`}>
            <a>{video.name}</a>
          </Link>
        </div>
      </Styled.Info>
      <Styled.Embed src={getEmbed(video.link)} frameBorder="0" allowFullScreen/>
      <Styled.Info>
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
      </Styled.Info>
      <Styled.Footer>
        <div>
          <span>Share on: </span>
          <a href={getFBShareLink('video', video)}>
            <Styled.Icon className="icon-facebook"/>
          </a>
          <a href={getTwitterShareLink(`Watch ${video.name} on Confbar: ${getFullLink('video', video)}`)}>
            <Styled.Icon className="icon-twitter"/>
          </a>
        </div>
      </Styled.Footer>
    </Styled.Video>
  </Styled.Container>
)

SingleVideo.propTypes = {
  video: object.isRequired
}

export default SingleVideo
