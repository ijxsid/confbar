import React from 'react'
import styled from 'styled-components'
import { array } from 'prop-types'
import TagSection from './sections/TagSection'

const Styled = {
  Container: styled.div`
    width: 100%;
  `,
  ListContainer: styled.div`
    width: 80%;
    margin: 2rem auto 0px;
    padding-bottom: 2rem;
    padding-top: 2rem;

    @media(max-width: 640px) {
      width: 95%;
    }
  `,
  Header: styled.div`
    width: 100%;
    background-image: url('/static/images/bg-memphis-colorful.png');
    padding: 3rem 10%;
    font-size: 5rem;
    font-weight: 700; 
  `,
  Sub: styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: #666;
  `
}
const TagsList = ({ tags }) => (
  <Styled.Container>
    <Styled.Header>
      Technologies
      <Styled.Sub>
        At Confbar
      </Styled.Sub>
    </Styled.Header>
    <Styled.ListContainer>
      <TagSection tags={tags} multiple={1}/>
    </Styled.ListContainer>
  </Styled.Container>
)

TagsList.propTypes = {
  tags: array
}

TagsList.defaultProps = {
  tags: []
}


export default TagsList
