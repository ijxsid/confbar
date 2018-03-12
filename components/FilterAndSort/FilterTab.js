import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { paginationActions } from '../../lib/actions'
const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25%);
  `,
  Column: styled.div`

  `,
  ColumnHeading: styled.div`
    font-weight: 700;
    font-size: 1.10rem;
  `,
  ColumnContent: styled.div`

    input[type="checkbox"] {
      vertical-align: middle;
      margin-right: 0.4rem;      
    }
  
  `
}
class FilterTab extends React.Component {
  onChange = (e) => {
    this.props.onChangeFilters(e.target.name, e.target.value)
  }
  render () {
    const { year, location, tag, keyword } = this.props.filters
    return (
      <Styled.Container>
        <Styled.Column>
          <Styled.ColumnHeading>
            By Year
          </Styled.ColumnHeading>
          <Styled.ColumnContent>
            <div>
              <label className="checkbox">
                <input type="checkbox" name="year" value="2017" onChange={this.onChange}
                  checked={year.indexOf('2017') > -1}
                />
                2017
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" name="year" value="2018" onChange={this.onChange}
                  checked={year.indexOf('2018') > -1}
                />
                2018
              </label>
            </div>
          </Styled.ColumnContent>
        </Styled.Column>
        <Styled.Column>
          <Styled.ColumnHeading>
            By Technology
          </Styled.ColumnHeading>
          <Styled.ColumnContent>
            <div>
              <label className="checkbox">
                <input type="checkbox" name="tag" value={'React'} onChange={this.onChange}
                  checked={tag.indexOf('React') > -1}
                />
                React
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" name="tag" value={'Vue.js'} onChange={this.onChange}
                  checked={tag.indexOf('Vue.js') > -1}
                />
                Vue.js
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" name="tag" value={'PHP'} onChange={this.onChange}
                  checked={tag.indexOf('PHP') > -1}
                />
                PHP
              </label>
            </div>
          </Styled.ColumnContent>
        </Styled.Column>
        <Styled.Column>
          <Styled.ColumnHeading>
            By Location
          </Styled.ColumnHeading>
          <Styled.ColumnContent>
            <div>
              <label className="checkbox">
                <input type="checkbox" name="location" value={'San Jose, CA, US'} onChange={this.onChange}
                  checked={location.indexOf('San Jose, CA, US') > -1}
                />
                San Jose, CA, US
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" name="location" value={'Paris, FR'} onChange={this.onChange}
                  checked={location.indexOf('Paris, FR') > -1}
                />
                Paris, FR
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" name="location" value={'New Delhi, IN'} onChange={this.onChange}
                  checked={location.indexOf('New Delhi, IN') > -1}
                />
                New Delhi, IN
              </label>
            </div>
          </Styled.ColumnContent>
        </Styled.Column>
        <Styled.Column>
          <Styled.ColumnHeading>
            By Keyword
          </Styled.ColumnHeading>
          <Styled.ColumnContent>
            <div>
              <input type="text" placeholder="Add Keywords" name="keyword" onChange={this.onChange}
                value={keyword}
              />
            </div>
          </Styled.ColumnContent>
        </Styled.Column>
      </Styled.Container>
    )
  }
}

FilterTab = connect(
  state => ({
    filters: state.pagination.conference.filters
  }),
  dispatch => ({
    onChangeFilters: (key, value) => dispatch(paginationActions.setFilters(key, value))
  })
)(FilterTab)
export default FilterTab
