import React from 'react'
import styled from 'styled-components'
import { shape, string } from 'prop-types'

const Styled = {
  SpeakerInfo: styled.div`
    width: 75%;
    max-width: 850px;
    min-width: 450px;
    margin: 2.5rem auto 1rem;
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 20px;
    grid-template-areas:
      "icon name"
      "icon links";
  `,
  SpeakerAvatar: styled.img`
    width: 100%;
    grid-area: icon;
    border-radius: 20px;
  `,
  SpeakerName: styled.div`
    grid-area: name;
    align-self: center;
    font-size: 2.5rem;
    padding-left: 2rem;
    align-self: end;
  `,
  SpeakerLinks: styled.div`
    grid-area: links;
    font-size: 1.5rem;
    padding-left: 2rem;
    justify-self: start;
    align-self: start;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 40%;
    justify-items: start;
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
        <Styled.SpeakerLink color="#818199">
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
