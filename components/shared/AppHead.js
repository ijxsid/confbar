import React from 'react'
import Head from 'next/head'
import { object } from 'prop-types'

const AppHead = ({ children }) => (
  <Head>
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
    <title>Confbar v0.1</title>
    <link rel="stylesheet" href="/static/css/index.css"/>
    <link rel="stylesheet" href="/static/icons/styles.css"/>
    {children}
  </Head>
)


AppHead.propTypes = {
  children: object
}
export default AppHead
