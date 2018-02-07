import config from '../config'


export const getFullLink = (type, item) => {
  return `${config.frontend.base}/${type}/${item._id}`;
}

export const getFBShareLink = (type, item) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${getFullLink(type, item)}`
}

export const getTwitterShareLink = (status) => {
  return `https://twitter.com/home?status=${status}`
}
