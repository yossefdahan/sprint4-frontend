export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  formatDateToEng,
  formatDate,
  getStarsWithRating,
  getStars,
  getNumOfDays,
  formatIsoDateToYMD,
  formatStayDateRange,
  haversineDistance,
}

function makeId(length = 6) {
  var txt = ""
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ]
  var txt = ""
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + " "
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function formatDateToEng(date) {
  return date ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""
}

function formatDate(date) {
  if (!date) return ""

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const monthIndex = date.getMonth() // getMonth() returns month from 0-11
  const day = date.getDate() // getDate() returns day of the month

  return `${monthNames[monthIndex]} ${day}`
}

function getStarsWithRating(stay) {
  if (!stay.reviews || stay.reviews.length === 0) {
    return { stars: "No reviews yet", averageRating: 0 }
  }

  const totalRating = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
  // Calculate the average and round to 3 decimal places, then convert back to number
  const averageRating = Number((totalRating / stay.reviews.length).toFixed(2))
  let stars = ""

  for (let i = 1; i <= Math.floor(averageRating); i++) {
    stars += "★"
  }

  if (averageRating % 1 >= 0.25 && averageRating % 1 < 0.75) {
    stars += "✬"
  } else if (averageRating % 1 >= 0.75) {
    stars += "★"
  }

  while (stars.length < 5 && stars.length + 0.5 <= 5) {
    stars += "☆"
  }

  return { stars, averageRating }
}

function getStars(stay) {
  if (!stay.reviews || stay.reviews.length === 0) {
    return "No reviews yet"
  }

  const totalRating = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
  const averageRating = totalRating / stay.reviews.length
  let stars = ""

  for (let i = 1; i <= Math.floor(averageRating); i++) {
    stars += "★"
  }

  if (averageRating % 1 >= 0.25 && averageRating % 1 < 0.75) {
    stars += "✬"
  } else if (averageRating % 1 >= 0.75) {
    stars += "★"
  }

  while (stars.length < 5 && stars.length + 0.5 <= 5) {
    stars += "☆"
  }

  return stars
}

function getNumOfDays(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0

  const diffTime = Math.abs(checkOut - checkIn)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function formatIsoDateToYMD(isoDateString) {
  const date = new Date(isoDateString)
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth() + 1)).slice(-2) // Months are 0-based
  const day = ("0" + date.getDate()).slice(-2)
  return `${year}/${month}/${day}`
}

function formatStayDateRange(stay) {
  const checkInDate = new Date(stay.dates.checkIn)
  const checkOutDate = new Date(stay.dates.checkOut)

  const checkInMonth = checkInDate.toLocaleDateString("en-US", { month: "short" })
  const checkInDay = checkInDate.getDate()

  const checkOutMonth = checkOutDate.toLocaleDateString("en-US", { month: "short" })
  const checkOutDay = checkOutDate.getDate()

  return {
    checkIn: `${checkInMonth} ${checkInDay}`,
    checkOut: `${checkOutDay}`,
  }
}

function haversineDistance(coords1, { lat, lng }, isMiles = false) {
  function toRad(x) {
    return (x * Math.PI) / 180
  }

  var R = 6371 // Earth's radius in km
  var dLat = toRad(lat - coords1.lat)
  var dLon = toRad(lng - coords1.lng)
  var lat1 = toRad(coords1.lat)
  var lat2 = toRad(lat)

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c

  return isMiles ? d * 0.621371 : d // Return distance in miles if isMiles is true, otherwise return in kilometers
}
