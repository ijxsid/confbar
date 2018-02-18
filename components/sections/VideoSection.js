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
  `,
  Video: styled.div`
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    min-height: 320px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    font-size: 1.20em;
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
  `,
  VideoName: styled.div`
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

const VideoSection = ({ videos }) => (
  <Styled.VideoSection>
    {
      videos.slice(0, Math.floor(videos.length / 2) * 2).map(video => (
        <Video {...video} key={video._id}/>
      ))
    }
  </Styled.VideoSection>
)

VideoSection.propTypes = {
  videos: array
}
export default VideoSection
