import google from 'googleapis'
import cliArgs from 'command-line-args'
import config from '../config'
import { collectData } from './utils'
import { addChannel } from './api'

const cliOptionDefinitions = [
  { name: 'channel', alias: 'c', type: String },
  { name: 'username', alias: 'u', type: String }
]

const cliOptions = cliArgs(cliOptionDefinitions, {partial: true})

const youtube = google.youtube('v3')

const { API_KEY } = config.youtube

console.log(cliOptions)

const channelId = cliOptions.channel

const channelUsername = cliOptions.username

if (!channelId && !channelUsername) {
  process.exit()
}

const keyForChannel = channelId ? 'id' : 'forUsername'

function makeChannelData (data) {
  return {
    type: 'youtube',
    channelId: channelId || data.id,
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
    [keyForChannel]: channelId || channelUsername
  })

  const data = await addChannel(makeChannelData(items[0]))
  console.log(data)
}

main()
