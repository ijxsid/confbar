import React from 'react'
import styled from 'styled-components'
import { string, func } from 'prop-types'
import Tabs from '../common/Tabs'

const Styled = {
  Container: styled.div`
    padding: 2rem 3rem;
  `,
  Heading: styled.div`
    padding: 0rem 0px 2rem;
    font-size: 1.3rem;
    font-weight: 700;
  `,
  Field: styled.div`
    display: flex;
    align-items: center;

    .label:not(:last-child) {
      margin-bottom: 0px;
    }

    .label {
      width: 30%;      
      line-height: 1.5;
      font-weight: 500;
    }
    .control  {
      width: 70%;
    }
  `,
  ButtonGroup: styled.div`
    margin-top: 2rem;
    margin-left: 30%;
  `
}

const TextField = ({ label, name, onChange, placeholder, value }) => (
  <Styled.Field className="field">
    <label className="label">{ label }</label>
    <div className="control">
      <input
        className="input"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
    </div>
  </Styled.Field>
)

TextField.propTypes = {
  label: string,
  name: string,
  onChange: func,
  placeholder: string,
  value: string
}
const VideoFormTab = () => (
  <div>
    <TextField label="Video Name" name="name" />
    <TextField label="Description" name="description" />
    <TextField label="Link" name="link" />
    <TextField label="Youtube Channel Id" name="youtubeChannelId" />
    <TextField label="Youtube Channel" name="youtubeChannelTitle" />
  </div>
)

const ConferenceFormTab = () => (
  <div>
    <TextField label="Conference Name" name="name" />
    <TextField label="Description" name="description" />
    <TextField label="Link" name="link" />
    <TextField label="Youtube Channel Id" name="youtubeChannelId" />
    <TextField label="Youtube Channel" name="youtubeChannelTitle" />
  </div>
)

class EditVideo extends React.Component {
  render () {
    return (
      <Styled.Container>
        <Styled.Heading>
          <div>
            Editing Video: Video Name
          </div>
        </Styled.Heading>
        <Tabs
          comps={{
            Video: <VideoFormTab />,
            Conference: <ConferenceFormTab />
          }}
        />

        <Styled.ButtonGroup>
          <div className="field is-grouped">
            <p className="control">
              <a className="button is-info">
                Submit
              </a>
            </p>
            <p className="control">
              <a className="button is-light">
                Cancel
              </a>
            </p>
          </div>
        </Styled.ButtonGroup>
      </Styled.Container>
    )
  }
}


export default EditVideo
