/**
 * @param {HTMLElement} $element
 */
export function removeChildren($element) {
  while ($element.firstChild) {
    $element.removeChild($element.firstChild)
  }
}

/**
 * @param {string} str
 * @param {number} limit
 */
export function shortenString(str, limit) {
  if (str.length > limit) {
    return `${str.slice(0, limit)}...`
  }

  return str
}