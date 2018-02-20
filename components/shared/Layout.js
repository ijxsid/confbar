import React from 'react'
import { injectGlobal } from 'styled-components'
import { object, array, oneOfType, string } from 'prop-types'
import Navbar from './Navbar'
import AppHead from './AppHead'


injectGlobal`
  body {
    background-color: #F2F7FF
  }
`

const Layout = ({ user, pageTitle, headChildren, children }) => (
  <div>
    <AppHead title={pageTitle}>
      {headChildren}
    </AppHead>
    <Navbar user={user}/>
    {children}
  </div>
)

Layout.propTypes = {
  user: object,
  children: oneOfType([array, object]),
  headChildren: object,
  pageTitle: string
}

export default Layout
