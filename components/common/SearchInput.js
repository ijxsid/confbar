import React from 'react'
import styled from 'styled-components'
import { func, string } from 'prop-types'
import StyledIcon from '../styled/Icon'

const Styled = {
  Input: styled.div`
    margin-right: 0.5rem;
    width: 100%;
    
    input[type="text"] {
      border-radius: 0px;
      width: 100%;
    }

    :not(:last-child) {
      margin-bottom: 0;
    }
    .control {
      width: 100%;
    }
  `,
  Icon: styled.i`
    ${StyledIcon}
    padding-top: 4px;
  `
}

const SearchInput = ({ name, onChange, placeholder, value }) => (
  <Styled.Input className="field">
    <div className="control has-icons-left">
      <input
        className="input"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
      <span className="icon is-small is-left">
        <Styled.Icon className="icon-search" />
      </span>
    </div>
  </Styled.Input>
)

SearchInput.propTypes = {
  name: string,
  onChange: func,
  placeholder: string,
  value: string
}

export default SearchInput
