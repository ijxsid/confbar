import React from 'react'
import styled from 'styled-components'
import { object, string } from 'prop-types'
import Link from 'next/link'
import Loader from './common/Loader'

const Styled = {
  Container: styled.div`
    min-height: calc(100vh - 52px);
    display: grid;
    align-content: center;
    justify-content: center;
    justify-items: center;
  `,
  Title: styled.p`
    font-size: 2.0rem;
  `,
  Loader: styled.img`
    width: 100px;
    margin-bottom: 20px;
  `,
  NoJSLink: styled.div`
    text-align: center;
    font-size: 0.9rem;
    color: #717171;
    margin-top: 10px;
  `
}

const AuthSuccess = ({ user, nextPath }) => (
  <Styled.Container>
    <Loader show />
    <Styled.Title>
      Hi {user.displayName}, Welcome to Confbar
    </Styled.Title>
    <Styled.NoJSLink>
      If you're not automatically redirected, click
      <Link href={nextPath}>
        <a> here </a>
      </Link>
    </Styled.NoJSLink>
  </Styled.Container>
)

AuthSuccess.propTypes = {
  user: object,
  nextPath: string
}


export default AuthSuccess
