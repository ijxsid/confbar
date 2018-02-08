import React from 'react'
import styled from 'styled-components'
import { shape, string } from 'prop-types'

const Styled = {
  SpeakerInfo: styled.div`
    width: 75%;
    max-width: 850px;
    min-width: 240px;
    margin: 2.5rem auto 1rem;
    display:grid;
    grid-template-columns: 170px auto;
    grid-template-rows: auto auto;
    grid-gap: 20px;
    align-items: center;
    grid-template-areas:
      "icon name"
      "icon links";
    @media (max-width: 800px) {
      width: 90%;
      grid-gap: 10px;
      
      grid-template-columns: 140px auto;
    } 

    @media (max-width: 540px) {
      grid-template-columns: 75px auto;
    } 
  `,
  SpeakerAvatar: styled.img`
    width: 100%;
    grid-area: icon;
    border-radius: 20px;
    @media (max-width: 800px) {
      border-radius: 14px;
    } 
    @media (max-width: 540px) {
      border-radius: 8px;
    } 
  `,
  SpeakerName: styled.div`
    grid-area: name;
    align-self: center;
    font-size: 3rem;
    padding-left: 2rem;
    align-self: end;

    @media (max-width: 800px) {
      font-size: 2rem;
    } 

    @media (max-width: 540px) {
      font-size: 1.25rem;
    } 
  `,
  SpeakerLinks: styled.div`
    grid-area: links;
    font-size: 1.5rem;
    padding-left: 2rem;
    justify-self: start;
    align-self: start;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: start;
    grid-gap: 5px;

    @media (max-width: 800px) {
      font-size: 1.25rem;
    } 

    @media (max-width: 540px) {
      font-size: 1rem;
    } 
  `,
  SpeakerLink: styled.div`
    transition: all 0.4s ease;

    > a {
      color: #818199;
      transition: all 0.4s ease;     
    }

    :hover {
      transform: scale(1.45);
      > a {
        color: ${props => props.color};
      }
    }
    `,
  Icon: styled.i`
    font-size: inherit;
    color: inherit;
    vertical-align: middle;
    margin-right: 8px;
  `

}

const SpeakerInfo = ({ speaker }) => (
  <Styled.SpeakerInfo>
    <Styled.SpeakerAvatar
      src={`https://avatars.io/twitter/${speaker.twitterUsername}`}
      alt={`Twitter Avatar of ${speaker.name}`} />
    <Styled.SpeakerName>
      {speaker.name}
    </Styled.SpeakerName>
    <Styled.SpeakerLinks>

      {
        speaker.twitterUsername &&
        <Styled.SpeakerLink color="#1DA1F2">
          <a href={`https://twitter.com/${speaker.twitterUsername}`}>
            <Styled.Icon className="icon-twitter"/>
          </a>
        </Styled.SpeakerLink>
      }

      {
        speaker.github &&
        <Styled.SpeakerLink color="#333">
          <a href={`https://github.com/${speaker.github}`}>
            <Styled.Icon className="icon-github"/>
          </a>
        </Styled.SpeakerLink>
      }

      {
        (speaker.website || speaker.blog) &&
        <Styled.SpeakerLink color="#3273dc">
          <a href={`${speaker.website || speaker.blog}`}>
            <Styled.Icon className="icon-link"/>
          </a>
        </Styled.SpeakerLink>
      }

    </Styled.SpeakerLinks>

  </Styled.SpeakerInfo>
)

SpeakerInfo.propTypes = {
  speaker: shape({
    name: string,
    twitterUsername: string,
    github: string,
    website: string,
    blog: string
  }).isRequired
}

export default SpeakerInfo
