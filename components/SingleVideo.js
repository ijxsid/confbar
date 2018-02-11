import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { object } from 'prop-types'
import { getEmbed } from '../lib/youtubeUtils'
import { getFullLink, getFBShareLink, getTwitterShareLink } from '../lib/utils'
import { ConferenceSticky, TagSticky, SpeakerSticky } from './common/Sticky'
import StyledIcon from './styled/Icon'
import StyledFooter from './styled/Footer'
import { textToSlug } from '../lib/utils'


const Styled = {
  Container: styled.div`
    width: 75%;
    max-width: 900px;
    /* min-width: 450px; */
    margin: 0 auto;
    padding: 15px 0;
    min-height: 100vh;

    @media (min-width: 1720px) {
      max-width: 1200px;
    }
    
    @media (min-width: 1280px) {
      max-width: 1000px;
    }

    @media (max-width: 720px) {
      width: 95%;
    }

  `,
  Video: styled.div`
    margin-top: 2em;
    padding-top: 1em;
    background-color: white;
    box-shadow: 0px 0px 12px 8px rgba(170, 170, 190, 0.15);
  `,
  Title: styled.div`
    margin-bottom: 1.2rem;
    width: 100%;
    text-align: center;
    font-size: 1.45rem;
    font-weight: 600;

    @media (min-width: 1280px) {
      font-size: 1.75rem;
      margin-bottom: 0.6rem;
    }

    @media (max-width: 720px) {
      font-size: 1.20rem;
      margin-bottom: 0.6rem;
    } 

    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 0.6rem;
    }
 
    
    
  `,
  Info: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    flex-wrap: wrap;

    @media(max-width: 720px) {
      display: block;
    }

    @media(min-width: 1280px) {
      font-size: 1.3rem;
    }
  `,
  Embed: styled.iframe`
    width: 100%;
    height: 450px;
    padding: 0px 10px;

    @media (min-width: 1720px) {
      height:650px;
    }
    @media (max-width: 1280px) {
      height: 540px;
    }

    @media (max-width: 720px) {
      height: 405px;
      padding: 0px 0px; 
      
    }
    @media (max-width: 480px) {
      height: 240px;
    }
  `,
  Footer: styled.div`
    ${StyledFooter}
  `,
  Icon: styled.i`
    ${StyledIcon}
  `
}

const SingleVideo = ({ video }) => (
  <Styled.Container>
    <Styled.Video>
      <Styled.Info>
        <Styled.Title>
          <Link
            href={`/video?id=${video._id}`}
            as={`/video/${video._id}/${textToSlug(video.name)}`}>
            <a>{video.name}</a>
          </Link>
        </Styled.Title>
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
