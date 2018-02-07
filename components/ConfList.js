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
    max-width: 960px;
    min-width: 200px;
    margin: 0 auto;
    padding: 1.5rem 0;

    @media (min-width: 1720px) {
      max-width: unset;
      width: 75%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      grid-gap: 25px;
    }

    @media (max-width: 800px) {
      width: 95%;
      margin: 0 auto;
    }

  `,
  Item: styled.div`
    display: grid;
    grid-template-columns:  1fr 3fr;
    grid-template-rows: auto;
    grid-template-areas:
      "sideimage title"
      "sideimage info"
      "sideimage footer";
    margin: 20px 0;
    box-shadow: 0px 0px 12px 8px rgba(170, 170, 190, 0.15);
    background: white;
    :hover {
      box-shadow: 0px 0px 20px 15px rgba(170, 170, 190, 0.1);
    }
    
    @media (min-width: 1720px) {
      grid-template-columns: 100%;
      grid-template-areas:
      "title"
      "sideimage"
      "info"
      "footer";
      margin: 20px 25px;
    }
    @media (max-width: 960px) {
      grid-template-columns: 33% 67%;
    }

    @media (max-width: 560px) {
      grid-template-columns: 40% 60%;
    }
    @media (max-width: 480px) {
      grid-template-columns: 100%;
      grid-template-areas:
      "title"
      "sideimage"
      "info"
      "footer";
      min-width: 280px;
      width: 90%;
      margin: 20px auto;
    }
  `,
  Title: styled.div`
    grid-area: title;
    padding: 0.75rem 1.5rem;
    font-weight: 700;
    font-size: 1.4rem;

    @media (min-width: 1720px) {
      a {
        color: inherit;
      }
      a:hover {
        color: #e2e2e2;
      }
      text-align: center;
      font-size: 1.45rem;
      align-self: start;
      color: #fff;
      background-color: #3273dc;
    }


    @media (max-width: 480px) {
      a {
        color: inherit;
      }
      text-align: center;
      align-self: start;
      font-size: 1.15rem;
      color: #f0f0f0;
      background-color: #3273dc;
    }


  `,
  Logo: styled.img`
    grid-area: sideimage;
    min-height: 200px;
    margin: 0 auto;
    align-self: center;

    @media (min-width: 1720px) {
      height: 360px;
      margin: 0 auto;
      padding: 10px 20px;
    }

    @media (max-width: 480px) {
      height: 150px;
      margin: 0 auto;
      padding: 10px 20px;
    }


  `,
  Info: styled.div`
    grid-area: info;
    padding: 0.75rem 1.5rem;
    align-self: middle;

    @media (min-width: 1720px) {
      font-size: 1.3rem;
      align-self: top;
      padding: 1.5rem 1.5rem;
    }
  `,
  Icon: styled.i`
    ${StyledIcon}
    font-size: 0.80em;
    color: #818199;
    @media (max-width: 480px) {
      color: #333;
    }
  `,
  ConfLink: styled.a`
    @media (min-width: 1720px) {
      word-break: break-all;
    }
    @media (max-width: 800px) {
      word-break: break-all;
    }
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
    @media (min-width: 1720px) {
      font-size: 1.3rem;
    }
  `,
  FooterIcon: styled.i`
    ${StyledIcon}
  `
}

const Conference = ({ conf }) => (
  <Styled.Item>
    <Styled.Logo src={conf.logo} />
    <Styled.Title>
      <Link href={`/conference?id=${conf._id}`} as={`/conference/${conf._id}`}>
        <a>{conf.name} - {conf.year}</a>
      </Link>
    </Styled.Title>
    <Styled.Info>
      <div><Styled.Icon className="icon-location" /> {conf.location}</div>
      <div>
        <Styled.Icon className="icon-calendar" />{` `}
        {simpleDate(conf.startDate)} to {simpleDate(conf.endDate)}
      </div>
      <div>
        <Styled.Icon className="icon-link" />{` `}
        <Styled.ConfLink href={conf.url}>{conf.url}</Styled.ConfLink>
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
