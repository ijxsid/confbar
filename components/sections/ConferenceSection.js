import React from 'react'
import { array, string, number } from 'prop-types'
import Link from 'next/link'
import { textToSlug } from '../../lib/utils'
import Styled from './StyledSection'

const Conference = ({ _id, name, logo, year }) => (
  <Link
    href={`/conference?id=${_id}`}
    as={`/conference/${_id}/${textToSlug(`${name} ${year}`)}`}>
    <Styled.Item title={`Watch ${name} - ${year}`}>
      <Styled.Image src={logo}/>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Sub>{year}</Styled.Sub>
    </Styled.Item>
  </Link>
)

Conference.propTypes = {
  _id: string.isRequired,
  name: string.isRequired,
  logo: string.isRequired,
  year: number.isRequired
}

const ConferenceSection = ({ confs, multiple }) => {
  const visibleConfs = confs.slice(0, Math.floor(confs.length / 4) * 4)
  return (
    <Styled.Section>
      {
        visibleConfs.map(conf => (
          <Conference {...conf} key={conf._id}/>
        ))
      }
    </Styled.Section>
  )
}

ConferenceSection.propTypes = {
  confs: array,
  multiple: number
}
ConferenceSection.defaultProps = {
  confs: [],
  multiple: 4
}
export default ConferenceSection
