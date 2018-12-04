import React from 'react'
import styled from 'styled-components'
import { bool, number } from 'prop-types'


const Styled = {
  LoaderContainer: styled.div`
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: space-around;
    align-items: center;
  `,
  Loader: styled.img`
    width: ${props => props.size || '100px'};
    margin-bottom: 20px;
  `
}

const Loader = ({ show, size }) => (
  <Styled.LoaderContainer show={show}>
    <Styled.Loader
      size={size}
      src={`/static/images/dual-ring-loader.svg`}
      alt="Loading Animation"
    />
  </Styled.LoaderContainer>
)

Loader.propTypes = {
  show: bool.isRequired,
  size: number
}

export default Loader
