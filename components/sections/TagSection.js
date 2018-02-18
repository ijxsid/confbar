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
  Tag: styled.a`
    display: grid;
    width: 100%;
    grid-template-rows: 180px auto auto;
    background-color: #fff;
    border-radius: 2px;
    grid-template-areas:
      "image"
      "name"
      "desc";
    box-shadow: 2px 4px 8px rgba(50,50,50,0.15), 1px 3px 6px rgba(50,50,50,0.18);

    :hover {
      box-shadow: 2px 8px 14px rgba(50,50,50,0.18), 1px 5px 9px rgba(50,50,50,0.20);  
    }
  `,
  Image: styled.img`
    display: block;
    grid-area: image;
    padding: 5px;
    height: 180px;
    margin: 0 auto;
  `,
  Name: styled.div`
    font-size: 1.40rem;
    padding: 1rem 1rem 0rem;
    grid-area: name;
    font-weight: 700;
    color: #666;
  `,
  Description: styled.div`
    grid-area: desc;
    padding: 0rem 1rem 2rem;
    font-weight: 700;
    font-size: 1.05rem;
    color: #878787;
  `,
  Icon: styled.i`
    ${StyledIcon}
  `
}

const Tag = ({ _id, name, logo, description }) => (
  <Link
    href={`/tag?id=${_id}`}
    as={`/tag/${_id}/${textToSlug(`${name}`)}`}>
    <Styled.Tag title={`Watch ${name} talks`}>
      <Styled.Image src={logo}/>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Description>{description}</Styled.Description>
    </Styled.Tag>
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
