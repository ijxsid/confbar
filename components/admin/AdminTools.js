import React from 'react'
import styled from 'styled-components'
import { bool, oneOfType, object, array } from 'prop-types'
import { connect } from 'react-redux'


const Styled = {
  AdminTools: styled.div`
  margin: 10px 0px;
  font-size: 0.90rem;
  display: flex;
  align-items: center;
  > div {
    margin-right: 10px;
  }
  > div:first-child {
    background-color: #FFFFD3;
    padding: 5px 10px;
    border-radius: 10px;
    font-weight: 500;
    color:#C02727;
  }
`
}

const AdminTools = ({ isAdmin, render }) => (
  isAdmin ?
    <Styled.AdminTools>
      <div> Admin Tools </div>
      { render }
    </Styled.AdminTools> :
    null
)
AdminTools.propTypes = {
  isAdmin: bool.isRequired,
  render: oneOfType([array, object])
}

export default connect(
  state => ({
    isAdmin: state.auth.user.isAdmin
  })
)(AdminTools)
