import parseURI from './parseURI'

export function getThumbnail (videoLink) {
  const videoLinkParsed = parseURI(videoLink)
  const videoId = videoLinkParsed.queryKey.v

  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}
