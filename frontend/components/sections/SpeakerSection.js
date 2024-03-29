import React from 'react'
import { array, string, number } from 'prop-types'
import Link from 'next/link'
import { textToSlug, getSpeakerAvatar } from '../../lib/utils'
import Styled from './StyledSection'


const Speaker = ({ _id, name, twitterUsername, avatar }) => (
  <Link
    href={`/speaker?id=${_id}`}
    as={`/speaker/${_id}/${textToSlug(`${name}`)}`}>
    <Styled.Item title={`Watch ${name}'s talks`}>
      <Styled.Image src={getSpeakerAvatar({ twitterUsername, avatar })} padding={0}/>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Sub>@{twitterUsername}</Styled.Sub>
    </Styled.Item>
  </Link>
)

Speaker.propTypes = {
  _id: string.isRequired,
  name: string.isRequired,
  twitterUsername: string.isRequired,
  avatar: string
}

const SpeakerSection = ({ speakers, multiple }) => {
  const visibleSpeaker = speakers.slice(0, Math.floor(speakers.length / multiple) * multiple)
  return (
    <Styled.Section>
      {
        visibleSpeaker.map(speaker => (
          <Speaker {...speaker} key={speaker._id}/>
        ))
      }
    </Styled.Section>
  )
}

SpeakerSection.propTypes = {
  speakers: array,
  multiple: number
}

SpeakerSection.defaultProps = {
  speakers: [],
  multiple: 4
}
export default SpeakerSection
