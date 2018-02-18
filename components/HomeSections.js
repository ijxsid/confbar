import React from 'react'
import { array, object } from 'prop-types'
import styled from 'styled-components'
import VideoSection from './sections/VideoSection'


const Styled = {
  Container: styled.div`
    width: 80%;
    margin: 2rem auto;
  `,
  SectionHeading: styled.div`
    font-size: 1.20rem;
    font-weight: 700;
    color: #555;
    margin: 1rem 0;
    text-transform: uppercase;
  `
}

const Section = ({ section }) => (
  <div>
    <Styled.SectionHeading>
      {section.heading}
    </Styled.SectionHeading>
    {
      section.type === 'Video' &&
      <VideoSection videos={section.items} />
    }
  </div>
)

Section.propTypes = {
  section: object.isRequired
}


const HomeSections = ({ sections }) => (
  <Styled.Container>
    {
      sections.map((section) =>
        <Section key={section._id} section={section} />
      )
    }
  </Styled.Container>
)


HomeSections.propTypes = {
  sections: array
}


HomeSections.defaultProps = {
  sections: []
}


export default HomeSections
