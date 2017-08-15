import React from 'react'
import Head from 'next/head'
import { injectGlobal } from 'styled-components'
import { object } from 'prop-types'
import Navbar from './Navbar'
injectGlobal`
  body {
    background-color: #F2F7FF
  }
`

const Layout = ({ user, children }) => (
  <div>
    <Head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      <title>Confbar v0.1</title>
      <link rel="stylesheet" href="/static/css/index.css"/>
    </Head>
    <Navbar user={user}/>
    {children}
  </div>
)

Layout.propTypes = {
  user: object,
  children: object
}

export default Layout
