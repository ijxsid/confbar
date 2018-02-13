import React from 'react'
import { func, object, array, string } from 'prop-types'
import TextField from './TextField'


const ConferenceFormTab = ({ conference, term, onSearch, searchResults, onSelect }) => (
  <div className="panel">
    <div className="panel-block is-active">
      <b> Currently Selected:</b>  {` ${conference.name} - ${conference.year}`}
    </div>
    <div className="panel-block">
      <TextField
        name="searchConf"
        placeholder="Search another conference to apply to this video"
        onChange={onSearch}
        value={term}
      />
    </div>
    <div>
      {
        searchResults.map(conf => (
          <div
            className="panel-block"
            key={conf._id}
            onClick={() => { onSelect(conf._id) }}
          >
            {`${conf.name} - ${conf.year}`}
          </div>
        ))
      }

    </div>
  </div>
)
ConferenceFormTab.propTypes = {
  conference: object,
  onSearch: func,
  searchResults: array,
  onSelect: func,
  term: string
}

export default ConferenceFormTab
