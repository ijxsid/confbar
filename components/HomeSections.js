import React from 'react'
import { array, object } from 'prop-types'
import styled from 'styled-components'
import { getThumbnail } from '../lib/youtubeUtils'
import StyledIcon from './styled/Icon'


const Styled = {
  Container: styled.div`
    width: 80%;
    margin: 2rem auto;
  `,
  SectionHeading: styled.div`
    font-size: 1.25rem;
    font-weight: bold;
    color: #555;
    margin: 1rem 0;
  `,
  VideoSection: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 50%);
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
    box-shadow: 2px 2px 4px 2px rgba(95, 95, 95, 0.2);
    cursor: pointer;

    > div:nth-child(2) {
      font-size: 2.5rem;
      transition: 0.16s linear;      
    }
    :hover {
      box-shadow: 4px 4px 10px 5px rgba(95, 95, 95, 0.20);
      
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
  `
}

const VideoSection = ({ videos }) => (
  <Styled.VideoSection>
    {
      videos.slice(0, Math.floor(videos.length / 2) * 2).map(video => (
        <Styled.Video background={getThumbnail(video.link)}>
          <Styled.VideoName>
            {video.name}
          </Styled.VideoName>
          <Styled.PlayIcon><i className="icon-play" /></Styled.PlayIcon>
          <Styled.VideoInfo>
            <div><Styled.Icon className="icon-microphone" /> {video.speaker.name}</div>
            <div><Styled.At>@</Styled.At> {video.conference.name} - {video.conference.year}</div>
          </Styled.VideoInfo>
        </Styled.Video>
      ))
    }
  </Styled.VideoSection>
)


VideoSection.propTypes = {
  videos: array
}

const Section = ({ section }) => (
  <div>
    <Styled.SectionHeading>
      {section.heading}
    </Styled.SectionHeading>
    {
      section.type === 'Video' &&
      <VideoSection videos={section.items} />
    }   
  </div>
)

Section.propTypes = {
  section: object.isRequired
}


const HomeSections = ({ sections }) => (
  <Styled.Container>
    {
      sections.map((section) =>
        <Section key={section._id} section={section} />
      )
    }
  </Styled.Container>
)


HomeSections.propTypes = {
  sections: array
}


HomeSections.defaultProps = {
  sections: []
}


export default HomeSections