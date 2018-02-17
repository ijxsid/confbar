import { normalize, denormalize, schema } from 'normalizr'

export const confNormalizer = (function () {
  const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
  const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {}, { idAttribute: '_id' })

  const videoWithTagsAndSpeaker = new schema.Entity('videos', {
    tags: [tag],
    speaker: speaker
  }, { idAttribute: '_id' })
  const conferenceWithVideo = new schema.Entity('conferences', {
    videos: [videoWithTagsAndSpeaker]
  }, { idAttribute: '_id' })

  return {
    normalizeConfs: function (data) {
      const confList = [conference]
      return normalize(data, confList)
    },
    normalizeById: function (data) {
      const conf = Object.assign({}, data.conference, { videos: data.videos })
      return normalize(conf, conferenceWithVideo)
    },
    denormalizeById: function (id, entities) {
      return denormalize(id, conferenceWithVideo, entities)
    },
    denormalizeVideos: function (ids, entities) {
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

export const videoNormalizer = (function () {
  const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
  const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {}, { idAttribute: '_id' })
  const video = new schema.Entity('videos', {
    speaker: speaker,
    tags: [tag],
    conference: conference
  }, { idAttribute: '_id' })

  return {
    normalizeVideos: function (data) {
      const videoList = [video]
      return normalize(data, videoList)
    },
    normalizeById: function (data) {
      return normalize(data, video)
    },
    denormalizeById: function (id, entities) {
      return denormalize(id, video, entities)
    }
  }
})()

export const speakerNormalizer = (function () {
  const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {}, { idAttribute: '_id' })
  const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
  const videoWithTagsAndConference = new schema.Entity('videos', {
    tags: [tag],
    conference: conference
  }, { idAttribute: '_id' })
  const speakerWithVideo = new schema.Entity('speakers', {
    videos: [videoWithTagsAndConference]
  }, { idAttribute: '_id' })

  return {
    normalizeSpeakers: function (data) {
      const speakerList = [speaker]
      return normalize(data, speakerList)
    },
    normalizeById: function (data) {
      const speakerData = Object.assign({}, data.speaker, { videos: data.videos })
      return normalize(speakerData, speakerWithVideo)
    },
    denormalizeById: function (id, entities) {
      return denormalize(id, speakerWithVideo, entities)
    },
    denormalizeVideos: function (ids, entities) {
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

export const tagNormalizer = (function () {
  const speaker = new schema.Entity('speakers', {}, { idAttribute: '_id' })
  const conference = new schema.Entity('conferences', {}, { idAttribute: '_id' })
  const tag = new schema.Entity('tags', {}, { idAttribute: '_id' })
  const videoWithSpeakerAndConference = new schema.Entity('videos', {
    speaker: speaker,
    conference: conference
  }, { idAttribute: '_id' })
  const tagWithVideos = new schema.Entity('tags', {
    videos: [videoWithSpeakerAndConference]
  }, { idAttribute: '_id' })

  return {
    normalizeTags: function (data) {
      const tagList = [tag]
      return normalize(data, tagList)
    },
    normalizeById: function (data) {
      const tagData = Object.assign({}, data.tag, { videos: data.videos })
      return normalize(tagData, tagWithVideos)
    },
    denormalizeById: function (id, entities) {
      return denormalize(id, tagWithVideos, entities)
    },
    denormalizeVideos: function (ids, entities) {
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
