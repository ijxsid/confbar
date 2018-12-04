import google from 'googleapis'
import config from '../config'
import cliArgs from 'command-line-args'
import { collectVideos, makeVideoData, collectDataAPI } from './utils'
import { getChannels, addVideo, updateChannel, getChannelById } from './api'

const youtube = google.youtube('v3')

const cliOptionDefinitions = [
  { name: 'channel', alias: 'c', type: String },
  { name: 'force', alias: 'f', type: Boolean }
]

const cliOptions = cliArgs(cliOptionDefinitions, {partial: true})

const { API_KEY } = config.youtube

const currentTime = Date.now()

async function main () {
  let channels
  if (cliOptions.channel) {
    const channel = await getChannelById(cliOptions.channel)
    channels = [channel.channel]
    console.log(channels)
  } else {
    channels = await collectDataAPI(getChannels)
  }

  channels.forEach(async function (channel) {
    console.log('updating channel => ', channel.name)
    let lastFetched = cliOptions.force || !channel.lastFetched ? 0 : channel.lastFetched
    const items = await collectVideos(youtube.playlistItems.list, lastFetched, {
      auth: API_KEY,
      part: 'snippet, contentDetails, status',
      playlistId: channel.uploadsPlayListId,
      maxResults: 50
    })

    items.forEach(async function (video) {
      const addVideoResp = await addVideo(makeVideoData(video))
      console.log(addVideoResp.info || `${addVideoResp._id} - ${addVideoResp.name}`)
    })
    const updateChannelResp = await updateChannel(channel._id, { lastFetched: currentTime })
    console.log('updated channel => ', updateChannelResp.name)
  })
}

main()
