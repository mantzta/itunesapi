import { removeChildren, shortenString } from '../utils/utils'
import { CLASSES } from './results.config'

/**
 * @param {Object} album
 * @param {string} album.artistName
 * @param {string} album.artworkUrl100
 * @param {string} album.collectionName
 * @return {HTMLElement}
 */
function _createAlbumTemplate(album) {
  const {
    artistName,
    artworkUrl100,
    collectionName
  } = album

  const $div = document.createElement('div');
  const htmlString = `<article class='${CLASSES.album}'>
  <img class='${CLASSES.img}' src='${artworkUrl100}' alt='${collectionName, 120}' />
  <div class='${CLASSES.artist}'>${shortenString(artistName, 80)}</div>
  <div class='${CLASSES.albumName}'>${shortenString(collectionName, 80)}</div>
  </article>`
  $div.innerHTML = htmlString.trim();

  return $div.firstChild
}

/**
 * @param {Array} albums
 * @param {HTMLElement} $resultsContent
 */
export function displayAlbums(albums, $resultsContent) {
  removeChildren($resultsContent)

  albums.forEach((album) => {
    $resultsContent.appendChild(_createAlbumTemplate(album))
  })
}