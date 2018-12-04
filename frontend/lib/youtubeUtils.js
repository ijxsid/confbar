import parseURI from './parseURI'
import config from '../config'

const { autoplay } = typeof config.youtube === 'undefined' && 1

export function getThumbnail (videoLink) {
  const videoLinkParsed = parseURI(videoLink)
  const videoId = videoLinkParsed.queryKey.v

  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}
export function getEmbed (videoLink) {
  const videoLinkParsed = parseURI(videoLink)
  const videoId = videoLinkParsed.queryKey.v

  return `https://youtube.com/embed/${videoId}?autoplay=${autoplay}`
}
