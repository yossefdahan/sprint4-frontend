
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'



const BASE_URL = 'stay/'
export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getLabels,
    getAmenities,
    getFilterFromParams,
    // getCountries,
    getLatLngFromAddress
}
window.cs = stayService


async function query(filterBy) {
    return httpService.get(BASE_URL, { params: { filterBy } })
}


// async function getCountries(stays) {

//     const countries = stays.map((stay) => stay.loc.country)
//     const uniqueCountries = [...new Set(countries)]
//     return uniqueCountries
// }

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {

    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
    return savedMsg
}


function getEmptyStay() {
    return {
        name: "" || "Ribeira Charming Duplex",
        roomType: "" || "house",
        imgUrls: [],
        price: 0 || utilService.getRandomIntInclusive(200, 2000),
        summary: "" || "Step into style with this elegantly designed rental. Featuring modern amenities and high-quality finishes, this property offers a serene and inviting space for your getaway.",
        capacity: 0 || utilService.getRandomIntInclusive(1, 10),
        bedrooms: 0 || utilService.getRandomIntInclusive(1, 10),
        bathrooms: 0 || utilService.getRandomIntInclusive(1, 10),
        dates: {
            checkIn: '',
            checkOut: '',
        },
        amenities: [] || [
            "TV",
            "Wifi",
            "Kitchen",
            "Washer",
            "Hot tub",
            "Gym",
        ],

        labels: [] || ["Play"],
        host: {
            _id: "",
            fullname: "",
            imgUrl: "",
        },
        loc: {
            region: "",
            country: "",
            countryCode: "",
            city: "",
            address: "",
            lat: 32.01226694679308,
            lng: 34.79751583025042,
        },

        reviews: [],

        // likedByUsers: []
    }
}

function getDefaultFilter() {
    return {
        country: "",
        region: "",
        city: "",
        loc: {
            country: "",
            countryCode: "",
            city: "",
            address: "",
            lat: 0,
            lng: 0,
            region: '',
        },
        dates: {
            checkIn: 0,
            checkOut: 0,
        },
        checkIn: 0,
        checkOut: 0,
        guests: {},
        labels: "",
        amenities: "",
        bedrooms: 0,
        bathrooms: 0,
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
        roomType: "",
        capacity: 0,
        minPrice: '',
        maxPrice: '',
    }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    const checkIn = parseInt(searchParams.get("checkIn"))
    const checkOut = parseInt(searchParams.get("checkOut"))
    const adults = parseInt(searchParams.get('adults'))
    const children = parseInt(searchParams.get('children'))
    const infants = parseInt(searchParams.get('infants'))
    const pets = parseInt(searchParams.get('pets'))


    return {
        city: searchParams.get('city') || defaultFilter.city,
        country: searchParams.get("country") || defaultFilter.country,
        region: searchParams.get("region") || defaultFilter.region,
        checkIn: checkIn ? new Date(checkIn) : defaultFilter.checkIn,
        checkOut: checkOut ? new Date(checkOut) : defaultFilter.checkOut,
        bedrooms: searchParams.get("bedrooms") || defaultFilter.bedrooms,
        bathrooms: searchParams.get("bathrooms") || defaultFilter.bathrooms,
        adults: adults ? adults : defaultFilter.adults,
        children: children ? children : defaultFilter.children,
        infants: infants ? infants : defaultFilter.infants,
        pets: pets ? searchParams.get('pets') : defaultFilter.pets,
        labels: searchParams.get("labels") || defaultFilter.labels,
        amenities: searchParams.get("amenities") || defaultFilter.amenities,
        roomType: searchParams.get("roomType") || defaultFilter.roomType,
        minPrice: searchParams.get("minPrice") || defaultFilter.minPrice,
        maxPrice: searchParams.get("maxPrice") || defaultFilter.maxPrice,

        // dates: searchParams.get('dates') || defaultFilter.dates
    }
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
        'gogo',
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