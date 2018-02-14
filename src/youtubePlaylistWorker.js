import google from 'googleapis'
import cliArgs from 'command-line-args'
import config from '../config'
import { collectData } from './utils'
import { addVideo } from './api'

const cliOptionDefinitions = [
  { name: 'playlist', alias: 'p', type: String },
  { name: 'conf', alias: 'c', type: String }
]

const cliOptions = cliArgs(cliOptionDefinitions, {partial: true})

const youtube = google.youtube('v3')

const { API_KEY } = config.youtube

console.log(cliOptions)

const conferenceId = cliOptions.conf

const playlistId = cliOptions.playlist

function makeVideoData (video) {
  return {
    name: video.snippet.title,
    link: `https://www.youtube.com/watch?v=${video.contentDetails.videoId}`,
    description: video.snippet.description,
    channel: video.snippet.channelId,
    conference: conferenceId,
    youtubePrivate: video.status.privacyStatus === 'private'
  }
}

async function main () {
  const items = await collectData(youtube.playlistItems.list, {
    auth: API_KEY,
    part: 'snippet, contentDetails, status',
    playlistId: playlistId,
    maxResults: 50
  })

  items.forEach(async function (video) {
    const data = await addVideo(makeVideoData(video))
    console.log(data)
  })
}

main()
