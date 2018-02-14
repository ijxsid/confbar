import React from 'react'
import { func, object, array, string } from 'prop-types'
import styled from 'styled-components'
import TextField from './TextField'
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
  ResultSpeaker: styled.div`
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
        name="searchSpeaker"
        placeholder="Search another Speaker to attach to this video"
        onChange={onSearch}
        value={term}
      />
    </div>
    {
      searchResults.map(speaker => (
        <Styled.ResultSpeaker
          className="panel-block"
          key={speaker._id}
          onClick={() => { onSelect(speaker._id) }}
        >
          {`${speaker.name}`}
        </Styled.ResultSpeaker>
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

const AddSpeakerPanelTab = ({ speaker, onChange, onSubmit }) => (
  <div className="panel">
    <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
      <div className="panel-block">
        <TextField
          label="Name"
          name="name"
          value={speaker.name}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Twitter Username"
          name="twitterUsername"
          placeholder="Twitter Id for the speaker"
          value={speaker.twitterUsername}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Website"
          name="website"
          value={speaker.website}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Blog"
          name="blog"
          value={speaker.blog}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Github"
          name="github"
          value={speaker.github}
          placeholder="Just the github Username, not URL"
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Location"
          name="location"
          value={speaker.location}
          placeholder="use format of City, ST, CO. 2 letter codes for State and Country"
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <p className="control">
          <button type="submit" className="button is-info">
            Save Speaker
          </button>
        </p>
      </div>
    </form>
  </div>
)

AddSpeakerPanelTab.propTypes = {
  speaker: object,
  onChange: func,
  onSubmit: func
}


const SpeakerFormTab = ({
  speaker, term, onSearch, searchResults, onSelect,
  newSpeaker, onEditAddSpeakerForm, onReset, onSaveSpeaker
}) => (
  <div>
    <div className="panel">
      <Styled.Selected className="panel-block is-active">
        <span> Currently Selected: </span>
        <span> { speaker ? speaker.name : '-'} </span>
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
        Add: <AddSpeakerPanelTab
          speaker={newSpeaker}
          onChange={onEditAddSpeakerForm}
          onSubmit={onSaveSpeaker}
        />
      }}
    />

  </div>
)
SpeakerFormTab.propTypes = {
  speaker: object,
  onSearch: func,
  searchResults: array,
  onSelect: func,
  term: string,
  newSpeaker: object,
  onEditAddSpeakerForm: func,
  onReset: func,
  onSaveSpeaker: func
}

export default SpeakerFormTab
