export function selectConferencesByTerm (state, term) {
  if (!term) return []
  return Object.values(state.data.conferences)
    .filter(conference => conference.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
}
