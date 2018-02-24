import React from 'react'
import styled from 'styled-components'
import { func, string, bool, object } from 'prop-types'
import { getThumbnail } from '../../lib/youtubeUtils'
import { getImage, getSpeakerAvatar, textToSlug } from '../../lib/utils'
import Link from 'next/link'
import SearchInput from '../common/SearchInput'
import animations from '../styled/animations'
import { connect } from 'react-redux'
import { performSearch } from '../../lib/actions'
import {
  selectConferencesByTerm,
  selectSpeakersByTerm,
  selectTagsByTerm,
  selectVideosByTerm
} from '../../lib/selectors'

const addType = (results = [], type) => results.map(
  result => ({ ...result, type })
)
const getResultItemImage = (type, result) => {
  switch (type) {
  case 'Conference':
  case 'Technology':
    return getImage(result.logo)
  case 'Video':
    return getThumbnail(result.link)
  case 'Speaker':
    return getSpeakerAvatar(result)
  }
}

const Styled = {
  Search: styled.div`
    display: flex;
    margin-right: 0.5rem;
    align-items: center;
    position: relative;
    width: 330px;

    @media(max-width: 1023px) {
      display: ${props => props.mobile ? 'auto' : 'none'}
    }
    @media(min-width: 1024px) {
      display: ${props => props.mobile ? 'none' : 'auto'}
    }

  `,
  Results: styled.div`
    position: absolute;
    top: calc(3.25rem - 5px);
    width: calc(100% - 0.5rem);
    max-height: 500px;
    overflow-y: scroll;
    z-index: 2;
    background: #fff;
    box-shadow: 0 5px 12px 4px rgba(0, 0, 0, 0.1);
    animation: ${animations.flipInX} 0.5s linear;
  `,
  ResultsHeading: styled.div`
    font-weight: bold;
    background-color: #e7e7e7;
    padding: 5px;
  `,
  List: styled.ul``,
  ListItem: styled.li`
    display: block;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    padding: 12px 0;
    min-height: 5rem;
  `,
  ItemImg: styled.img`
    display: inline-block;
    width: 100px;
    vertical-align: middle;
    min-height: 5rem;
  `,
  ItemInfo: styled.div`
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 100px);
    padding: 0px 8px;
    min-height: 5rem;
  `,
  ItemName: styled.div`
    font-size: 0.90rem;
    font-weight: 700;
    line-height: 1.2;
  `,
  ItemType: styled.div`
    font-size: 0.85rem;
    color: #878787;
    font-weight: 700;
  `
}

const ItemLink = ({ type, result, children, onClickResult }) => {
  switch (type) {
  case 'Conference':
    return (
      <Link
        href={`/conference?id=${result._id}`}
        as={`/conference/${result._id}/${textToSlug(`${result.name} ${result.year}`)}`}>
        <a onClick={onClickResult}>{children}</a>
      </Link>
    )
  case 'Technology':
    return (
      <Link
        href={`/technology?id=${result._id}`}
        as={`/technology/${result._id}/${textToSlug(`${result.name}`)}`}>
        <a onClick={onClickResult}>{children}</a>
      </Link>
    )
  case 'Video':
    return (
      <Link
        href={`/video?id=${result._id}`}
        as={`/video/${result._id}/${textToSlug(result.name)}`} >
        <a onClick={onClickResult}>{children}</a>
      </Link>
    )
  case 'Speaker':
    return (
      <Link
        href={`/speaker?id=${result._id}`}
        as={`/speaker/${result._id}/${textToSlug(`${result.name}`)}`}>
        <a onClick={onClickResult}>{children}</a>
      </Link>
    )
  }
}

const ResultsListItem = ({ result, onClickResult }) => (
  <Styled.ListItem>
    <Styled.ItemImg src={getResultItemImage(result.type, result)} />
    <Styled.ItemInfo>
      <Styled.ItemName>
        <ItemLink type={result.type} result={result} onClickResult={onClickResult}>
          { result.name }
          { result.type === 'Conference' &&
            `- ${result.year}`
          }
        </ItemLink>
      </Styled.ItemName>
      <Styled.ItemType> { result.type } </Styled.ItemType>
    </Styled.ItemInfo>
  </Styled.ListItem>
)

class Search extends React.Component {
  handleSearch = (event) => {
    this.props.onChangeSearch(event.target.value)
  }
  handleClickResult = () => {
    this.props.onChangeSearch('')
  }
  render () {
    const { mobile, term, searchResults } = this.props
    const { conferences, speakers, tags, videos } = searchResults
    const results = [...conferences, ...speakers, ...tags, ...videos]
    return (
      <Styled.Search mobile={mobile}>
        <SearchInput
          name="search"
          onChange={this.handleSearch}
          placeholder="Search"
          value={term}
        />
        {
          term &&
          <Styled.Results>
            <Styled.ResultsHeading> Results </Styled.ResultsHeading>
            <Styled.List>
              {
                results.map(result => (
                  <ResultsListItem
                    key={result._id}
                    result={result}
                    onClickResult={this.handleClickResult}
                  />
                ))
              }
            </Styled.List>
          </Styled.Results>
        }
      </Styled.Search>
    )
  }
}

Search.propTypes = {
  name: string,
  onChange: func,
  placeholder: string,
  value: string,
  mobile: bool,
  term: string,
  onChangeSearch: func,
  searchResults: object
}

Search = connect(
  state => ({
    term: state.data.search,
    searchResults: {
      conferences: addType(selectConferencesByTerm(state, state.data.search), 'Conference'),
      speakers: addType(selectSpeakersByTerm(state, state.data.search), 'Speaker'),
      tags: addType(selectTagsByTerm(state, state.data.search), 'Technology'),
      videos: addType(selectVideosByTerm(state, state.data.search), 'Video')
    }
  }),
  dispatch => ({
    onChangeSearch: value => dispatch(performSearch(value))
  })
)(Search)

export default Search
