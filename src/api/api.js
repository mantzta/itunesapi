const axios = require('axios')
const jsonpAdapter = require('axios-jsonp')

import { ITUNES_CONFIG, URL } from './api.config'

/**
 * Create a query string out of key value pairs of an object.
 * @param {Object} params
 */
function _createQueryString(params) {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join(`&`);
}

/**
 * @param {*} searchTerm
 * @return {Promise}
 */
export function getAlbums(searchTerm) {
  const params = Object.assign({}, ITUNES_CONFIG, {term: searchTerm})
  const queryString = _createQueryString(params)

  return axios({
    url: `${URL}?${queryString}`,
    adapter: jsonpAdapter
  })
}