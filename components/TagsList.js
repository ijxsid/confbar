import React from 'react'
import styled from 'styled-components'
import { array } from 'prop-types'
import TagSection from './sections/TagSection'

const Styled = {
  Container: styled.div`
    width: 80%;
    margin: 2rem auto 0px;
    padding-bottom: 2rem;

    @media(max-width: 640px) {
      width: 95%;
    }
  `
}
const TagsList = ({ tags }) => (
  <Styled.Container>
    <TagSection tags={tags} multiple={1}/>
  </Styled.Container>
)

TagsList.propTypes = {
  tags: array
}

TagsList.defaultProps = {
  tags: []
}


export default TagsList
