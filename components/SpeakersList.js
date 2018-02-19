import React from 'react'
import styled from 'styled-components'
import { array } from 'prop-types'
import SpeakerSection from './sections/SpeakerSection'

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
const SpeakersList = ({ speakers }) => (
  <Styled.Container>
    <SpeakerSection speakers={speakers} multiple={1}/>
  </Styled.Container>
)

SpeakersList.propTypes = {
  speakers: array
}

SpeakersList.defaultProps = {
  speakers: []
}


export default SpeakersList
