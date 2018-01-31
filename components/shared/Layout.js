import React from 'react'
import { injectGlobal } from 'styled-components'
import { object, array, oneOfType } from 'prop-types'
import Navbar from './Navbar'
import AppHead from './AppHead'


injectGlobal`
  body {
    background-color: #F2F7FF
  }
`

const Layout = ({ user, headChildren, children }) => (
  <div>
    <AppHead />
    <Navbar user={user}/>
    {children}
  </div>
)

Layout.propTypes = {
  user: object,
  children: oneOfType([array, object]),
  headChildren: object
}

export default Layout
