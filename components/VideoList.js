import React from 'react'
import styled from 'styled-components'
import { getThumbnail } from '../lib/youtubeUtils'
import ConferenceSticky from './ConferenceSticky'

const VideoListContainer = styled.div`
  width: 75%;
  max-width: 850px;
  min-width: 450px;
  margin: 0 auto;
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 50%);
`
const VideoContainer = styled.div`
  margin: 15px 20px;
  box-shadow: 0px 0px 12px 8px rgba(170, 170, 190, 0.15);
  background: white;
  :hover {
    box-shadow: 0px 0px 20px 15px rgba(170, 170, 190, 0.1);
  }
`
const VideoInfoContainer = styled.div`
  padding: 2px 20px 15px;
`
const VideoThumbnail = styled.img`
  width: 100%;
`

const VideoInfo = ({ video }) => (
  <VideoContainer>
    <VideoThumbnail src={getThumbnail(video.link)} alt=""/>
    <VideoInfoContainer>
      <div className="title is-6" style={{ marginBottom: '0.65rem' }}>{video.name}</div>
      <ConferenceSticky conference={video.conference} />
      <div><i className="icon-microphone"/>: {video.speaker.name} </div>
      <div><i className="icon-tags" /> {video.tags.map(t => t.name).join(', ')}</div>
    </VideoInfoContainer>
  </VideoContainer>
)

const VideoList = ({ videos }) => (
  <VideoListContainer>
    {
      videos.map(v => <VideoInfo video={v} key={v._id}/>)
    }
  </VideoListContainer>
)

export default VideoList;
