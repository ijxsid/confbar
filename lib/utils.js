import config from '../config'


export const getFullLink = (type, item) => {
  switch (type) {
  case 'conference':
  case 'speaker':
  case 'tag':
  case 'video':
    return `${config.frontend.base}/${type}s/${item._id}`
  case 'technology':
    return `${config.frontend.base}/technologies/${item._id}`
  }
}
