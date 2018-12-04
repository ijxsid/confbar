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

    input[type="radio"] {
      vertical-align: middle;
      margin-right: 0.4rem;      
    }
  
  `
}

class SortTab extends React.Component {
  render () {
    return (
      <Styled.Container>
        <Styled.Column>
          <Styled.ColumnHeading>
            By Date
          </Styled.ColumnHeading>
          <Styled.ColumnContent>
            <div>
              <label className="radio">
                <input type="radio" name="sortBy"/>
                Newest First
              </label>
            </div>
            <div>
              <label className="radio">
                <input type="radio" name="sortBy"/>
                Oldest First
              </label>
            </div>
          </Styled.ColumnContent>
        </Styled.Column>
        <Styled.Column>
          <Styled.ColumnHeading>
            Other
          </Styled.ColumnHeading>
          <Styled.ColumnContent>
            <div>
              <label className="radio">
                <input type="radio" name="sortBy"/>
                Recently Added
              </label>
            </div>
            <div>
              <label className="radio">
                <input type="radio" name="sortBy"/>
                Recently Updated
              </label>
            </div>
          </Styled.ColumnContent>
        </Styled.Column>
      </Styled.Container>
    )
  }
}

export default SortTab
