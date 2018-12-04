
export function makeId ({ length, characters } = {}) {
  let text = ''
  const possible = characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  const stringLength = length || 8

  for (let i = 0; i < stringLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}
