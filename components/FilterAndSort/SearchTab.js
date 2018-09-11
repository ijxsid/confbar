import React from 'react'
import styled from 'styled-components'
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
  render () {
    return (
      <Styled.Container>
        <Styled.SearchInput
          type="text"
          placeholder="Type to search a conference..."
        />
      </Styled.Container>
    )
  }
}

export default SearchTab
