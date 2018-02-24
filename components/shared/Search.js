import React from 'react'
import styled from 'styled-components'
import { func, string, bool } from 'prop-types'
import SearchInput from '../common/SearchInput'
import animations from '../styled/animations'

const Styled = {
  Search: styled.div`
    display: flex;
    margin-right: 0.5rem;
    align-items: center;
    position: relative;
    width: 330px;

    @media(max-width: 1023px) {
      display: ${props => props.mobile ? 'auto' : 'none'}
    }
    @media(min-width: 1024px) {
      display: ${props => props.mobile ? 'none' : 'auto'}
    }

  `,
  Results: styled.div`
    position: absolute;
    bottom: -24px;
    width: calc(100% - 0.5rem);
    background: #fff;
    box-shadow: 0 5px 12px 4px rgba(0, 0, 0, 0.1);
    padding: 5px;
    font-weight: bold;
    animation: ${animations.flipInX} 0.5s linear;
  `
}
class Search extends React.Component {
  state = { search: '' }

  handleSearch = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState(() => ({
      [key]: value
    }))
  }
  render () {
    const { mobile } = this.props
    const { search } = this.state

    return (
      <Styled.Search mobile={mobile}>
        <SearchInput
          name="search"
          onChange={this.handleSearch}
          placeholder="Search"
          value={search}
        />
        {
          search &&
          <Styled.Results>
            Results
          </Styled.Results>
        }
      </Styled.Search>
    )
  }
}

Search.propTypes = {
  name: string,
  onChange: func,
  placeholder: string,
  value: string,
  mobile: bool
}

export default Search
