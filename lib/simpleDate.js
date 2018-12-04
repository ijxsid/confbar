export default function simpleDate (d) {
  const parsedDate = new Date(d)
  const today = new Date(d)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  let result = `${months[parsedDate.getMonth()]} ${parsedDate.getDate()}`

  if (today.getFullYear() !== parsedDate.getFullYear()) {
    result += `, ${parsedDate.getFullYear()}`
  }

  return result
}
