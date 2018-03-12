import React from 'react'
import styled from 'styled-components'
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
  render () {
    return (
      <Styled.Container>
        <Styled.Column>
          <Styled.ColumnHeading>
            By Year
          </Styled.ColumnHeading>
          <Styled.ColumnContent>
            <div>
              <label className="checkbox">
                <input type="checkbox" />
                2017
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" />
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
                <input type="checkbox" />
                React
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" />
                Vue.js
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" />
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
                <input type="checkbox" />
                San Jose, CA, US
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" />
                Paris, FR
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" />
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
              <input type="text" placeholder="Add Keywords"/>
            </div>
          </Styled.ColumnContent>
        </Styled.Column>
      </Styled.Container>
    )
  }
}

export default FilterTab
