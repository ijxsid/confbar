import React from 'react'
import styled from 'styled-components'
import { func, object, array } from 'prop-types'
import { connect } from 'react-redux'
import Tabs from '../common/Tabs'
import { adminActions, searchConferences, searchSpeakers, searchTags } from '../../lib/actions'
import { selectConferencesByTerm, selectSpeakersByTerm, selectTagsByTerm } from '../../lib/selectors'
import ConferenceFormTab from './ConferenceFormTab'
import VideoFormTab from './VideoFormTab'
import SpeakerFormTab from './SpeakerFormTab'
import TagsFormTab from './TagsFormTab'

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
    this.props.onChangeForm(e.target.name, e.target.value)
  }
  onConfSearch = (e) => {
    this.props.onConfSearch(e.target.name, e.target.value)
  }
  onSpeakerSearch = (e) => {
    this.props.onSpeakerSearch(e.target.name, e.target.value)
  }
  onTagSearch = (e) => {
    this.props.onTagSearch(e.target.name, e.target.value)
  }
  onSelectConf = (conf) => {
    this.props.onChangeForm('conference', conf)
  }
  onResetConf = (conf) => {
    this.props.onChangeForm('conference', null)
  }
  onSelectSpeaker = (speaker) => {
    this.props.onChangeForm('speaker', speaker)
  }
  onResetSpeaker = () => {
    this.props.onChangeForm('speaker', null)
  }
  onSelectTag = (tag) => {
    const tagIds = this.props.tags.map(tag => tag._id)
    if (tagIds.indexOf(tag) < 0) {
      this.props.onChangeForm('tags', tagIds.concat([tag]))
    }
  }
  onResetTags = (tag) => {
    this.props.onChangeForm('tags', [])
  }
  onEditAddConferenceForm = (e) => {
    this.props.onChangeAddForm('conference', e.target.name, e.target.value)
  }
  onEditAddSpeakerForm = (e) => {
    this.props.onChangeAddForm('speaker', e.target.name, e.target.value)
  }
  onEditAddTagForm = (e) => {
    this.props.onChangeAddForm('tag', e.target.name, e.target.value)
  }
  render () {
    const { video, conference, tags, speaker, search,
      confSearchResults, addForm, speakerSearchResults, tagSearchResults } = this.props
    const { searchConf, searchTag, searchSpeaker } = search
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
              onSearch={this.onConfSearch}
              searchResults={confSearchResults}
              onSelect={this.onSelectConf}
              newConference={addForm.conference}
              onEditAddConferenceForm={this.onEditAddConferenceForm}
              onReset={this.onResetConf}
            />,
            Speaker: <SpeakerFormTab
              speaker={speaker}
              term={searchSpeaker}
              onSearch={this.onSpeakerSearch}
              searchResults={speakerSearchResults}
              onSelect={this.onSelectSpeaker}
              newSpeaker={addForm.speaker}
              onEditAddSpeakerForm={this.onEditAddSpeakerForm}
              onReset={this.onResetSpeaker}
            />,
            Tags: <TagsFormTab
              tags={tags}
              term={searchTag}
              onSearch={this.onTagSearch}
              searchResults={tagSearchResults}
              onSelect={this.onSelectTag}
              newTag={addForm.tag}
              onEditAddTagForm={this.onEditAddTagForm}
              onReset={this.onResetTags}
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
  onConfSearch: func,
  onSpeakerSearch: func,
  onTagSearch: func,
  confSearchResults: array,
  speakerSearchResults: array,
  tagSearchResults: array,
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
      confSearchResults: selectConferencesByTerm(state, search.searchConf),
      speakerSearchResults: selectSpeakersByTerm(state, search.searchSpeaker),
      tagSearchResults: selectTagsByTerm(state, search.searchTag)
    }
  },

  dispatch => ({
    onChangeForm: (field, value) => dispatch(adminActions.editForm(field, value)),
    onConfSearch: (field, value) => dispatch(searchConferences(field, value)),
    onSpeakerSearch: (field, value) => dispatch(searchSpeakers(field, value)),
    onTagSearch: (field, value) => dispatch(searchTags(field, value)),
    onChangeAddForm: (type, field, value) => dispatch(adminActions.editAddForm(type, field, value))
  })
)(EditVideo)
