import React from 'react'
import styled from 'styled-components'
import { array, shape, string, number } from 'prop-types'
import { getThumbnail, getEmbed } from '../../lib/youtubeUtils'
import StyledIcon from '../styled/Icon'
import VideoState from '../common/VideoState'

const Styled = {
  VideoSection: styled.div`
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 17.5px));
    grid-gap: 35px;
    @media(max-width: 920px) {
      grid-template-columns: repeat(1, 100%);
    }
    @media(max-width: 480px) {
      grid-gap: 20px;
    }
  `,
  Video: styled.div`
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    min-height: 320px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    position: relative;
    border-radius: 2.4px;
    box-shadow: 5px 10px 20px rgba(0,0,0,0.15), 2px 6px 6px rgba(0,0,0,0.18);
    cursor: pointer;

    > div:nth-child(2) {
      font-size: 2.5rem;
      transition: 0.16s linear;      
    }
    :hover {
      box-shadow: 7px 14px 28px rgba(0,0,0,0.18), 5px 10px 10px rgba(0,0,0,0.20); 
    }

    :hover > div:nth-child(2) {
      color: #3498DB;
    }

    @media(min-width: 1440px) {
      min-height: 350px; 
    }
    @media(min-width: 1720px) {
      min-height: 400px; 
    }
    @media(min-width: 1920px) {
      min-height: 500px; 
    }
    @media(max-width: 480px) {
      min-height: 270px;
    }
    @media(max-width: 420px) {
      min-height: 236px;
    }
    @media(max-width: 360px) {
      min-height: 200px;
    }
  `,
  VideoName: styled.div`
    font-size: 1.20em;  
    background-color: rgba(20, 20, 20, 0.65);
    justify-self: start;
    align-self: start;
    width: auto;
    max-width: 100%;
    color: #e7e7e7;
    font-weight: bold;
    padding: 4px 1rem;
    border-radius: 2.5px;
    box-shadow: 0px 0px 8px 2px rgba(20, 20, 20, 0.2);
    @media(max-width: 480px) {
      font-size: 1rem;
      padding: 2px 0.5rem;
    }
    @media(min-width: 1720px) {
      font-size: 1.35rem; 
    }
  `,
  PlayIcon: styled.div`
    align-self: center;
    justify-self: center;
    color: #C02727;
  `,
  VideoInfo: styled.div`
    font-size: 0.90rem;
    color: #e7e7e7;
    font-weight: bold;
    padding: 4px 1rem;
    justify-self: start;
    align-self: end;
    background-color: rgba(20, 20, 20, 0.65);
    box-shadow: 0px 0px 8px 2px rgba(20, 20, 20, 0.2);
    @media(max-width: 480px) {
      font-size: 0.75rem;
      padding: 2px 0.5rem;
    }
    @media(min-width: 1720px) {
      font-size: 1.25rem; 
    }
  `,
  Icon: styled.i`
    ${StyledIcon}
  `,
  At: styled.span`
    display: inline-block;
    margin-right: 9px;
  `,
  Embed: styled.iframe`
    background-image: url('/static/images/dual-ring-loader.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 20%;
    grid-row: span 3;
    width: 100%;
    min-height: 320px;

    @media(min-width: 1440px) {
      min-height: 350px; 
    }
    @media(min-width: 1720px) {
      min-height: 400px; 
    }
    @media(min-width: 1920px) {
      min-height: 500px; 
    }
    @media(max-width: 480px) {
      min-height: 270px;
    }
    @media(max-width: 420px) {
      min-height: 236px;
    }
    @media(max-width: 360px) {
      min-height: 200px;
    }
  `
}

const Video = ({ name, link, conference, speaker }) => (
  <VideoState
    render={({ clicked, onClick }) =>
      clicked ?
        <Styled.Video>
          <Styled.Embed src={getEmbed(link)} frameBorder="0" allowFullScreen />
        </Styled.Video> :
        <Styled.Video background={getThumbnail(link)} onClick={onClick}>
          <Styled.VideoName>
            {name}
          </Styled.VideoName>
          <Styled.PlayIcon><i className="icon-play" /></Styled.PlayIcon>
          <Styled.VideoInfo>
            <div><Styled.Icon className="icon-microphone" /> {speaker.name}</div>
            <div><Styled.At>@</Styled.At> {conference.name} - {conference.year}</div>
          </Styled.VideoInfo>
        </Styled.Video>
    }
  />
)

Video.propTypes = {
  name: string.isRequired,
  link: string.isRequired,
  conference: shape({
    name: string.isRequired,
    year: number
  }).isRequired,
  speaker: shape({
    name: string.isRequired
  })
}

const VideoSection = ({ videos, multiple }) => {
  const visibleVideos = videos.slice(0, Math.floor(videos.length / multiple) * multiple)
  return (
    <Styled.VideoSection>
      {
        visibleVideos.map(video => (
          <Video {...video} key={video._id}/>
        ))
      }
    </Styled.VideoSection>

  )
}
VideoSection.propTypes = {
  videos: array,
  multiple: number
}

VideoSection.defaultProps = {
  videos: [],
  multiple: 2
}
export default VideoSection
