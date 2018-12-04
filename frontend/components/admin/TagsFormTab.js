import React from 'react'
import { func, object, array, string } from 'prop-types'
import styled from 'styled-components'
import TextField from '../common/TextField'
import Tabs from '../common/Tabs'

const Styled = {
  Selected: styled.div`
    cursor: pointer;
    span {
      display: inline-block;
      margin-right: 5px;
    }
    span:first-child {
      font-weight: 600;
    }
  `,
  ResultTag: styled.div`
    cursor:pointer;
    :hover {
      background-color: #f1f1f1;
    }
  `
}

const SearchPanelTab = ({ term, searchResults, onSelect, onSearch }) => (
  <div className="panel">
    <div className="panel-block">
      <TextField
        name="searchTag"
        placeholder="Search another Tag to add to this video"
        onChange={onSearch}
        value={term}
      />
    </div>
    {
      searchResults.map(tag => (
        <Styled.ResultTag
          className="panel-block"
          key={tag._id}
          onClick={() => { onSelect(tag._id) }}
        >
          {`${tag.name}`}
        </Styled.ResultTag>
      ))
    }
  </div>
)

SearchPanelTab.propTypes = {
  onSearch: func,
  searchResults: array,
  onSelect: func,
  term: string
}

const AddTagPanelTab = ({ tag, onChange, onSubmit }) => (
  <div className="panel">
    <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
      <div className="panel-block">
        <TextField
          label="Name"
          name="name"
          value={tag.name}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Description"
          name="description"
          value={tag.description}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Website"
          name="website"
          value={tag.website}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="logo"
          name="logo"
          value={tag.logo}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Blog"
          name="blog"
          value={tag.blog}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Repo"
          name="repo"
          value={tag.repo}
          placeholder="Full URL for the repo"
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <p className="control">
          <button type="submit" className="button is-info">
            Save Tag
          </button>
        </p>
      </div>
    </form>
  </div>
)

AddTagPanelTab.propTypes = {
  tag: object,
  onChange: func,
  onSubmit: func
}


const TagsFormTab = ({
  tags, term, onSearch, searchResults, onSelect,
  newTag, onEditAddTagForm, onReset, onSaveTag
}) => (
  <div>
    <div className="panel">
      <Styled.Selected className="panel-block is-active">
        <span> Currently Selected: </span>
        <span> { tags.length > 0 ? tags.map(tag => tag.name).join(', ') : '-'} </span>
      </Styled.Selected>
      <div className="panel-block">
        <div className="control">
          <button type="submit" className="button is-danger is-small" onClick={onReset}>
            Reset Selections
          </button>
        </div>
      </div>
    </div>
    <Tabs
      comps={{
        Search: <SearchPanelTab
          term={term}
          searchResults={searchResults}
          onSelect={onSelect}
          onSearch={onSearch}
        />,
        Add: <AddTagPanelTab
          tag={newTag}
          onChange={onEditAddTagForm}
          onSubmit={onSaveTag}
        />
      }}
    />

  </div>
)
TagsFormTab.propTypes = {
  tags: array,
  onSearch: func,
  searchResults: array,
  onSelect: func,
  term: string,
  newTag: object,
  onEditAddTagForm: func,
  onReset: func,
  onSaveTag: func
}

export default TagsFormTab
