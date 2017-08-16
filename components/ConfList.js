import React from 'react'
import styled from 'styled-components'
import simpleDate from '../lib/simpleDate'
import Link from 'next/link'
import { object, array } from 'prop-types'

const ConfListContainer = styled.div`
  width: 75%;
  max-width: 850px;
  min-width: 450px;
  margin: 0 auto;
  padding: 15px 0;
`

const ConfContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;
  grid-template-areas:
    "sideimage info"
    "sideimage footer";
  margin: 20px 0;
  box-shadow: 0px 0px 12px 8px rgba(170, 170, 190, 0.15);
  background: white;
  :hover {
    box-shadow: 0px 0px 20px 15px rgba(170, 170, 190, 0.1);
  }
`

const ConfLogo = styled.img`
  grid-area: sideimage;
  min-height: 200px;
`

const ConfInfo = styled.div`
  grid-area: info;
  padding: 10px 20px;
`
const FontIconStyled = styled.i`
  font-size: 0.74em;
  color: #818199;
`
const ConfFooter = styled.div`
  grid-area: footer;
  background-color: #FFFFD3;
  align-self: end;
  padding: 7px 20px;
  font-weight: 600;
  color: #E20049;
`
const Conference = ({ conf }) => (
  <ConfContainer>
    <ConfLogo src={conf.logo} />
    <ConfInfo>
      <div className="title is-4">
        <Link href={`/conference?id=${conf._id}`}>
          <a>{conf.name} - {conf.year}</a>
        </Link>
      </div>
      <div><FontIconStyled className="icon-location" /> {conf.location}</div>
      <div>
        <FontIconStyled className="icon-calendar" />{` `}
        {simpleDate(conf.startDate)} to {simpleDate(conf.endDate)}
      </div>
      <div>
        <FontIconStyled className="icon-link" />{` `}
        <a href={conf.url}>{conf.url}</a>
      </div>
    </ConfInfo>
    <ConfFooter>
      <div>39 shares | 454 views | 8 Talks</div>

    </ConfFooter>
  </ConfContainer>
)

Conference.propTypes = {
  conf: object.isRequired
}

const ConfList = ({ conferences }) => (
  <ConfListContainer>
    {conferences.map(c => <Conference conf={c} key={c._id} />) }
  </ConfListContainer>
)

ConfList.propTypes = {
  conferences: array
}

export default ConfList
