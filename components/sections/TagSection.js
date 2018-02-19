import React from 'react'
import { array, string } from 'prop-types'
import Link from 'next/link'
import { textToSlug } from '../../lib/utils'
import Styled from './StyledSection'

const Tag = ({ _id, name, logo, description }) => (
  <Link
    href={`/tag?id=${_id}`}
    as={`/tag/${_id}/${textToSlug(`${name}`)}`}>
    <Styled.Item title={`Watch ${name} talks`}>
      <Styled.Image src={logo}/>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Sub>{description}</Styled.Sub>
    </Styled.Item>
  </Link>
)

Tag.propTypes = {
  _id: string.isRequired,
  name: string.isRequired,
  logo: string,
  description: string
}

const TagSection = ({ tags }) => (
  <Styled.Section>
    {
      tags.slice(0, Math.floor(tags.length / 4) * 4).map(tag => (
        <Tag {...tag} key={tag._id}/>
      ))
    }
  </Styled.Section>
)

TagSection.propTypes = {
  tags: array
}

TagSection.defaultProps = {
  tags: []
}
export default TagSection
