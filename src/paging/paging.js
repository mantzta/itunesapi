import { removeChildren } from '../utils/utils'
import { displayAlbums } from '../results/results'

import { CLASSES } from './paging.config'

/**
 * @param {Array}  albums
 * @return {Array} array[0] has first 20 albums, array[1] has next 20 and so on
 */
function _createPaginationArray(albums) {
  const paginationArray = []
  let remainingAlbums = albums

  while (remainingAlbums.length > 0) {
    if (remainingAlbums.length > 20) {
      paginationArray.push(remainingAlbums.slice(0, 20))
      remainingAlbums = remainingAlbums.slice(20, remainingAlbums.length)
    } else {
      paginationArray.push(remainingAlbums.slice(0, remainingAlbums.length))
      remainingAlbums = []
    }
  }

  return paginationArray
}

function _showAlbumsOfPage(domEvent) {
  const $button = domEvent.target
  displayAlbums($button.albums, $button.$resultsContent)
}

/**
 * @param {Array} albums
 * @param {HTMLElement} $resultsPagination
 * @param {HTMLElement} $resultsContent
 */
export function createPagination(albums, $resultsPagination, $resultsContent) {
  const paginationArray = _createPaginationArray(albums)

  removeChildren($resultsPagination)

  paginationArray.forEach((page, index) => {
    const $button = document.createElement('button');
    $button.dataset.page = index
    $button.textContent = index + 1
    $button.classList.add(CLASSES.paginationButton)
    $button.addEventListener(`click`, _showAlbumsOfPage)
    $button.albums = page
    $button.$resultsContent = $resultsContent
    $resultsPagination.appendChild($button)
  })
}