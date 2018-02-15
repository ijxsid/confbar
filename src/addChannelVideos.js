import google from 'googleapis'
import cliArgs from 'command-line-args'
import config from '../config'
import { collectVideos, makeVideoData } from './utils'
import { getChannels, addVideo, updateChannel } from './api'

const cliOptionDefinitions = [
  { name: 'channel', alias: 'c', type: String }
]

const cliOptions = cliArgs(cliOptionDefinitions, {partial: true})

const youtube = google.youtube('v3')

const { API_KEY } = config.youtube

const currentTime = Date.now()

async function main () {
  const channels = await getChannels()

  channels.slice(1).forEach(async function (channel) {
    console.log('updating channel => ', channel.name)

    const items = await collectVideos(youtube.playlistItems.list, channel.lastFetched || 0, {
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
