import React from 'react'
import styled from 'styled-components'
import simpleDate from '../lib/simpleDate'
import Link from 'next/link'
import { object, array } from 'prop-types'
import { getFullLink } from '../lib/utils'
import StyledIcon from './styled/Icon'

const Styled = {
  Container: styled.div` 
    width: 75%;
    max-width: 850px;
    min-width: 450px;
    margin: 0 auto;
    padding: 15px 0;
  `,
  Item: styled.div`
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
  `,
  Logo: styled.img`
    grid-area: sideimage;
    min-height: 200px;
  `,
  Info: styled.div`
    grid-area: info;
    padding: 10px 20px;
  `,
  Icon: styled.i`
    ${StyledIcon}
    font-size: 0.80em;
    color: #818199;
  `,
  Footer: styled.div`
    grid-area: footer;
    background-color: #FFFFD3;
    align-self: end;
    padding: 7px 20px;
    font-weight: 600;
    color: #E20049;

    a {
      color: #E20049;
    }

    a:hover {
      color: #3273dc;
    }
  `,
  FooterIcon: styled.i`
    ${StyledIcon}
  `
}

const Conference = ({ conf }) => (
  <Styled.Item>
    <Styled.Logo src={conf.logo} />
    <Styled.Info>
      <div className="title is-4">
        <Link href={`/conference?id=${conf._id}`} as={`/conference/${conf._id}`}>
          <a>{conf.name} - {conf.year}</a>
        </Link>
      </div>
      <div><Styled.Icon className="icon-location" /> {conf.location}</div>
      <div>
        <Styled.Icon className="icon-calendar" />{` `}
        {simpleDate(conf.startDate)} to {simpleDate(conf.endDate)}
      </div>
      <div>
        <Styled.Icon className="icon-link" />{` `}
        <a href={conf.url}>{conf.url}</a>
      </div>
    </Styled.Info>
    <Styled.Footer>
      <div>
        <span>Share on: </span>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${getFullLink('conference', conf)}`}>
          <Styled.FooterIcon className="icon-facebook"/>
        </a>
        <a href={`https://twitter.com/home?status=Watch '${conf.name} - ${conf.year}' on Confbar: ${getFullLink('conference', conf)}`}>
          <Styled.FooterIcon className="icon-twitter"/>
        </a>
      </div>
    </Styled.Footer>
  </Styled.Item>
)

Conference.propTypes = {
  conf: object.isRequired
}

const ConfList = ({ conferences }) => (
  <Styled.Container>
    {conferences.map(c => <Conference conf={c} key={c._id} />) }
  </Styled.Container>
)

ConfList.propTypes = {
  conferences: array
}

export default ConfList
