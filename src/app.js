import { getAlbums } from './api/api'
import { displayAlbums } from './results/results'
import { createPagination } from './paging/paging'

import { CLASSES, SELECTORS } from './app.config'

const _$ = {} // Global storage for DOM elements
let searchedValue

/**
 * Retrieves elements needed for js
 */
function _setElements() {
  _$.searchButton = document.querySelector(SELECTORS.searchButton)
  _$.resultsContent = document.querySelector(SELECTORS.resultsContent)
  _$.resultsChangeView = document.querySelector(SELECTORS.resultsChangeView)
}

/**
 * Encode string to use within URL.
 * @param {string} term
 */
function _getEncodedString(term) {
 return encodeURIComponent(term)
  .replace(/[!'()*]/g, (c) => {
    return '%' + c.charCodeAt(0).toString(16);
  })
}

function _onSearchClick() {
  const $searchField = document.querySelector(SELECTORS.searchField)
  const $resultsPagination = document.querySelector(SELECTORS.resultsPagination)
  let albumsToDisplay

  if (!searchedValue || searchedValue != $searchField.value) {
    searchedValue = $searchField.value

    getAlbums(_getEncodedString(searchedValue))
    .then((result) => {
      if (result.data.resultCount > 0) {
        if (result.data.resultCount >= 20) {
          albumsToDisplay = result.data.results.slice(0, 20)
          createPagination(result.data.results, $resultsPagination, _$.resultsContent)
        } else {
          albumsToDisplay = result.data.results.slice(0, result.data.resultCount)
        }

        displayAlbums(albumsToDisplay, _$.resultsContent)
        _$.resultsChangeView.hidden = false
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

function _onChangeView() {
  if (_$.resultsContent.classList.contains(CLASSES.resultsContentListView)) {
    _$.resultsContent.classList.remove(CLASSES.resultsContentListView)
  } else {
    _$.resultsContent.classList.add(CLASSES.resultsContentListView)
  }
}

_setElements()
_$.searchButton.addEventListener(`click`, _onSearchClick)
_$.resultsChangeView.addEventListener(`click`, _onChangeView)