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
