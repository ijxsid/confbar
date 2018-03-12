import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { number, func } from 'prop-types'
import FilterTab from './FilterTab'
import SortTab from './SortTab'
import { paginationActions } from '../../lib/actions'


const Styled = {
  Container: styled.div`
    width: 75%;
    max-width: 960px;
    min-width: 200px;
    margin: 0 auto;
    padding: 0.5rem 0;
    @media (min-width: 1720px) {
      max-width: unset;
      width: 80%;
    }

    @media (max-width: 800px) {
      width: 95%;
    }
  `,
  ButtonsContainer: styled.div`
    display: grid;
    grid-template-columns: ${props => props.open ? 'repeat(4, auto)' : 'repeat(2, auto)'};
    grid-gap: 10px;
    justify-content: end;
  `,
  Button: styled.button`
    border: none;
    box-shadow: none;
    background: ${props => {
    switch (props.type) {
    case 'danger':
      return '#C02727'
    case 'primary':
      return '#0B409C'
    default:
      return '#fff'
    }
  }};
    color: ${props => {
    switch (props.type) {
    case 'danger':
    case 'primary':
      return '#f7f7f7'
    default:
      return '#4a4a4a'
    }
  }};
    font-weight: ${props => {
    switch (props.type) {
    case 'danger':
    case 'primary':
      return '600'
    default:
      return '400'
    }
  }};
    padding: 0.5rem 1rem ${props => props.isSelected ? '0.50rem' : '0.75rem'};
    font-size: 1.2rem;
    box-shadow: 0px ${props => props.open ? '-6px 6px' : '0px 6px'} 4px rgba(170, 170, 190, 0.15);
    border-bottom: ${props => props.isSelected ? '0.25rem solid #10316B' : 'none'};     
    cursor: pointer;
    :focus {
      outline: none;
    }
  `,
  TabContainer: styled.div`
    background: #fff;
    box-shadow: 0px 0px 6px 4px rgba(170, 170, 190, 0.15);
    padding: 0.5rem 1rem;
    
  `
}

class FilterAndSort extends React.Component {
  onApply = () => {
    console.log("Applying")
  }
  render () {
    const { selectedTab, onSelectTab } = this.props
    const tabContainerOpen = typeof selectedTab !== 'undefined'
    return (
      <Styled.Container>
        <Styled.ButtonsContainer open={tabContainerOpen}>
          {
            tabContainerOpen &&
              <Styled.Button
                onClick={() => onSelectTab(undefined)}
                open={tabContainerOpen}
                type="danger"
              >
                X
              </Styled.Button>
          }
          <Styled.Button
            onClick={() => onSelectTab(0)}
            isSelected={selectedTab === 0}
            open={tabContainerOpen}
          >
            Filter
          </Styled.Button>
          <Styled.Button
            onClick={() => onSelectTab(1)}
            isSelected={selectedTab === 1}
            open={tabContainerOpen}
          >
            Sort
          </Styled.Button>
          {
            tabContainerOpen &&
              <Styled.Button
                onClick={this.onApply}
                open={tabContainerOpen}
                type="primary"
              >
                Apply
              </Styled.Button>
          }
        </Styled.ButtonsContainer>
        {
          selectedTab === 0 &&
            <Styled.TabContainer>
              <FilterTab />
            </Styled.TabContainer>
        }
        {
          selectedTab === 1 &&
          <Styled.TabContainer>
            <SortTab />
          </Styled.TabContainer>
        }
      </Styled.Container>
    )
  }
}

FilterAndSort.propTypes = {
  selectedTab: number,
  onSelectTab: func
}

FilterAndSort = connect(
  state => ({
    selectedTab: state.pagination.conference.sortAndFilterTab
  }),
  dispatch => ({
    onSelectTab: tabNo => dispatch(paginationActions.setFilterAndSortTab(tabNo))
  })
)(FilterAndSort)

export default FilterAndSort
