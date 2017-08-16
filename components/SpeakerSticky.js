import React from 'react'
import styled from 'styled-components'
import { object } from 'prop-types'
import Link from 'next/link'

const SpeakerStickyStyled = styled.span`
  display: inline-block;
  background-color: rgba(253, 190, 52, 0.1);
  color: rgb(253, 190, 52);
  padding: 4px 8px;
  display: inline-block;
  >* {
    color: rgb(253, 190, 52);
  }
`

const SpeakerStickyPad = styled.span`
  display: inline-block;
  height: auto;
  font-size: 1.2em;
  padding-top: 0.2em;
  padding-left: 4px;
  padding-right: 4px;
  background-color: rgba(253, 190, 52, 0.5);
`

const SpeakerStickyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0px;
`
const SpeakerSticky = ({ speaker }) => (
  <SpeakerStickyContainer>
    <SpeakerStickyPad > <i className="icon-microphone" /> </SpeakerStickyPad>
    <SpeakerStickyStyled>
      <Link href={`/speaker?id=${speaker._id}`}>
        <a>{speaker.name}</a>
      </Link>
    </SpeakerStickyStyled>
    <SpeakerStickyPad >
      <a href={`https://twitter.com/${speaker.twitterUsername}`}>
        <i className="icon-twitter" />
      </a>
    </SpeakerStickyPad>
    <SpeakerStickyPad >
      <a href={`https://github.com/${speaker.github}`}>
        <i className="icon-github" />
      </a>
    </SpeakerStickyPad>
    <SpeakerStickyPad >
      <a href={`${speaker.website}`}>
        <i className="icon-link" />
      </a>
    </SpeakerStickyPad>
  </SpeakerStickyContainer>
)

SpeakerSticky.propTypes = {
  speaker: object
}


export default SpeakerSticky
