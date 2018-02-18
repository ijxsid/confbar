import React from 'react'
import styled from 'styled-components'
import { array, string } from 'prop-types'
import Link from 'next/link'
import { textToSlug } from '../../lib/utils'
import StyledIcon from '../styled/Icon'

const Styled = {
  Section: styled.div`
    display: grid;
    grid-template-columns: repeat(4, calc(25% - 26.25px));
    justify-items: center;
    grid-gap: 35px;
  `,
  Speaker: styled.a`
    display: grid;
    width: 100%;
    grid-template-rows: 180px auto auto;
    background-color: #fff;
    border-radius: 2px;
    grid-template-areas:
      "image"
      "name"
      "twitter";
    box-shadow: 2px 4px 8px rgba(50,50,50,0.15), 1px 3px 6px rgba(50,50,50,0.18);

    :hover {
      box-shadow: 2px 8px 14px rgba(50,50,50,0.18), 1px 5px 9px rgba(50,50,50,0.20);  
    }
  `,
  Image: styled.img`
    display: block;
    grid-area: image;
    height: 180px;
    margin: 0 auto;
  `,
  Name: styled.div`
    font-size: 1.40rem;
    padding: 0.5rem 1rem 0rem;
    grid-area: name;
    font-weight: 700;
    color: #666;
  `,
  Twitter: styled.div`
    grid-area: twitter;
    padding: 0rem 1rem 2rem;
    font-weight: 700;
    font-size: 1.05rem;
    color: #878787;
  `,
  Icon: styled.i`
    ${StyledIcon}
  `
}

const Speaker = ({ _id, name, twitterUsername }) => (
  <Link
    href={`/speaker?id=${_id}`}
    as={`/speaker/${_id}/${textToSlug(`${name}`)}`}>
    <Styled.Speaker title={`Watch ${name}'s talks`}>
      <Styled.Image src={`https://avatars.io/twitter/${twitterUsername}`}/>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Twitter>@{twitterUsername}</Styled.Twitter>
    </Styled.Speaker>
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
