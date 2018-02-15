import Promise from 'bluebird'

export const makePromise = (fn, options) =>
  Promise.fromCallback(cb => fn(options, cb)
  )


export async function collectData (fn, options) {
  let resp = await makePromise(fn, options)
  let { items, nextPageToken } = resp.data

  while (nextPageToken) {
    let newOptions = Object.assign({}, options, { pageToken: nextPageToken })
    resp = await makePromise(fn, newOptions)
    items = items.concat(resp.data.items)
    nextPageToken = resp.data.nextPageToken
  }

  return items
}

export async function collectVideos (fn, lastFetched, options) {
  let resp = await makePromise(fn, options)
  let { items, nextPageToken } = resp.data

  while (nextPageToken) {
    console.log(items.map(item => Date.parse(item.snippet.publishedAt)))
    let notFetched = items.map(item => Date.parse(item.snippet.publishedAt) > lastFetched ? 1 : 0)
    notFetched = notFetched.reduce((acc, v) => acc + v, 0) // How many remaining?

    if (notFetched < 1) { // No video remains to be fetched, so return what we have.
      return items
    }
    let newOptions = Object.assign({}, options, { pageToken: nextPageToken })
    resp = await makePromise(fn, newOptions)
    items = items.concat(resp.data.items)
    nextPageToken = resp.data.nextPageToken
  }
  return items
}

export function makeVideoData (video, conferenceId) {
  return {
    name: video.snippet.title,
    link: `https://www.youtube.com/watch?v=${video.contentDetails.videoId}`,
    description: video.snippet.description,
    channel: video.snippet.channelId,
    conference: conferenceId,
    youtubePrivate: video.status.privacyStatus === 'private'
  }
}
