import React from 'react'
import { object } from 'prop-types'

const MetaTags = ({ meta }) => (
  Object.keys(meta).map(metaKey => (
    <meta name={metaKey} content={meta[metaKey]} key={metaKey}/>
  ))
)

MetaTags.propTypes = {
  meta: object
}

MetaTags.defaultProps = {
  meta: {}
}

export default MetaTags
