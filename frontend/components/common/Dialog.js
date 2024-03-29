import React from 'react'
import styled from 'styled-components'
import { bool, oneOfType, object, array, func } from 'prop-types'

const Styled = {
  Outer: styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    background: #33333388;
    width: 100%;
    height: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
    cursor: pointer;
  `,
  Inner: styled.div`
    background-color: #fff;
    box-shadow: 0px 0px 5px 2px rgba(50, 50, 50, 0.25);
    transition: 0.2s all linear;
    cursor: initial;
    :hover {
      box-shadow: 0px 0px 10px 5px rgba(80, 80, 80, 0.25);
    }
  `
}


const Dialog = ({ open, onOuterClick, children }) => (
  open ?
    <Styled.Outer onClick={onOuterClick} >
      <Styled.Inner onClick={e => { e.stopPropagation() }}>
        {children}
      </Styled.Inner>
    </Styled.Outer> :
    null
)
Dialog.propTypes = {
  open: bool,
  onOuterClick: func,
  children: oneOfType([array, object])
}

export default Dialog
