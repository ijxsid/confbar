import React from 'react'
import styled from 'styled-components'
import { shape, string } from 'prop-types'

const tagInfoAreas = props => {
  if (props.simpleLayout && props.noDescription) {
    return `
      "name name"
      "links links"
      ". ."
    `
  } else if (props.simpleLayout) {
    return `
      "name name"
      "description description"
      "links links"
    `
  } else {
    return `
      "icon name"
      "icon description"
      "icon links"
    `
  }
}

const Styled = {
  TagInfo: styled.div`
    width: 75%;
    max-width: 850px;
    min-width: 450px;
    margin: 2.5rem auto 1rem;
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 2fr auto auto;
    grid-gap: 5px;
    justify-content: center;
    grid-template-areas: ${tagInfoAreas};
  `,
  Logo: styled.img`
    width: 100%;
    grid-area: icon;
    border-radius: 20px;
  `,
  Name: styled.div`
    grid-area: name;
    align-self: center;
    font-size: 4rem;
    padding-left: 2rem;
    align-self: end;
  `,
  Description: styled.div`
    grid-area: description;
    padding-left: 2rem;
    font-size: 0.90rem;
  `,
  Links: styled.div`
    grid-area: links;
    font-size: 1.5rem;
    padding-left: 2rem;
    justify-self: start;
    align-self: start;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: start;
    grid-gap: 5px;
  `,
  Link: styled.div`
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

const TagInfo = ({ tag }) => (
  <Styled.TagInfo simpleLayout={!tag.logo} noDescription={!tag.description}>
    {
      tag.logo &&
      <Styled.Logo
        src={`${tag.logo}`}
        alt={`Logo for ${tag.name}`} />
    }

    <Styled.Name>
      {tag.name}
    </Styled.Name>

    {
      tag.description &&
      <Styled.Description>
        {tag.description}
      </Styled.Description>
    }

    <Styled.Links>

      {
        tag.twitter &&
        <Styled.Link color="#1DA1F2">
          <a href={`https://twitter.com/${tag.twitter}`}>
            <Styled.Icon className="icon-twitter"/>
          </a>
        </Styled.Link>
      }

      {
        tag.repo &&
        <Styled.Link color="#333">
          <a href={`${tag.repo}`}>
            <Styled.Icon className="icon-github"/>
          </a>
        </Styled.Link>
      }

      {
        (tag.website || tag.blog) &&
        <Styled.Link color="#818199">
          <a href={`${tag.website || tag.blog}`}>
            <Styled.Icon className="icon-link"/>
          </a>
        </Styled.Link>
      }

    </Styled.Links>

  </Styled.TagInfo>
)

TagInfo.propTypes = {
  tag: shape({
    name: string,
    twitter: string,
    repo: string,
    website: string,
    blog: string
  }).isRequired
}

export default TagInfo
