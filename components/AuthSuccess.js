import React from 'react'
import styled from 'styled-components'
import { object } from 'prop-types'
import Link from 'next/link'
import Cookies from 'js-cookie'


const Styled = {
  Container: styled.div`
    min-height: calc(100vh - 52px);
    display: grid;
    align-content: center;
    justify-content: center;
    justify-items: center;

    p {
      font-size: 1.9rem;
    }
    img {
      width: 100px;
      margin-bottom: 20px;
    }
  `,
  NoJSLink: styled.div`
    text-align: center;
    font-size: 0.9rem;
    color: #717171;
    margin-top: 10px;
  `
}

const AuthSuccess = ({ user }) => (
  <Styled.Container>
    <img src={`/static/images/dual-ring-loader.svg`} alt="Loading Animation"/>
    <p>
      Hi {user.displayName}, Welcome to Confbar
    </p>
    <Styled.NoJSLink>
      If you're not automatically redirected, click
      <Link href={Cookies.get('afterLoginPath')}>
        <a> here</a>
      </Link>
    </Styled.NoJSLink>
  </Styled.Container>
)

AuthSuccess.propTypes = {
  user: object
}


export default AuthSuccess
