import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { paginationActions } from '../../lib/actions'
const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 33%);
  `,
  Column: styled.div`

  `,
  LeftColumns: styled.div`
    grid-column: 1 / 3;
  `,
  ColumnHeading: styled.div`
    font-weight: 700;
    font-size: 1.10rem;
    padding: 0 0.4rem;
  `,
  ColumnContent: styled.div`

    input[type="checkbox"], input[type="radio"] {
      vertical-align: middle;
      margin-right: 0.4rem;
    }
  `,
  TagsList: styled.div`
    display: flex;
  `,
  Checkbox: styled.div`
    padding: 1rem 0.5rem;

    input[type="checkbox"] {
      display: none;
    }
    .label-name {
      border: 2px solid #777;
      color: #777;
      padding: 0.5rem 0.4rem;
      border-radius: 5px;
      font-weight: 600;
    }
    input:checked + .label-name {
      border: 2px solid #00d1b2;
      color: #00d1b2;
    }
  `,
  Radio: styled.div`
    padding: 0.2em 0;

    input[type="radio"] {
      display: none;
    }
    .label-name {
      color: #777;
      padding: 0.4rem 0.4rem;
      border-radius: 5px;
      font-weight: 600;
    }
    input:checked + .label-name {
      color: #00d1b2;
    }

  `
}

const Tag = ({ value, onChange, isChecked }) => (
  <Styled.Checkbox>
    <label className="checkbox">
      <input type="checkbox" name="tag" value={value} onChange={onChange}
        checked={isChecked}
      />
      <div className="label-name">
        { value }
      </div>
    </label>
  </Styled.Checkbox>
)

class FilterTabNew extends React.Component {
  onChange = (e) => {
    this.props.onChangeFilters(e.target.name, e.target.value)
  }
  render () {
    const { year, location, tag, keyword } = this.props.filters
    const defaultTags = ['React', 'Angular', 'Vue.js', 'Javascript', 'Python']
    return (
      <Styled.Container>
        <Styled.LeftColumns>
          <Styled.ColumnHeading>
            Filter by Technologies
          </Styled.ColumnHeading>

          <Styled.TagsList>
            {
              defaultTags.map(tagName => (
                <Tag
                  value={tagName}
                  isChecked={tag.indexOf(tagName) > -1}
                  onChange={this.onChange}
                />
              ))
            }
          </Styled.TagsList>
        </Styled.LeftColumns>
        <Styled.Column>
          <Styled.ColumnHeading>
            Sort
          </Styled.ColumnHeading>
          <Styled.ColumnContent>
            <Styled.Radio>
              <label className="radio">
                <input type="radio" name="sortBy"/>
                <div className="label-name">
                  ▲ Newest First
                </div>
              </label>
            </Styled.Radio>
            <Styled.Radio>
              <label className="radio">
                <input type="radio" name="sortBy"/>
                <div className="label-name">
                  ▼ Oldest First
                </div>
              </label>
            </Styled.Radio>
            <Styled.Radio>
              <label className="radio">
                <input type="radio" name="sortBy"/>
                <div className="label-name">
                  ◷ Recently Added
                </div>
              </label>
            </Styled.Radio>
          </Styled.ColumnContent>
        </Styled.Column>
      </Styled.Container>
    )
  }
}

FilterTabNew = connect(
  state => ({
    filters: state.pagination.conference.filters
  }),
  dispatch => ({
    onChangeFilters: (key, value) => dispatch(paginationActions.setFilters(key, value))
  })
)(FilterTabNew)
export default FilterTabNew
