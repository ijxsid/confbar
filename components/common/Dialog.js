import React from 'react'
import styled from 'styled-components'
import { bool, oneOfType, object, array, func } from 'prop-types'

const Styled = {
  Outer: styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    background: #33333355;
    width: 100%;
    height: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
  `,
  Inner: styled.div`
    background-color: #fff;
    min-width: 640px;
    box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.25);
    transition: 0.2s all linear;

    :hover {
      box-shadow: 0px 0px 16px 8px rgba(140, 140, 140, 0.25);
    }
  `
}


const Dialog = ({ open, onOuterClick, children }) => (
  open ?
    <Styled.Outer onClick={onOuterClick}>
      <Styled.Inner>
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
