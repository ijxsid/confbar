import React from 'react'
import { connect } from 'react-redux'
import { func, string } from 'prop-types'
import styled from 'styled-components'
import { paginationActions } from '../../lib/actions'

const Styled = {
  Container: styled.div`
    width: 100%;
    padding: 1rem;
  `,
  SearchInput: styled.input`
    width: 100%;
    font-size: 1.5rem;
    line-height: 2.4rem;
    padding: 0 0.5rem;
  `
}

class SearchTab extends React.Component {
  onChange = (e) => {
    this.props.onChange(e.target.value)
  }
  render () {
    return (
      <Styled.Container>
        <Styled.SearchInput
          type="text"
          placeholder="Type to search a conference..."
          value={this.props.keyword}
          onChange={this.onChange}
        />
      </Styled.Container>
    )
  }
}

SearchTab.propTypes = {
  onChange: func,
  keyword: string
}

SearchTab = connect(
  state => ({
    keyword: state.pagination.conference.keyword,
  }),
  dispatch => ({
    onChange: (value) => dispatch(paginationActions.setFilters('keyword', value))
  })
)(SearchTab)

export default SearchTab
