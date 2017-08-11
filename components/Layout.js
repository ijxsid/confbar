import React from 'react'
import Head from 'next/head'
import { injectGlobal } from 'styled-components'
import { object } from 'prop-types'

injectGlobal`
`

const Layout = ({ children }) => (
  <div>
    <Head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      <title>Confbar v0.1</title>
      <link rel="stylesheet" href="/static/css/index.css"/>
    </Head>
    {children}
  </div>
)

Layout.propTypes = {
  children: object
}

export default Layout
