import React from 'react'
import { array, object } from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'
import VideoSection from './sections/VideoSection'
import ConferenceSection from './sections/ConferenceSection'


const Styled = {
  Container: styled.div`
    width: 80%;
    margin: 2rem auto;
  `,
  SectionContainer: styled.div`
    margin: 3rem 0 4rem;
  `,
  Header: styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
  `,
  Heading: styled.div`
    justify-self: start;
    font-size: 1.20rem;
    font-weight: 700;
    color: #555;
    margin: 1rem 0;
    text-transform: uppercase;
  `,
  BrowseButton: styled.div`
    justify-self: end;

    button.button {
      text-transform: uppercase;
      font-weight: 700;
    }
  `
}

const BrowseAllLink = ({ type, children }) => {
  switch (type) {
  case 'Video':
    return <Link href="/videos"><a> {children} </a></Link>
  case 'Conference':
    return <Link href="/conferences"><a>{children}</a></Link>
  case 'Speaker':
    return <Link href="/speakers"><a>{children}</a></Link>
  case 'Technology':
    return <Link href="/tags"><a>{children}</a></Link>
  default:
    return null
  }
}

const Section = ({ section }) => (
  <Styled.SectionContainer>
    <Styled.Header>
      <Styled.Heading> {section.heading} </Styled.Heading>
      <Styled.BrowseButton>
        <BrowseAllLink type={section.type}>
          <button className="button is-link"> Browse All &gt; </button>
        </BrowseAllLink>
      </Styled.BrowseButton>
    </Styled.Header>
    {
      section.type === 'Video' &&
      <VideoSection videos={section.items} />
    }
    {
      section.type === 'Conference' &&
      <ConferenceSection confs={section.items} />
    }
  </Styled.SectionContainer>
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
