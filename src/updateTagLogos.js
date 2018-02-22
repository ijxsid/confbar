import fs from 'fs'
import config from '../config'
import fetch from 'isomorphic-unfetch'
import { collectDataAPI } from './utils'
import { getTechnologies, updateTechnology } from './api'

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
  const tags = await collectDataAPI(getTechnologies)
  tags.forEach(
    async function (tag) {
      if (tag.logo.trim() && (!tag.originalLogoURL)) {
        const res = await fetch(tag.logo)
        const fileName = `tags-${tag._id}-logo.${imageType(res.headers.get('content-type'))}`
        res.body.pipe(
          fs.createWriteStream(`${baseDir}/${fileName}`)
        )
        const updatedTechonology = await updateTechnology(tag._id, {
          logo: `/images/${fileName}`,
          originalLogoURL: tag.logo
        })
        console.log('updated Tag =>', updatedTechonology.name)
      }
    }
  )
}

main()
