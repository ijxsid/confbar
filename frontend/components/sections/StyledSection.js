import styled from 'styled-components'
import StyledIcon from '../styled/Icon'


export default {
  Section: styled.div`
    display: grid;
    grid-template-columns: repeat(4, calc(25% - 26.25px));
    justify-items: center;
    grid-gap: 35px;

    @media(max-width: 1440px) {
      grid-template-columns: repeat(4, calc(25% - 15px));
      grid-gap: 20px;
      
    }
    @media(max-width: 1080px) {
      grid-template-columns: repeat(4, calc(25% - 15px));
      grid-gap: 20px;
    }

    @media(max-width: 920px) {
      grid-template-columns: repeat(2, calc(50% - 17.5px));
      grid-gap: 35px;
    }
    @media(max-width: 480px) {
      grid-template-columns: 100%;
      grid-gap: 35px;
    }
  `,
  Item: styled.a`
    display: grid;
    width: 100%;
    grid-template-rows: 180px auto auto;
    background-color: #fff;
    border-radius: 2px;
    grid-template-areas:
      "image"
      "name"
      "sub";
    box-shadow: 2px 4px 8px rgba(50,50,50,0.15), 1px 3px 6px rgba(50,50,50,0.18);

    :hover {
      box-shadow: 2px 8px 14px rgba(50,50,50,0.18), 1px 5px 9px rgba(50,50,50,0.20);  
    }
    @media(min-width: 1440px) {
      grid-template-rows: 220px auto auto;
    }
    @media(min-width: 1720px) {
      grid-template-rows: 260px auto auto;
    }
    @media(min-width: 1920px) {
      grid-template-rows: 300px auto auto;
    }
    @media(min-width: 1920px) {
      grid-template-rows: 350px auto auto;
    }
    @media(max-width: 1080px) {
      grid-template-rows: 140px auto auto;
    }
    @media(max-width: 920px) {
      grid-template-rows: 200px auto auto;
    }
    @media(max-width: 480px) {
      grid-template-columns: 120px auto;
      grid-template-rows: auto auto;
      grid-template-areas:
        "image name"
        "image sub";
      align-items: center;
      min-height: 120px;
    }

    @media(max-width: 360px) {
      grid-template-columns: 90px auto;
      min-height: 90px;
    }

  `,
  Image: styled.img`
    display: block;
    grid-area: image;
    padding: ${props => `${typeof props.padding === 'undefined' ? 5 : props.padding}px`};
    height: 180px;
    margin: 0 auto;

    @media(min-width: 1440px) {
      height: 220px;
    }
    @media(min-width: 1720px) {
      height: 260px;
    }
    @media(min-width: 1920px) {
      height: 300px;
    }
    @media(min-width: 2560px) {
      height: 350px;
    }
    @media(max-width: 1080px) {
      height: 140px;
    }
    @media(max-width: 920px) {
      height: 200px;
    }
    @media(max-width: 480px) {
      height:unset;
    }
  `,
  Name: styled.div`
    font-size: 1.40rem;
    padding: 0.5rem 1rem 0rem;
    grid-area: name;
    font-weight: 700;
    color: #666;
    @media(min-width: 1720px) {
      font-size: 1.55rem;
    }
    @media(min-width: 1920px) {
      font-size: 1.75rem;
    }
    @media(min-width: 2560px) {
      font-size: 2rem;
    }
    @media(max-width: 1080px) {
      font-size: 1.15rem;
    }
    @media(max-width: 480px) {
      font-size: 1.25rem;
      align-self: start;
    }
    @media(max-width: 360px) {
      font-size: 1.125rem;
    }

  `,
  Sub: styled.div`
    grid-area: sub;
    padding: 0rem 1rem 2rem;
    font-weight: 700;
    font-size: 1.05rem;
    color: #878787;
    @media(min-width: 1720px) {
      font-size: 1.2rem;
    }
    @media(min-width: 2560px) {
      font-size: 1.5rem;
    }
    @media(max-width: 1080px) {
      font-size: 1rem;
    }
    @media(max-width: 480px) {
      font-size: 0.95rem;
      align-self: start;
      padding: 0 1rem 3.5rem;
      font-weight: 400;      
    }
    @media(max-width: 420px) {
      padding: 0 1rem 2rem;
    }
  `,
  Icon: styled.i`
    ${StyledIcon}
  `
}

