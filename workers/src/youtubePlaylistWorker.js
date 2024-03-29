import google from 'googleapis'
import cliArgs from 'command-line-args'
import config from '../config'
import { collectData, makeVideoData } from './utils'
import { addVideo, editVideo } from './api'

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


async function main () {
  const items = await collectData(youtube.playlistItems.list, {
    auth: API_KEY,
    part: 'snippet, contentDetails, status',
    playlistId: playlistId,
    maxResults: 50
  })

  items.forEach(async function (video) {
    let data = await addVideo(makeVideoData(video, conferenceId, playlistId))
    console.log('Added =>', data)

    if (data.err) {
      data = await editVideo(data.id, makeVideoData(video, conferenceId, playlistId))
      console.log('Edited =>', data)
    }
  })
}

main()
