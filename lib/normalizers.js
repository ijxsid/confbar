import { normalize, denormalize, schema } from 'normalizr'

export const confById = (function () {
  const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
  const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
  const video = new schema.Entity('videos', {
    tags: [tag],
    speaker: speaker
  }, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {
    videos: [video]
  }, { idAttribute: '_id' })

  return {
    normalize: function (data) {
      const conf = Object.assign({}, data.conference, { videos: data.videos })
      return normalize(conf, conference)
    },
    denormalize: function (id, entities) {
      return denormalize(id, conference, entities)
    },
    denormalizeVideos: function (ids, entities) {
      const conference = new schema.Entity('conferences', {}, { idAttribute: '_id' })
      const video = new schema.Entity('videos', {
        conference: conference,
        tags: [tag],
        speaker: speaker
      }, { idAttribute: '_id' })
      const videoList = { videos: [video] }
      return denormalize({ videos: ids }, videoList, entities)
    }
  }
})()

export function normalizeConfById (data) {
  const conf = Object.assign({}, data.conference, { videos: data.videos })

  const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
  const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
  const video = new schema.Entity('videos', {
    tags: [tag],
    speaker: speaker
  }, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {
    videos: [video]
  }, { idAttribute: '_id' })

  const normalized = normalize(conf, conference)

  console.log(normalized)

  return normalized
}

export function denormalizeConfById (id, entities) {
  const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
  const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
  const video = new schema.Entity('videos', {
    tags: [tag],
    speaker: speaker
  }, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {
    videos: [video]
  }, { idAttribute: '_id' })

  const denormalized = denormalize(id, conference, entities)

  return denormalized
}
