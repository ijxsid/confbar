import React from 'react'
import { array, string, number } from 'prop-types'
import Link from 'next/link'
import { textToSlug, getImage } from '../../lib/utils'
import Styled from './StyledSection'

const Tag = ({ _id, name, logo, description }) => (
  <Link
    href={`/technology?id=${_id}`}
    as={`/technology/${_id}/${textToSlug(`${name}`)}`}>
    <Styled.Item title={`Watch ${name} talks`}>
      <Styled.Image src={getImage(logo)}/>
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

const TagSection = ({ tags, multiple }) => {
  const visibleTags = tags.slice(0, Math.floor(tags.length / multiple) * multiple)
  return (
    <Styled.Section>
      {
        visibleTags.map(tag => (
          <Tag {...tag} key={tag._id}/>
        ))
      }
    </Styled.Section>
  )
}

TagSection.propTypes = {
  tags: array,
  multiple: number
}

TagSection.defaultProps = {
  tags: [],
  multiple: 4
}
export default TagSection
