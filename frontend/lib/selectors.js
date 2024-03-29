export function selectConferencesByTerm (state, term) {
  if (!term) return []
  return Object.values(state.data.conferences)
    .filter(conference => conference.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
}

export function selectSpeakersByTerm (state, term) {
  if (!term) return []
  return Object.values(state.data.speakers)
    .filter(speaker => speaker.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
}

export function selectTagsByTerm (state, term) {
  if (!term) return []
  return Object.values(state.data.tags)
    .filter(tag => tag.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
}

export function selectVideosByTerm (state, term) {
  if (!term) return []
  return Object.values(state.data.videos)
    .filter(tag => tag.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
}
