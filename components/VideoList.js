import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { getThumbnail, getEmbed } from '../lib/youtubeUtils'
import { ConferenceSticky, SpeakerSticky, TagSticky } from './common/Sticky'
import { object, array } from 'prop-types'
import config from '../config'
import StyledIcon from './styled/Icon'
import StyledFooter from './styled/Footer'


const Styled = {
  List: styled.div`
    width: 75%;
    margin: 0 auto;
    padding: 15px 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    justify-content: center;
    grid-gap: 25px;

    @media (max-width: 1200px) {
      width: 95%;
    }

    @media (max-width: 960px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    @media (max-width: 700px) {
      display:block;
      max-width: 480px;
    }

    @media (max-width: 480px) {
      width: 98%;
    }
  `,
  Video: styled.div`
    margin: 20px 10px;
    box-shadow: 0px 0px 12px 8px rgba(170, 170, 190, 0.15);
    background: white;
    :hover {
      box-shadow: 0px 0px 20px 15px rgba(170, 170, 190, 0.1);
    }
    display: grid;
    grid-template-rows: auto auto 100px 54px;
    align-items: center;

    @media (min-width: 1280px) {
      grid-template-rows: auto auto 120px 66px;
    }
    @media (max-width: 700px) {
      display:block;
    }
  `,
  Title: styled.div`
    padding: 10px 20px 10px;
    margin-bottom: 0.25rem;
    font-weight: 600;
    font-size: 1.20rem;
    align-self: start;

    @media (min-width: 1720px) {
      font-size: 1.45rem;
    }
    @media (max-width: 960px) {
      font-size: 1.02rem;
    }
  `,
  Info: styled.div`
    padding: 10px 20px 10px;

    @media (min-width: 1280px) {
      font-size: 1.3rem;
    }
  `,

  Embed: styled.iframe`
    width: 100%;
    min-height: 280px;
  `,
  Thumbnail: styled.div`
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    min-height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    color: #3498DB;
    cursor: pointer;
    text-shadow: 0px 0px 15px #0B409C;
    :hover {
      color: #0B409C;
    }
  `,

  Footer: styled.div`
    ${StyledFooter}
    align-self: end;
  `,
  Icon: styled.i`
    ${StyledIcon}
  `
}


class VideoInfo extends React.Component {
  state = {
    vidoeClicked: false
  };

  onThumbnailClick = () => {
    this.setState(() => ({
      videoClicked: true
    }))
  }
  render () {
    const { video, hideComponents } = this.props
    const { videoClicked } = this.state
    const fullLink = `${config.frontend.base}/video/${video._id}`
    return (
      <Styled.Video>
        <Styled.Title style={{ marginBottom: '0.15rem' }}>
          <Link href={`/video?id=${video._id}`} as={`/video/${video._id}`}>
            <a>{video.name}</a>
          </Link>
        </Styled.Title>
        { videoClicked ?
          <Styled.Embed src={getEmbed(video.link)} frameBorder="0" allowFullScreen /> :
          <Styled.Thumbnail background={getThumbnail(video.link)} onClick={this.onThumbnailClick}>
            <div><i className="icon-play" /></div>
          </Styled.Thumbnail>
        }
        <Styled.Info>
          {
            !hideComponents.conference && video.conference &&
            <ConferenceSticky conference={video.conference} />
          }

          {
            !hideComponents.speaker && video.speaker &&
            <SpeakerSticky speaker={video.speaker}/>
          }

          {
            !hideComponents.tag && video.tags.length > 0 &&
            <TagSticky tags={video.tags}/>
          }
        </Styled.Info>
        <Styled.Footer>
          <div>
            <span>Share on: </span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${fullLink}`}>
              <Styled.Icon className="icon-facebook"/>
            </a>
            <a href={`https://twitter.com/home?status=Watch '${video.name}' on Confbar: ${fullLink}`}>
              <Styled.Icon className="icon-twitter"/>
            </a>
          </div>
        </Styled.Footer>
      </Styled.Video>
    )
  }
}

VideoInfo.propTypes = {
  video: object.isRequired,
  hideComponents: object
}

const VideoList = ({ videos, hideComponents }) => (
  <Styled.List>
    {
      Array.isArray(videos) && videos.map(v => (
        <VideoInfo
          video={v}
          hideComponents={hideComponents}
          key={v._id}
        />
      ))
    }
  </Styled.List>
)

VideoList.propTypes = {
  videos: array.isRequired,
  hideComponents: object
}

VideoList.defaultProps = {
  hideComponents: {}
}

export default VideoList
