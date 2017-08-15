import React from 'react'
import styled from 'styled-components'
import { object } from 'prop-types'
import Link from 'next/link'

const ConferenceStickyStyled = styled.span`
  display: inline-block;
  background-color: rgba(251, 86, 96, 0.2);
  color: rgb(251, 86, 96);
  padding: 4px 5px;
  display: inline-block;
  >* {
    color: rgb(251, 86, 96);
  }
`

const ConferenceStickyPad = styled.span`
  display: inline-block;
  width: 6px;
  height: auto;
  background-color: rgb(251, 86, 96);
`

const ConferenceStickyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0px;
`
const ConferenceSticky = ({ conference }) => (
  <ConferenceStickyContainer>
    <ConferenceStickyPad />
    <ConferenceStickyStyled>
      <Link href={`/conference?id=${conference._id}`}>
        {`${conference.name} ● ${conference.year}`}
      </Link>
    </ConferenceStickyStyled>
  </ConferenceStickyContainer>
)

ConferenceSticky.propTypes = {
  conference: object
}


export default ConferenceSticky
