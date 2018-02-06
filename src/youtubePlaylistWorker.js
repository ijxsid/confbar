import google from 'googleapis'
import config from '../config'
import Promise from 'bluebird'
import { makePromise, collectData } from './utils'

const youtube = google.youtube('v3')

const { API_KEY } = config.youtube

async function main () {
  console.log(await collectData(youtube.playlistItems.list, {
    auth: API_KEY,
    part: 'snippet, contentDetails',
    playlistId: 'PLNYkxOF6rcICUD5nBfRdAR6Fveosnqa5m',
    maxResults: 50
  }))
}

main()
