import React from 'react'
import styled from 'styled-components'
import { shape, string } from 'prop-types'
import { getImage } from '../lib/utils'

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
    
    @media (max-width: 640px) {
      width: 95%;
      max-width: 480px;
      min-width: unset;
      grid-template-columns: 80px 1fr;
      grid-template-rows: 2fr auto auto auto;
    }
    
    @media (max-width: 500px) {
      grid-gap: 5px;
    }
  `,
  Logo: styled.img`
    width: 100%;
    grid-area: icon;
    border-radius: 20px;
    @media (max-width: 640px) {
      aligng-self: center;
    }
  `,
  Name: styled.div`
    grid-area: name;
    align-self: center;
    font-size: 4rem;
    padding-left: 2rem;
    align-self: end;
    @media (max-width: 1024px) {
      font-size: 3.0rem;
    }

    @media (max-width: 640px) {
      padding-left: 1rem;
      font-size: 2rem;
      font-weight: 600;
    }

    @media (max-width: 500px) {
      font-size: 1.75rem;
      font-weight: 400;
    }
  `,
  Description: styled.div`
    grid-area: description;
    padding-left: 2rem;
    font-size: 0.90rem;
    @media (min-width: 1720px) {
      font-size: 1.5rem;
    }
    @media (max-width: 640px) {
      padding-left: 1rem;
      font-size: 0.95rem;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
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
    @media (max-width: 800px) {
      font-size: 1.25rem;
    } 
    @media (max-width: 640px) {
      padding-left: 1rem;
    }
    @media (max-width: 540px) {
      font-size: 1rem;
    }
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
        src={getImage(tag.logo)}
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
