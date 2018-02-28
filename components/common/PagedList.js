import React, { Component } from "react"
import { func, bool, number, node, arrayOf, oneOfType } from 'prop-types'

class ListPage extends Component {
  componentWillMount () {
    if (this.props.onClient && this.props.page === 0) {
      this.props.fetchItems()
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll)
    }
  }
  componentWillUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
  handleScroll = (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
      this.props.fetchItems()
    }
  }
  render () {
    return this.props.children
  }
}

ListPage.propTypes = {
  fetchItems: func,
  onClient: bool,
  page: number,
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired
}

export default ListPage
