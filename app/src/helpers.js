import _get from 'lodash.get'

export const convertObjectToArray = (payload) => {
  const fields = _get(payload, 'fields')

  Object.keys(fields).reduce()
}