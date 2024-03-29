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
  ResultConf: styled.div`
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
        name="searchConf"
        placeholder="Search another conference to apply to this video"
        onChange={onSearch}
        value={term}
      />
    </div>
    {
      searchResults.map(conf => (
        <Styled.ResultConf
          className="panel-block"
          key={conf._id}
          onClick={() => { onSelect(conf._id) }}
        >
          {`${conf.name} - ${conf.year}`}
        </Styled.ResultConf>
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

const AddConfPanelTab = ({ conference, onChange, onSubmit }) => (
  <div className="panel">
    <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
      <div className="panel-block">
        <TextField
          label="Name"
          name="name"
          value={conference.name}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Year"
          name="year"
          placeholder="Year of the Starting Date for this conference"
          value={conference.year}
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Location"
          name="location"
          value={conference.location}
          placeholder="use format of City, ST, CO, 2 letter codes for State and Country"
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Logo"
          name="logo"
          value={conference.logo}
          placeholder="url of the logo"
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="URL"
          name="url"
          value={conference.url}
          placeholder="url of the logo"
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="Start Date"
          name="startDate"
          value={conference.startDate}
          placeholder="use format of 20XX-MM-DD"
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <TextField
          label="End Date"
          name="endDate"
          value={conference.endDate}
          placeholder="use format of 20XX-MM-DD"
          onChange={onChange}
        />
      </div>
      <div className="panel-block">
        <p className="control">
          <button type="submit" className="button is-info">
            Save Conference
          </button>
        </p>
      </div>
    </form>
  </div>
)

AddConfPanelTab.propTypes = {
  conference: object,
  onChange: func,
  onSubmit: func
}

const ConferenceFormTab = ({
  conference, term, onSearch, searchResults, onSelect,
  newConference, onEditAddConferenceForm, onReset, onSaveConference
}) => (
  <div>
    <div className="panel">
      <Styled.Selected className="panel-block is-active">
        <span> Currently Selected: </span>
        <span> { conference ? ` ${conference.name} - ${conference.year}` : '-'} </span>
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
        Add: <AddConfPanelTab
          conference={newConference}
          onChange={onEditAddConferenceForm}
          onSubmit={onSaveConference}
        />
      }}
    />

  </div>
)
ConferenceFormTab.propTypes = {
  conference: object,
  onSearch: func,
  searchResults: array,
  onSelect: func,
  term: string,
  newConference: object,
  onEditAddConferenceForm: func,
  onSaveConference: func,
  onReset: func
}

export default ConferenceFormTab
