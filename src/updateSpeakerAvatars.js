import fs from 'fs'
import config from '../config'
import fetch from 'isomorphic-unfetch'
import { collectDataAPI } from './utils'
import { getSpeakers, updateSpeaker } from './api'

const baseDir = config.baseImageDir


const imageType = (contentType) => {
  switch (contentType) {
    case 'image/svg+xml':
      return 'svg'
    case 'image/jpeg':
      return 'jpg'
    case 'image/png':
      return 'png'
    case 'image/webp':
      return 'webp'
    case 'image/gif':
      return 'gif'
    case 'image/bmp':
      return 'bmp'
    default:
      return 'png'
  }
}

async function main () {
  const speakers = await collectDataAPI(getSpeakers)
  const currentTime = Date.now()
  speakers.forEach(
    async function (speaker) {
      if (speaker.twitterUsername && (currentTime - speaker.lastModifiedAt > 24 * 60 * 60 * 1000)) {
        const res = await fetch(`https://avatars.io/twitter/${speaker.twitterUsername}`)
        const fileName = `speakers-${speaker.twitterUsername}-avatar.${imageType(res.headers.get('content-type'))}`
        res.body.pipe(
          fs.createWriteStream(`${baseDir}/${fileName}`)
        )
        const updatedSpeaker = await updateSpeaker(speaker._id, {
          avatar: `/images/${fileName}`,
          originalAvatarURL: `https://avatars.io/twitter/${speaker.twitterUsername}`
        })
        console.log('updated Speaker =>', updatedSpeaker.name)
      }
    }
  )
}

main()
