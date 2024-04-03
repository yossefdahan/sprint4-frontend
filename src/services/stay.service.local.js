
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
const STORAGE_KEY = 'stay'
createStays()

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayReviews
}
window.cs = stayService


async function query() {
    var stays = await storageService.query(STORAGE_KEY)
    // filterBy = { txt: '', price: 0 }
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stays = stays.filter(stay => regex.test(stay.name) || regex.test(stay.description))
    // }
    // if (filterBy.price) {
    //     stays = stays.filter(stay => stay.price <= filterBy.price)
    // }
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
        txt
    }
    stay.reviews.push(review)
    await storageService.put(STORAGE_KEY, stay)

    return stay
}

function getEmptyStay() {
    return {
        name: '' || 'Ribeira Charming Duplex',
        type: '' || 'house',
        imgUrls: [''],
        price: 0 || utilService.getRandomIntInclusive(200, 9000),
        summary: '' || utilService.makeLorem(2),
        capacity: 0 || utilService.getRandomIntInclusive(1, 10),

        amenities: [] || ["TV", "Wifi", "Kitchen", "Smoking allowed", "Pets allowed", "Cooking basics"
        ],

        labels: [] || ["Top of the world", "Trending", "Play", "Tropical"],
        host: {
            _id: "u101",
            fullname: "Davit Pok",
            imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
            country: '' || "Portugal",
            countryCode: '' || "PT",
            city: '' || "Lisbon",
            address: '' | "17 Kombo st",
            lat: -8.61308,
            lng: 41.1413
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
                imgUrls: ["https://e26e9b.jpg", "otherImg.jpg"],
                price: 80.00,
                summary: "Fantastic duplex apartment...",
                capacity: 8,
                amenities: [
                    "TV",
                    "Wifi",
                    "Kitchen",
                    "Smoking allowed",
                    "Pets allowed",
                    "Cooking basics"
                ],
                labels: [
                    "Top of the world",
                    "Trending",
                    "Play",
                    "Tropical"
                ],
                host: {
                    _id: "u101",
                    fullname: "Davit Pok",
                    imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                loc: {
                    country: "Portugal",
                    countryCode: "PT",
                    city: "Lisbon",
                    address: "17 Kombo st",
                    lat: -8.61308,
                    lng: 41.1413
                },
                reviews: [
                    {
                        id: "madeId",
                        txt: "Very helpful hosts. Cooked traditional...",
                        rate: 4,
                        by: {
                            _id: "u102",
                            fullname: "user2",
                            imgUrl: "/img/img2.jpg"
                        }
                    }
                ],
                likedByUsers: ['mini-user']
            },
            {
                _id: "s202",
                name: "Cozy Mountain Cabin",
                type: "Cabin",
                imgUrls: [
                    "https://example.com/img/mountaincabin1.jpg",
                    "https://example.com/img/mountaincabin2.jpg"
                ],
                price: 120.00,
                summary: "A cozy cabin in the heart of the mountains, perfect for a weekend getaway.",
                capacity: 4,
                amenities: [
                    "Fireplace", "Mountain view", "Kitchen", "Pets allowed", "Hiking trails"
                ],
                labels: [
                    "Mountain lover", "Pet friendly", "Cozy", "Great for hiking"
                ],
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
                    lng: -115.570769
                },
                reviews: [
                    {
                        id: "rev202",
                        txt: "The perfect retreat from city life! The hiking trails were fantastic.",
                        rate: 5,
                        by: {
                            _id: "u204",
                            fullname: "Amy Wong",
                            imgUrl: "/img/users/amy.jpg"
                        }
                    }
                ],
                likedByUsers: ['nature-lover']
            },
            {
                _id: "s203",
                name: "Urban Studio Loft",
                type: "Apartment",
                imgUrls: ["https://example.com/img/loft1.jpg", "https://example.com/img/loft2.jpg"],
                price: 85.00,
                summary: "Modern loft in the city center, perfect for exploring the urban sights.",
                capacity: 2,
                amenities: ["Wifi", "Kitchen", "Elevator", "Washer", "Essentials", "Coffee maker"],
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
                    lng: -74.005974
                },
                reviews: [
                    {
                        id: "rev203",
                        txt: "Great location with easy access to the subway and local attractions.",
                        rate: 4,
                        by: {
                            _id: "u206",
                            fullname: "Raj Patel",
                            imgUrl: "/img/users/raj.jpg"
                        }
                    }
                ],
                likedByUsers: ['urban-explorer']
            },
            {
                _id: "s204",
                name: "Beachfront Bungalow",
                type: "House",
                imgUrls: ["https://example.com/img/beachbungalow1.jpg", "https://example.com/img/beachbungalow2.jpg"],
                price: 130.00,
                summary: "Private bungalow right on the beach. Wake up to the sound of waves every morning.",
                capacity: 5,
                amenities: ["Beach view", "Air conditioning", "Private beach", "Sun loungers", "BBQ grill"],
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
                    lng: -86.851528
                },
                reviews: [
                    {
                        id: "rev204",
                        txt: "The most relaxing vacation ever. The beach is just steps away!",
                        rate: 5,
                        by: {
                            _id: "u208",
                            fullname: "Tom Hansen",
                            imgUrl: "/img/users/tom.jpg"
                        }
                    }
                ],
                likedByUsers: ['beach-lover']
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
}

// storageService.post(STORAGE_KEY, ).then(x => console.log(x))




