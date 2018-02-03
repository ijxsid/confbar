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

export const videoById = (function () {
  const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
  const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {}, { idAttribute: '_id' })
  const video = new schema.Entity('videos', {
    speaker: speaker,
    tags: [tag],
    conference: conference
  }, { idAttribute: '_id' })

  return {
    normalize: function (data) {
      return normalize(data, video)
    },
    denormalize: function (id, entities) {
      return denormalize(id, video, entities)
    }
  }
})()

export const speakerById = (function () {
  const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {}, { idAttribute: '_id' })
  const video = new schema.Entity('videos', {
    tags: [tag],
    conference: conference
  }, { idAttribute: '_id' })
  const speaker = new schema.Entity('speakers', {
    videos: [video]
  }, { idAttribute: '_id' })

  return {
    normalize: function (data) {
      const speakerData = Object.assign({}, data.speaker, { videos: data.videos })
      return normalize(speakerData, speaker)
    },
    denormalize: function (id, entities) {
      return denormalize(id, speaker, entities)
    },
    denormalizeVideos: function (ids, entities) {
      const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
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

export const tagById = (function () {
  const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {}, { idAttribute: '_id' })
  const video = new schema.Entity('videos', {
    speaker: speaker,
    conference: conference
  }, { idAttribute: '_id' })
  const tag = new schema.Entity('tags', {
    videos: [video]
  }, { idAttribute: '_id' })

  return {
    normalize: function (data) {
      const tagData = Object.assign({}, data.tag, { videos: data.videos })
      return normalize(tagData, tag)
    },
    denormalize: function (id, entities) {
      return denormalize(id, tag, entities)
    },
    denormalizeVideos: function (ids, entities) {
      const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
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
