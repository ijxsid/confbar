import React from 'react'
import styled from 'styled-components'
import { func, string } from 'prop-types'

const Styled = {
  Field: styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    .label:not(:last-child) {
      margin-bottom: 0px;
    }

    .label {
      width: ${props => props.label ? '30%' : '0%'};
      line-height: 1.5;
      font-weight: 500;
    }
    .control  {
      width: ${props => props.label ? '70%' : '100%'};
    }
  `
}

const TextField = ({ label, name, onChange, placeholder, value }) => (
  <Styled.Field className="field" label={label}>
    <label className="label">{ label }</label>
    <div className="control">
      <input
        className="input"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
    </div>
  </Styled.Field>
)

TextField.propTypes = {
  label: string,
  name: string,
  onChange: func,
  placeholder: string,
  value: string
}

export default TextField
