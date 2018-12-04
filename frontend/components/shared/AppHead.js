import React from 'react'
import Head from 'next/head'
import { object, string } from 'prop-types'

const AppHead = ({ title, children }) => (
  <Head>
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="/static/images/icon.ico" />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
    <title>{title}</title>
    <link rel="stylesheet" href="/static/css/index.css"/>
    <link rel="stylesheet" href="/static/icons/styles.css"/>
    {children}
  </Head>
)


AppHead.propTypes = {
  children: object,
  title: string
}

AppHead.defaultProps = {
  title: 'Confbar: Watch and Follow Top Tech Conferences'
}

export default AppHead
