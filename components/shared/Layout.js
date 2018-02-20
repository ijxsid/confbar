import React from 'react'
import { injectGlobal } from 'styled-components'
import { object, array, oneOfType, string } from 'prop-types'
import Navbar from './Navbar'
import AppHead from './AppHead'
import MetaKeys from './MetaTags'


injectGlobal`
  body {
    background-color: #F2F7FF
  }
`

const Layout = ({ user, pageTitle, meta, children }) => (
  <div>
    <AppHead title={pageTitle}>
      <MetaKeys meta={meta} />
    </AppHead>
    <Navbar user={user}/>
    {children}
  </div>
)

Layout.propTypes = {
  user: object,
  children: oneOfType([array, object]),
  meta: object,
  pageTitle: string
}

Layout.defaultProps = {
  meta: {}
}

export default Layout
