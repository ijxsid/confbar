import React from 'react'
import styled from 'styled-components'
import { array, string, number } from 'prop-types'
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
  Conference: styled.a`
    display: grid;
    width: 100%;
    grid-template-rows: 180px auto auto;
    background-color: #fff;
    border-radius: 2px;
    grid-template-areas:
      "logo"
      "name"
      "year";
    box-shadow: 2px 4px 8px rgba(50,50,50,0.15), 1px 3px 6px rgba(50,50,50,0.18);

    :hover {
      box-shadow: 2px 8px 14px rgba(50,50,50,0.18), 1px 5px 9px rgba(50,50,50,0.20);  
    }
  `,
  Logo: styled.img`
    display: block;
    grid-area: logo;
    padding: 5px;
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
  Year: styled.div`
    grid-area: year;
    padding: 0rem 1rem 2rem;
    font-weight: 700;
    font-size: 1.05rem;
    color: #878787;
  `,
  Icon: styled.i`
    ${StyledIcon}
  `
}

const Conference = ({ _id, name, logo, year }) => (
  <Link
    href={`/conference?id=${_id}`}
    as={`/conference/${_id}/${textToSlug(`${name} ${year}`)}`}>
    <Styled.Conference title={`Watch ${name} - ${year}`}>
      <Styled.Logo src={logo}/>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Year>{year}</Styled.Year>
    </Styled.Conference>
  </Link>
)

Conference.propTypes = {
  _id: string.isRequired,
  name: string.isRequired,
  logo: string.isRequired,
  year: number.isRequired
}

const ConferenceSection = ({ confs }) => (
  <Styled.Section>
    {
      confs.slice(0, Math.floor(confs.length / 4) * 4).map(conf => (
        <Conference {...conf} key={conf._id}/>
      ))
    }
  </Styled.Section>
)

ConferenceSection.propTypes = {
  confs: array
}
export default ConferenceSection
