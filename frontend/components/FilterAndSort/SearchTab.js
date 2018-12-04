import React from 'react'
import { connect } from 'react-redux'
import { func, shape, string } from 'prop-types'
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
    const { search } = this.props.filters
    return (
      <Styled.Container>
        <Styled.SearchInput
          type="text"
          placeholder="Type to search a conference..."
          value={search}
          onChange={this.onChange}
        />
      </Styled.Container>
    )
  }
}

SearchTab.propTypes = {
  onChange: func,
  filters: shape({
    search: string
  })
}

SearchTab = connect(
  state => ({
    filters: state.pagination.conference.filters
  }),
  dispatch => ({
    onChange: (value) => dispatch(paginationActions.setFilters('search', value))
  })
)(SearchTab)

export default SearchTab
