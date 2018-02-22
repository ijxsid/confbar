import React from 'react'
import styled from 'styled-components'
import simpleDate from '../lib/simpleDate'
import { getImage } from '../lib/utils'
import { shape, string, number } from 'prop-types'

const Styled = {
  ConfInfo: styled.div`
    width: 75%;
    max-width: 850px;
    min-width: 250px;
    margin: 2.5rem auto 1rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 2fr repeat(3, 2rem);
    grid-template-areas:
      "icon name"
      "year dates"
      "year location"
      ". url";
    @media (min-width: 1720px) {
      grid-template-rows: 2fr repeat(3, 3rem);

    }
    @media (max-width: 640px) {
      width: 95%;
      max-width: 480px;
      grid-template-columns: 80px 1fr;
      grid-template-rows: 2fr auto auto auto;
    }
    @media (max-width: 500px) {
      grid-gap: 5px;
    }
  `,
  ConfImage: styled.img`
    width: 100%;
    grid-area: icon;
    align-self: center;
  `,
  ConfName: styled.div`
    grid-area: name;
    align-self: center;
    font-size: 5rem;
    padding-left: 2rem;

    @media (max-width: 1024px) {
      font-size: 3.0rem;
    }

    @media (max-width: 640px) {
      padding-left: 1rem;
      font-size: 2rem;
      font-weight: 600;
    }

    @media (max-width: 500px) {
      font-size: 1.75rem;
      font-weight: 400;
    }
  `,
  ConfYear: styled.div`
    grid-area: year;
    font-size: 2rem;
    justify-self: center;
    @media (max-width: 1024px) {
      font-size: 1.5rem;
    }

    @media (max-width: 640px) {
      font-size: 1.2rem;
    }

    @media (max-width: 500px) {
      font-size: 1rem;
    }

  `,
  ConfDates: styled.div`
    grid-area: dates;
    padding-left: 2rem;
    font-size: 1rem;

    @media (min-width: 1720px) {
      font-size: 1.5rem;
    }
    @media (max-width: 640px) {
      padding-left: 1rem;
      font-size: 0.95rem;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }

  `,
  ConfLocation: styled.div`
    grid-area: location;
    padding-left: 2rem;
    font-size: 1rem;
    @media (min-width: 1720px) {
      font-size: 1.5rem;
    }
    @media (max-width: 640px) {
      font-size: 0.95rem;
      padding-left: 1rem;
      
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  `,
  Icon: styled.i`
    font-size: 0.90rem;
    color: #818199;
    vertical-align: middle;
    margin-right: 8px;
    @media (max-width: 640px) {
      font-size: 0.8rem;
    }
  `,
  ConfUrl: styled.div`
    grid-area: url;
    padding-left: 2rem;
    font-size: 1rem;
    
    @media (min-width: 1720px) {
      font-size: 1.5rem;
    }

    @media (max-width: 640px) {
      font-size: 0.95rem;
      padding-left: 1rem;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  `
}

const ConfInfo = ({ conference }) => (
  <Styled.ConfInfo>
    <Styled.ConfImage src={getImage(conference.logo)} alt={`logo of ${conference.name}`} />
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
