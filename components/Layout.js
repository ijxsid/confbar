import React from 'react'
import Head from 'next/head'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    background: #a8f8f8;
  }
`

export default ({ children }) => (
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
