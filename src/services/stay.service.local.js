import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import { userService } from "./user.service.js"
import { func } from "prop-types"

const STORAGE_KEY = "stay"
createStays()

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayReviews,
  getDefaultFilter,
  getFilterFromParams,
  getCountries,
  getLabels,
  getAmenities,
  getLatLngFromAddress,
}
window.cs = stayService

async function getCountries() {
  const stays = await storageService.query(STORAGE_KEY)
  const countries = stays.map((stay) => stay.loc.country)
  const uniqueCountries = [...new Set(countries)]
  return uniqueCountries
}

async function getLatLngFromAddress(address) {
  const apiKey = "YOUR_API_KEY_HERE"
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === "OK" && data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location
      return { lat, lng }
    } else {
      throw new Error(
        data.status === "ZERO_RESULTS" ? "Address not found" : "Error fetching coordinates"
      )
    }
  } catch (error) {
    console.error("Error in getLatLngFromAddress:", error)
    throw error
  }
}
function getAmenities() {
  const amenities = [
    "TV",
    "Wifi",
    "Kitchen",
    "Air conditioning",
    "Heating",
    "Pool table",
    "Free parking",
    "Gym",
    "Hot tub",
    "Washer",
  ]
  return amenities
}

function getLabels() {
  const labels = [
    "beaches",
    "trending",
    "New",
    "Play",
    "Camping",
    "Houseboats",
    "Trulli",
    "Treehouses",
    "Vineyards",
    "Skiing",
    "Grand pianos",
    "Lake",
    "iconic cities",
    "Boats",
    "Earth homes",
    "OMG!",
    "Off-the-grid",
    "Farms",
    "Ryokans",
    "Amazing views",
    "design",
    "Castles",
    "Historical homes",
    "Caves",
    "A-frames",
    "National parks",
    "Lakefront",
    "Islands",
    "Creative spaces",
    "Dammusi",
    "Riads",
    "Windmills",
    "Adapted",
    "Towers",
    "Barns",
    "Minsus",
    "Ski in out",
    "Campers",
    "country side",
    "Arctic",
    "Shepherds huts",
    "Golfing",
    "Domes",
    "Chefs kitchens",
    "Rooms",
    "Yurts",
    "Bed & breakfasts",
    "Luxe",
    "Hanoks",
    "Top of the world",
    "desert",
    "Amazing pools",
    "mansions",
    "Cycladic homes",
    "surfing",
    "Tiny homes",
    "tropical",
  ]
  return labels
}

async function query(filterBy = getDefaultFilter()) {
  var stays = await storageService.query(STORAGE_KEY)

  if (filterBy.country) {
    const regex = new RegExp(filterBy.country, "i")
    stays = stays.filter((stay) => regex.test(stay.loc.country))
  }

  if (filterBy.capacity) {
    const totalGuests = Object.values(filterBy.guests).reduce(
      (acc, guestCount) => acc + guestCount,
      0
    )
    stays = stays.filter((stay) => stay.capacity >= totalGuests)
  }

  if (filterBy.labels && filterBy.labels.length) {
    const labels = Array.isArray(filterBy.labels) ? filterBy.labels : [filterBy.labels]
    stays = stays.filter((stay) => stay.labels.some((label) => labels.includes(label)))
  }

  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  var savedStay
  if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
  } else {
    // Later, owner is set by the backend
    // stay.host = userService.getLoggedinUser()
    // stay._id = utilService.makeId(5)
    // console.log(stay.loc)
    // const address = `${stay.loc.address}, ${stay.loc.city}, ${stay.loc.country}`
    // const { lat, lng } = await getLatLngFromAddress(address)
    // stay.loc.lat = lat
    // stay.loc.lng = lng
    savedStay = await storageService.post(STORAGE_KEY, stay)
  }
  return savedStay
}

async function addStayReviews(stayId) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)
  if (!stay.reviews) stay.reviews = []

  const review = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  stay.reviews.push(review)
  await storageService.put(STORAGE_KEY, stay)

  return stay
}

function getDefaultFilter() {
  return {
    country: "",
    loc: {
      country: "",
      countryCode: "",
      city: "",
      address: "",
      lat: 0,
      lng: 0,
    },
    dates: {
      checkIn: "",
      checkOut: "",
    },
    checkIn: "",
    checkOut: "",
    guests: {},
    labels: "",
    bedrooms: 0,
    bathrooms: 0,
    adults: 0,
    childern: 0,
    infants: 0,
    pets: 0,

    // amenities: [],
    type: "",
    capacity: 0,
    // priceRange: {
    //   minPrice: '',
    //   maxPrice: '',
    // },
  }
}

function getFilterFromParams(searchParams = {}) {
  const defaultFilter = getDefaultFilter()
  const checkIn = parseInt(searchParams.get("checkIn"))
  const checkOut = parseInt(searchParams.get("checkOut"))
  // const adults = searchParams.get('adults')

  return {
    country: searchParams.get("country") || defaultFilter.country,
    checkIn: checkIn ? new Date(checkIn) : defaultFilter.checkIn,
    checkOut: checkOut ? new Date(checkOut) : defaultFilter.checkOut,
    bedrooms: searchParams.get("bedrooms") || defaultFilter.bedrooms,
    bathrooms: searchParams.get("bathrooms") || defaultFilter.bathrooms,
    // adults: searchParams.get('adults') || defaultFilter.adults,
    // childern: searchParams.get('childern') || defaultFilter.childern,
    // infants: searchParams.get('adults') || defaultFilter.infants,
    // pets: searchParams.get('adults') || defaultFilter.pets,
    // loc: searchParams.get("loc") || defaultFilter.loc,
    // amenities: searchParams.get("amenities") || defaultFilter.amenities,
    type: searchParams.get("type") || defaultFilter.type,
    // priceRange: searchParams.get("priceRange") || defaultFilter.priceRange,
    // guests: searchParams.get('guests') || defaultFilter.guests,
    // dates: searchParams.get('dates') || defaultFilter.dates
  }
}

function getEmptyStay() {
  return {
    name: "" || "Ribeira Charming Duplex",
    type: "" || "house",
    imgUrls: [],
    price: 0 || utilService.getRandomIntInclusive(200, 9000),
    summary: "" || utilService.makeLorem(2),
    capacity: 0 || utilService.getRandomIntInclusive(1, 10),

    amenities: [] || [
      "TV",
      "Wifi",
      "Kitchen",
      "Washer",
      "Hot tub",
      "Gym",
      "Free parking",
      "Pool table",
      "Heating",
      "Air conditioning",
    ],

    labels: [] || ["Top of the world", "Trending", "Play", "Tropical"],
    host: {
      _id: "",
      fullname: "",
      imgUrl: "",
    },
    loc: {
      country: "",
      countryCode: "",
      city: "",
      address: "",
      lat: 8.61308,
      lng: 41.1413,
    },

    reviews: [],

    // likedByUsers: []
  }
}

// TEST DATA

function createStays() {
  let stays = utilService.loadFromStorage(STORAGE_KEY)
  if (!stays || !stays.length) {
    stays = [
      {
        _id: "s101",
        name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: [`/img/5.jpeg`, `/img/3.jpeg`, `/img/1.jpeg`, `/img/2.jpeg`, `/img/4.jpeg`],
        price: 80.0,
        summary: "Fantastic duplex apartment...",
        capacity: 8,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Top of the world", "Trending", "Play", "Tropical"],
        host: {
          _id: "u101",
          fullname: "Davit Pok",
          imgUrl:
            "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
          country: "Portugal",
          countryCode: "PT",
          city: "Lisbon",
          address: "17 Kombo st",
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: "123",
            txt: "Very helpful hosts. Cooked traditional...sadddddddddddddddddddd;ldakdasodasdaspodkasodkasopdkaspdkasdkjaspodkapodkaspodkaspodkaspodkaspodkaspodaskpodaskpodaskpodksapomdofkfdsgls[f,sdpmsdfk[pflsadfksdpofkasskds",
            rate: 5,
            by: {
              _id: "u102",
              fullname: "user2",
              imgUrl: "/img/img2.jpg",
            },
          },
          {
            id: "234",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4.3,
            by: {
              _id: "u102",
              fullname: "user2",
              imgUrl: "/img/img2.jpg",
            },
          },
          {
            id: "2424",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4.9,
            by: {
              _id: "u102",
              fullname: "user2",
              imgUrl: "/img/img2.jpg",
            },
          },
          {
            id: "778",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
              _id: "u102",
              fullname: "user2",
              imgUrl: "/img/img2.jpg",
            },
          },
          {
            id: "4543",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
              _id: "u102",
              fullname: "user2",
              imgUrl: "/img/img2.jpg",
            },
          },
        ],
        likedByUsers: ["mini-user"],
      },
      {
        _id: "s202",
        name: "Cozy Mountain Cabin",
        type: "Cabin",
        imgUrls: [`/img/6.jpg`, `/img/4.jpeg`, `/img/5.jpeg`, `/img/11.jpg`, `/img/7.jpg`],
        price: 120.0,
        summary:
          "A cozy cabin in the heart of the mountains, perfect for a weekend getaway Welcome to our cozy retreat nestled in the heart of the city! This charming home offers a tranquil oasis with its private garden, modern amenities, and stylish decor. Perfect for adventurers and families alike, it's just steps away from vibrant markets, renowned restaurants, and picturesque parks. Enjoy a seamless stay with high-speed Wi-Fi, a fully equipped kitchen, and a guide to local secrets for an unforgettable experience.",
        capacity: 4,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Mountain lover", "Pet friendly", "Cozy", "Great for hiking"],
        host: {
          _id: "u203",
          fullname: "Marco Silva",
          imgUrl: "https://example.com/img/host/marco.jpg",
        },
        loc: {
          country: "Canada",
          countryCode: "CA",
          city: "Banff",
          address: "42 Mountain rd",
          lat: 51.178363,
          lng: -115.570769,
        },
        reviews: [
          {
            id: "rev209",
            txt: "The perfect retreat from city life! The hiking trails were fantastic.Great location with easy access to the subway and local attractions",
            rate: 5,
            by: {
              _id: "u204",
              fullname: "Amy Wong",
              imgUrl: "/img/users/amy.jpg",
            },
          },
          {
            id: "rev202",
            txt: "The perfect retreat from city life! The hiking trails were fantastic.Great location with easy access to the subway and local attractions",
            rate: 5,
            by: {
              _id: "u204",
              fullname: "Amy Wong",
              imgUrl: "/img/users/amy.jpg",
            },
          },
        ],
        likedByUsers: ["nature-lover"],
      },
      {
        _id: "s203",
        name: "Urban Studio Loft",
        type: "Apartment",
        imgUrls: [`/img/5.jpeg`, `/img/6.jpg`, `/img/11.jpg`, `/img/12.jpg`, `/img/4.jpeg`],
        price: 85.0,
        summary: "Modern loft in the city center, perfect for exploring the urban sights.",
        capacity: 2,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["City Life", "Modern", "New listing"],
        host: {
          _id: "u205",
          fullname: "Leah Chen",
          imgUrl: "https://example.com/img/host/leah.jpg",
        },
        loc: {
          country: "USA",
          countryCode: "US",
          city: "New York",
          address: "233 Liberty St",
          lat: 40.712776,
          lng: -74.005974,
        },
        reviews: [
          {
            id: "rev203",
            txt: "Great location with easy access to the subway and local attractions.",
            rate: 4,
            by: {
              _id: "u206",
              fullname: "Raj Patel",
              imgUrl: "/img/users/raj.jpg",
            },
          },
        ],
        likedByUsers: ["urban-explorer"],
      },
      {
        _id: "s204",
        name: "Beachfront Bungalow",
        type: "House",
        imgUrls: [`/img/11.jpg`, `/img/7.jpg`, `/img/5.jpeg`, `/img/10.jpg`, `/img/12.jpg`],
        price: 130.0,
        summary:
          "Private bungalow right on the beach. Wake up to the sound of waves every morning.",
        capacity: 5,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Beach", "Family friendly", "Sunrise view"],
        host: {
          _id: "u207",
          fullname: "Maria Garcia",
          imgUrl: "https://example.com/img/host/maria.jpg",
        },
        loc: {
          country: "Mexico",
          countryCode: "MX",
          city: "Cancun",
          address: "10 Playa Rd",
          lat: 21.161908,
          lng: -86.851528,
        },
        reviews: [
          {
            id: "rev204",
            txt: "The most relaxing vacation ever. The beach is just steps away!",
            rate: 5,
            by: {
              _id: "u208",
              fullname: "Tom Hansen",
              imgUrl: "/img/users/tom.jpg",
            },
          },
        ],
        likedByUsers: ["beach-lover"],
      },
      {
        _id: "s205",
        name: "Beachfront Bungalow",
        type: "House",
        imgUrls: [`/img/2.jpeg`, `/img/4.jpeg`, `/img/5.jpeg`, `/img/9.jpg`, `/img/10.jpg`],
        price: 130.0,
        summary:
          "Private bungalow right on the beach. Wake up to the sound of waves every morning.",
        capacity: 5,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Beach", "Family friendly", "Sunrise view"],
        host: {
          _id: "u207",
          fullname: "Maria Garcia",
          imgUrl: "https://example.com/img/host/maria.jpg",
        },
        loc: {
          country: "Mexico",
          countryCode: "MX",
          city: "Cancun",
          address: "10 Playa Rd",
          lat: 21.161908,
          lng: -86.851528,
        },
        reviews: [
          {
            id: "rev204",
            txt: "The most relaxing vacation ever. The beach is just steps away!",
            rate: 5,
            by: {
              _id: "u208",
              fullname: "Tom Hansen",
              imgUrl: "/img/users/tom.jpg",
            },
          },
        ],
        likedByUsers: ["beach-lover"],
      },
      {
        _id: "s206",
        name: "Urban Studio Loft",
        type: "Apartment",
        imgUrls: [`/img/10.jpg`, `/img/9.jpg`, `/img/5.jpeg`, `/img/11.jpg`, `/img/7.jpg`],
        price: 85.0,
        summary: "Modern loft in the city center, perfect for exploring the urban sights.",
        capacity: 2,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["City Life", "Modern", "New listing"],
        host: {
          _id: "u205",
          fullname: "Leah Chen",
          imgUrl: "https://example.com/img/host/leah.jpg",
        },
        loc: {
          country: "USA",
          countryCode: "US",
          city: "New York",
          address: "233 Liberty St",
          lat: 40.712776,
          lng: -74.005974,
        },
        reviews: [
          {
            id: "rev203",
            txt: "Great location with easy access to the subway and local attractions.",
            rate: 4,
            by: {
              _id: "u206",
              fullname: "Raj Patel",
              imgUrl: "/img/users/raj.jpg",
            },
          },
        ],
        likedByUsers: ["urban-explorer"],
      },

      {
        _id: "s401",
        name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: ["/img/5.jpeg", "/img/3.jpeg", "/img/1.jpeg", "/img/2.jpeg", "/img/4.jpeg"],
        price: 80,
        summary: "Fantastic duplex apartment...",
        capacity: 8,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Top of the world", "Trending", "Play", "Tropical"],
        host: {
          _id: "u401",
          fullname: "Davit Pok",
          imgUrl:
            "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
          country: "Portugal",
          countryCode: "PT",
          city: "Lisbon",
          address: "17 Kombo st",
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: "r401",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
              _id: "u402",
              fullname: "user2",
              imgUrl: "/img/img2.jpg",
            },
          },
          {
            id: "r402",
            txt: "Great location, beautiful views!",
            rate: 5,
            by: {
              _id: "u403",
              fullname: "user3",
              imgUrl: "/img/img3.jpg",
            },
          },
        ],
        likedByUsers: ["mini-user"],
      },
      {
        _id: "s402",
        name: "Cozy Mountain Cabin",
        type: "Cabin",
        imgUrls: ["/img/6.jpg", "/img/4.jpeg", "/img/5.jpeg", "/img/11.jpg", "/img/7.jpg"],
        price: 120,
        summary: "A cozy cabin in the heart of the mountains...",
        capacity: 4,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Mountain lover", "Pet friendly", "Cozy", "Great for hiking"],
        host: {
          _id: "u404",
          fullname: "Marco Silva",
          imgUrl: "https://example.com/img/host/marco.jpg",
        },
        loc: {
          country: "Canada",
          countryCode: "CA",
          city: "Banff",
          address: "42 Mountain rd",
          lat: 51.178363,
          lng: -115.570769,
        },
        reviews: [
          {
            id: "r403",
            txt: "The perfect retreat from city life...",
            rate: 5,
            by: {
              _id: "u405",
              fullname: "Amy Wong",
              imgUrl: "/img/users/amy.jpg",
            },
          },
          {
            id: "r404",
            txt: "Amazing views, cozy and warm cabin.",
            rate: 4,
            by: {
              _id: "u406",
              fullname: "John Doe",
              imgUrl: "/img/users/john.jpg",
            },
          },
        ],
        likedByUsers: ["nature-lover"],
      },
      {
        _id: "43454",
        name: "Cozy Mountain Cabin",
        type: "Cabin",
        imgUrls: ["/img/6.jpg", "/img/4.jpeg", "/img/5.jpeg", "/img/11.jpg", "/img/7.jpg"],
        price: 120,
        summary: "A cozy cabin in the heart of the mountains...",
        capacity: 4,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Mountain lover", "Pet friendly", "Cozy", "Great for hiking"],
        host: {
          _id: "u404",
          fullname: "Marco Silva",
          imgUrl: "https://example.com/img/host/marco.jpg",
        },
        loc: {
          country: "Canada",
          countryCode: "CA",
          city: "Banff",
          address: "42 Mountain rd",
          lat: 51.178363,
          lng: -115.570769,
        },
        reviews: [
          {
            id: "r403",
            txt: "The perfect retreat from city life...",
            rate: 5,
            by: {
              _id: "u405",
              fullname: "Amy Wong",
              imgUrl: "/img/users/amy.jpg",
            },
          },
          {
            id: "r404",
            txt: "Amazing views, cozy and warm cabin.",
            rate: 4,
            by: {
              _id: "u406",
              fullname: "John Doe",
              imgUrl: "/img/users/john.jpg",
            },
          },
        ],
        likedByUsers: ["nature-lover"],
      },
      {
        _id: "32343",
        name: "Cozy Mountain Cabin",
        type: "Cabin",
        imgUrls: ["/img/6.jpg", "/img/4.jpeg", "/img/5.jpeg", "/img/11.jpg", "/img/7.jpg"],
        price: 120,
        summary: "A cozy cabin in the heart of the mountains...",
        capacity: 4,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Mountain lover", "Pet friendly", "Cozy", "Great for hiking"],
        host: {
          _id: "u404",
          fullname: "Marco Silva",
          imgUrl: "https://example.com/img/host/marco.jpg",
        },
        loc: {
          country: "Canada",
          countryCode: "CA",
          city: "Banff",
          address: "42 Mountain rd",
          lat: 51.178363,
          lng: -115.570769,
        },
        reviews: [
          {
            id: "r403",
            txt: "The perfect retreat from city life...",
            rate: 5,
            by: {
              _id: "u405",
              fullname: "Amy Wong",
              imgUrl: "/img/users/amy.jpg",
            },
          },
          {
            id: "r404",
            txt: "Amazing views, cozy and warm cabin.",
            rate: 4,
            by: {
              _id: "u406",
              fullname: "John Doe",
              imgUrl: "/img/users/john.jpg",
            },
          },
        ],
        likedByUsers: ["nature-lover"],
      },
      {
        _id: "dsfsdfsd",
        name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: ["/img/5.jpeg", "/img/3.jpeg", "/img/1.jpeg", "/img/2.jpeg", "/img/4.jpeg"],
        price: 80,
        summary: "Fantastic duplex apartment...",
        capacity: 8,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Top of the world", "Trending", "Play", "Tropical"],
        host: {
          _id: "u401",
          fullname: "Davit Pok",
          imgUrl:
            "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
          country: "Portugal",
          countryCode: "PT",
          city: "Lisbon",
          address: "17 Kombo st",
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: "r401",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
              _id: "u402",
              fullname: "user2",
              imgUrl: "/img/img2.jpg",
            },
          },
          {
            id: "r402",
            txt: "Great location, beautiful views!",
            rate: 5,
            by: {
              _id: "u403",
              fullname: "user3",
              imgUrl: "/img/img3.jpg",
            },
          },
        ],
        likedByUsers: ["mini-user"],
      },
      {
        _id: "4544564",
        name: "Cozy Mountain Cabin",
        type: "Cabin",
        imgUrls: ["/img/6.jpg", "/img/4.jpeg", "/img/5.jpeg", "/img/11.jpg", "/img/7.jpg"],
        price: 120,
        summary: "A cozy cabin in the heart of the mountains...",
        capacity: 4,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Washer",
          "Hot tub",
          "Gym",
          "Free parking",
          "Pool table",
          "Heating",
          "Air conditioning",
        ],
        labels: ["Mountain lover", "Pet friendly", "Cozy", "Great for hiking"],
        host: {
          _id: "u404",
          fullname: "Marco Silva",
          imgUrl: "https://example.com/img/host/marco.jpg",
        },
        loc: {
          country: "Canada",
          countryCode: "CA",
          city: "Banff",
          address: "42 Mountain rd",
          lat: 51.178363,
          lng: -115.570769,
        },
        reviews: [
          {
            id: "r403",
            txt: "The perfect retreat from city life...",
            rate: 5,
            by: {
              _id: "u405",
              fullname: "Amy Wong",
              imgUrl: "/img/users/amy.jpg",
            },
          },
          {
            id: "fdgdf",
            txt: "The perfect retreat from city life...",
            rate: 5,
            by: {
              _id: "u405",
              fullname: "Amy Wong",
              imgUrl: "/img/users/amy.jpg",
            },
          },
          {
            id: "34534",
            txt: "The perfect retreat from city life...",
            rate: 5,
            by: {
              _id: "u405",
              fullname: "Amy Wong",
              imgUrl: "/img/users/amy.jpg",
            },
          },
          {
            id: "adas",
            txt: "The perfect retreat from city life...",
            rate: 5,
            by: {
              _id: "u405",
              fullname: "Amy Wong",
              imgUrl: "/img/users/amy.jpg",
            },
          },
          {
            id: "r404",
            txt: "Amazing views, cozy and warm cabin.",
            rate: 4,
            by: {
              _id: "u406",
              fullname: "John Doe",
              imgUrl: "/img/users/john.jpg",
            },
          },
        ],
        likedByUsers: ["nature-lover"],
      },

    ]
    utilService.saveToStorage(STORAGE_KEY, stays)
  }
}

// storageService.post(STORAGE_KEY, ).then(x => console.log(x))
