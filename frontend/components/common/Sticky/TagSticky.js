import React from 'react'
import styled from 'styled-components'
import { array, object } from 'prop-types'
import Link from 'next/link'
import { textToSlug } from '../../../lib/utils'

const SpeakerStickyStyled = styled.span`
  display: inline-block;
  background-color: rgba(126, 203, 177, 0.1);
  padding: 4px 8px;
  >* {
    margin-right: 5px;
  }
`

const SpeakerStickyPad = styled.span`
  display: inline-block;
  height: auto;
  font-size: 1.2em;
  padding-top: 0.3em;
  padding-left: 4px;
  padding-right: 4px;
  background-color: rgba(126, 203, 177, 0.8);

`

const SpeakerStickyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0px;
`


const Tag = ({ tag }) => (
  <Link
    href={`/technology?id=${tag._id}`}
    as={`/technology/${tag._id}/${textToSlug(tag.name)}`}>
    <a><span className="tag is-primary">{tag.name}</span></a>
  </Link>
)

Tag.propTypes = {
  tag: object
}


const TagsSticky = ({ tags }) => (
  <SpeakerStickyContainer>
    <SpeakerStickyPad > <i className="icon-tag" /> </SpeakerStickyPad>
    <SpeakerStickyStyled>
      {
        tags.map(t => (
          <Tag tag={t} key={t._id} />
        ))
      }
    </SpeakerStickyStyled>
  </SpeakerStickyContainer>
)

TagsSticky.propTypes = {
  tags: array
}


export default TagsSticky
