import google from 'googleapis'
import cliArgs from 'command-line-args'
import config from '../config'
import { collectData } from './utils'
import { addChannel } from './api'

const cliOptionDefinitions = [
  { name: 'channel', alias: 'c', type: String }
]

const cliOptions = cliArgs(cliOptionDefinitions, {partial: true})

const youtube = google.youtube('v3')

const { API_KEY } = config.youtube

console.log(cliOptions)

const conferenceId = cliOptions.conf

const channelId = cliOptions.channel

function makeChannelData (data) {
  return {
    type: 'youtube',
    channelId: channelId,
    name: data.snippet.title,
    description: data.snippet.description,
    logo: data.snippet.thumbnails.high.url,
    uploadsPlayListId: data.contentDetails.relatedPlaylists.uploads,
    videoCount: data.statistics.videoCount,
    subscriberCount: data.statistics.subscriberCount,
    viewCount: data.statistics.viewCount
  }
}

async function main () {
  const items = await collectData(youtube.channels.list, {
    auth: API_KEY,
    part: 'snippet, contentDetails, statistics',
    id: channelId
  })

  const data = await addChannel(makeChannelData(items[0]))
  console.log(data)
}

main()
