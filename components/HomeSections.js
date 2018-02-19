import React from 'react'
import { array, object } from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'
import VideoSection from './sections/VideoSection'
import ConferenceSection from './sections/ConferenceSection'
import SpeakerSection from './sections/SpeakerSection'
import TagSection from './sections/TagSection'


const Styled = {
  Container: styled.div`
    width: 80%;
    margin: 2rem auto 0px;
    padding-bottom: 2rem;

    @media(max-width: 640px) {
      width: 95%;
    }
  `,
  SectionContainer: styled.div`
    margin: 3rem 0 4rem;
  `,
  Header: styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    grid-gap: 10px;

  `,
  Heading: styled.div`
    justify-self: start;
    font-size: 1.20rem;
    font-weight: 700;
    color: #555;
    margin: 1rem 0;
    text-transform: uppercase;
    @media(min-width: 1440px) {
      font-size: 1.30rem;
    }
    @media(min-width: 1720px) {
      font-size: 1.45rem;
    }
    @media(min-width: 1920px) {
      font-size: 1.50rem;
    }
    @media(min-width: 2200px) {
      font-size: 1.75rem;
    }
    @media(max-width: 480px) {
      font-size: 1rem;
    }
  `,
  BrowseButton: styled.div`
    justify-self: end;

    button.button {
      text-transform: uppercase;
      font-weight: 700;
    }
    @media(max-width: 480px) {
      button.button {
        font-size: 0.80rem;
      }
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
        {
          section.showBrowseAll &&
            <BrowseAllLink type={section.type}>
              <button className="button is-link"> Browse All  &gt; </button>
            </BrowseAllLink>
        }
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
    {
      section.type === 'Speaker' &&
      <SpeakerSection speakers={section.items} />
    }
    {
      section.type === 'Technology' &&
      <TagSection tags={section.items} />
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
