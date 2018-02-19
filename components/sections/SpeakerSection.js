import React from 'react'
import { array, string } from 'prop-types'
import Link from 'next/link'
import { textToSlug } from '../../lib/utils'
import Styled from './StyledSection'


const Speaker = ({ _id, name, twitterUsername }) => (
  <Link
    href={`/speaker?id=${_id}`}
    as={`/speaker/${_id}/${textToSlug(`${name}`)}`}>
    <Styled.Item title={`Watch ${name}'s talks`}>
      <Styled.Image src={`https://avatars.io/twitter/${twitterUsername}`} padding={0}/>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Sub>@{twitterUsername}</Styled.Sub>
    </Styled.Item>
  </Link>
)

Speaker.propTypes = {
  _id: string.isRequired,
  name: string.isRequired,
  twitterUsername: string.isRequired
}

const SpeakerSection = ({ speakers }) => (
  <Styled.Section>
    {
      speakers.slice(0, Math.floor(speakers.length / 4) * 4).map(speaker => (
        <Speaker {...speaker} key={speaker._id}/>
      ))
    }
  </Styled.Section>
)

SpeakerSection.propTypes = {
  speakers: array
}

SpeakerSection.defaultProps = {
  speakers: []
}
export default SpeakerSection
