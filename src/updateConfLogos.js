import fs from 'fs'
import config from '../config'
import fetch from 'isomorphic-unfetch'
import { collectDataAPI } from './utils'
import { getConferences, updateConf } from './api'

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
  const confs = await collectDataAPI(getConferences)
  confs.forEach(
    async function (conf) {
      if (conf.logo.trim() && (!conf.originalLogoURL)) {
        const res = await fetch(conf.logo)
        const fileName = `conferences-${conf._id}-logo.${imageType(res.headers.get('content-type'))}`
        res.body.pipe(
          fs.createWriteStream(`${baseDir}/${fileName}`)
        )
        const updatedConf = await updateConf(conf._id, {
          logo: `/images/${fileName}`,
          originalLogoURL: conf.logo
        })
        console.log('updated Conference =>', updatedConf.name)
      }
    }
  )
}

main()
