import React from 'react'
import styled from 'styled-components'
import { func, object, array } from 'prop-types'
import { connect } from 'react-redux'
import Tabs from '../common/Tabs'
import { adminActions, searchConferences } from '../../lib/actions'
import { selectConferencesByTerm } from '../../lib/selectors'
import ConferenceFormTab from './ConferenceFormTab'
import VideoFormTab from './VideoFormTab'

const Styled = {
  Container: styled.div`
    padding: 2rem 3rem;
    max-width: 970px;
    width: 100vw;
  `,
  Heading: styled.div`
    padding: 0rem 0px 2rem;
    font-size: 1.3rem;
    font-weight: 700;
  `,
  ButtonGroup: styled.div`
    margin-top: 2rem;
    margin-left: 30%;
  `
}

class EditVideo extends React.Component {
  onChangeVideoForm = (e) => {
    console.log(e.target.name)
    this.props.onChangeForm(e.target.name, e.target.value)
  }
  onChangeSearchForm = (e) => {
    console.log(e.target.name)
    this.props.onChangeSearch(e.target.name, e.target.value)
  }
  onSelectConf = (conf) => {
    this.props.onChangeForm('conference', conf)
  }
  onEditAddConferenceForm = (e) => {
    this.props.onChangeAddForm('conference', e.target.name, e.target.value)
  }
  render () {
    const { video, conference, tags, speaker, search, confSearchResults, addForm } = this.props
    const { searchConf, searchTag, searchSpeaker } = search
    console.log(this.props)
    return (
      <Styled.Container>
        <Styled.Heading>
          <div>
            Editing Video: {video.name}
          </div>
        </Styled.Heading>
        <Tabs
          comps={{
            Video: <VideoFormTab video={video} onChange={this.onChangeVideoForm}/>,
            Conference: <ConferenceFormTab
              conference={conference}
              term={searchConf}
              onSearch={this.onChangeSearchForm}
              searchResults={confSearchResults}
              onSelect={this.onSelectConf}
              newConference={addForm.conference}
              onEditAddConferenceForm={this.onEditAddConferenceForm}
            />
          }}
        />

        <Styled.ButtonGroup>
          <div className="field is-grouped">
            <p className="control">
              <button className="button is-info">
                Submit
              </button>
            </p>
            <p className="control">
              <button className="button is-light">
                Cancel
              </button>
            </p>
          </div>
        </Styled.ButtonGroup>
      </Styled.Container>
    )
  }
}

EditVideo.propTypes = {
  conference: object,
  video: object,
  tags: array,
  speaker: object,
  search: object,
  onChangeForm: func,
  onChangeSearch: func,
  confSearchResults: array,
  addForm: object,
  onChangeAddForm: func
}

export default connect(
  state => {
    const { editing, conferences, speakers, tags } = state.data
    const { form, search, add } = editing
    return {
      video: form,
      conference: form.conference ?
        conferences[form.conference] :
        null,
      speaker: form.speaker ?
        speakers[form.speaker] :
        null,
      tags: form.tags.map(tag => tags[tag]),
      id: editing.id,
      addForm: add,
      search: search,
      confSearchResults: selectConferencesByTerm(state, search.searchConf)
    }
  },

  dispatch => ({
    onChangeForm: (field, value) => dispatch(adminActions.editForm(field, value)),
    onChangeSearch: (field, value) => dispatch(searchConferences(field, value)),
    onChangeAddForm: (type, field, value) => dispatch(adminActions.editAddForm(type, field, value))
  })
)(EditVideo)
