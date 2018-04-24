import React from 'react'
import styled from 'styled-components'
import simpleDate from '../lib/simpleDate'
import Link from 'next/link'
import { object, array } from 'prop-types'
import { getFullLink, textToSlug, getImage } from '../lib/utils'
import StyledIcon from './styled/Icon'
import StyledFooter from './styled/Footer'


const Styled = {
  Container: styled.div`
    width: 100%;
  `,
  Header: styled.div`
    width: 100%;
    background-image: url('/static/images/bg-memphis-colorful.png');
    padding: 3rem 12.5%;
    font-size: 5rem;
    font-weight: 700;
    @media (min-width: 1720px) {
      padding: 3rem 10%;
    }
    @media (max-width: 800px) {
      padding: 3rem 2.5%;
      font-size: 3rem;    
    }
    @media (max-width: 560px) {
      padding: 2rem 2.5%;
      font-size: 2.4rem;
    }
    @media (max-width: 420px) {
      padding: 1.75rem 2.5%;
      font-size: 2rem
    }

  `,
  Sub: styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: #666;
    @media (max-width: 800px) {
      font-size: 1.25rem;    
    }
    @media (max-width: 560px) {
      font-size: 1.10rem;
    }
    @media (max-width: 420px) {
      font-size: 1rem
    }
  `,
  ListContainer: styled.div` 
    width: 75%;
    max-width: 960px;
    min-width: 200px;
    margin: 0 auto;
    padding: 1.5rem 0 0px;

    @media (min-width: 1720px) {
      max-width: unset;
      width: 80%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
      justify-items: center; 
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
      width: 100%;
      max-width: 440px;      
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
    ${StyledFooter}
    grid-area: footer;
    align-self: end;
  `,
  FooterIcon: styled.i`
    ${StyledIcon}
  `
}

const Conference = ({ conf }) => (
  <Styled.Item>
    <Styled.Logo src={getImage(conf.logo)} />
    <Styled.Title>
      <Link
        href={`/conference?id=${conf._id}`}
        as={`/conference/${conf._id}/${textToSlug(`${conf.name} ${conf.year}`)}`}>
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
    <Styled.Header>
      Conferences
      <Styled.Sub>
        At Confbar
      </Styled.Sub>
    </Styled.Header>
    <Styled.ListContainer>
      {conferences.map(c => <Conference conf={c} key={c._id} />) }
    </Styled.ListContainer>
  </Styled.Container>
)

ConfList.propTypes = {
  conferences: array
}

export default ConfList
