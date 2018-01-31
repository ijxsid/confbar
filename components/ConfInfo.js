import React from 'react'
import styled from 'styled-components'
import simpleDate from '../lib/simpleDate'
import { shape, string, number } from 'prop-types'

const Styled = {
  ConfInfo: styled.div`
    width: 75%;
    max-width: 850px;
    min-width: 450px;
    margin: 2.5rem auto 1rem;
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 2fr repeat(3, 2rem);
    grid-template-areas:
      "icon name"
      "year dates"
      "year location"
      ". url";
  `,
  ConfImage: styled.img`
    width: 100%;
    grid-area: icon;
  `,
  ConfName: styled.div`
    grid-area: name;
    align-self: center;
    font-size: 5rem;
    padding-left: 2rem;
  `,
  ConfYear: styled.div`
    grid-area: year;
    font-size: 2rem;
    justify-self: center;
  `,
  ConfDates: styled.div`
    grid-area: dates;
    padding-left: 2rem;
    font-size: 1rem;
  `,
  ConfLocation: styled.div`
    grid-area: location;
    padding-left: 2rem;
    font-size: 1rem;
  `,
  Icon: styled.i`
    font-size: 0.90rem;
    color: #818199;
    vertical-align: middle;
    margin-right: 8px;
  `,
  ConfUrl: styled.div`
    grid-area: url;
    padding-left: 2rem;
    font-size: 1rem;
  `
}

const ConfInfo = ({ conference }) => (
  <Styled.ConfInfo>
    <Styled.ConfImage src={conference.logo} alt={`logo of ${conference.name}`} />
    <Styled.ConfName>
      {conference.name}
    </Styled.ConfName>
    <Styled.ConfYear>
      {conference.year}
    </Styled.ConfYear>
    <Styled.ConfDates>
      <Styled.Icon className="icon-calendar"/>
      {simpleDate(conference.startDate)} to {simpleDate(conference.endDate)}
    </Styled.ConfDates>
    <Styled.ConfLocation>
      <Styled.Icon className="icon-location"/>{conference.location}
    </Styled.ConfLocation>
    <Styled.ConfUrl>
      <Styled.Icon className="icon-link" /><a href={conference.url}>{conference.url}</a>
    </Styled.ConfUrl>
  </Styled.ConfInfo>
)

ConfInfo.propTypes = {
  conference: shape({
    name: string,
    logo: string,
    year: number,
    startDate: string,
    endDate: string,
    location: string,
    url: string
  }).isRequired
}

export default ConfInfo
