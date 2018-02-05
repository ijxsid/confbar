import google from 'googleapis'
import config from '../config'


const youtube = google.youtube('v3')

const { API_KEY } = config.youtube


youtube.playlistItems.list({
  auth: API_KEY,
  part: 'snippet,contentDetails',
  playlistId: 'PLNYkxOF6rcICUD5nBfRdAR6Fveosnqa5m'
}).then(function (err, response) {
  if (err) {
    console.log('Error Occured while accessing this api:', err);
    return
  }
  console.log(response.data)
})