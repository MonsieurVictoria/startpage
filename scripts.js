/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"kpDL5J2md5KfE3MH","label":"entertainment","bookmarks":[{"id":"kevwJVx0I8fBz2EM","label":"invidious","url":"https://vid.puffyan.us/feed/popular"},{"id":"7OZGSIAWWrTZ0Hsg","label":"movies","url":"https://movie-web.app/search/movie"},{"id":"WLYPNg1UO0AjEhmA","label":"fmhy","url":"https://fmhy.pages.dev/"}]},{"id":"KIUPtDxkHXbLvX9O","label":"design tools","bookmarks":[{"id":"H9az9FXDtxqB9sxh","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"6PCK9jAyi46hVqPI","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"GUiGQpQ4apS9lL8Q","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"dBzvl4ELaAZjFk5b","label":"worth reading","bookmarks":[{"id":"HQBxA5PAyY2cpsLw","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"G67zqJKXpYz6lb1u","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"hSI1Z500duzOWSGW","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
