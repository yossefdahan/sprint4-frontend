
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg
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
        stay.host = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

async function addStayMsg(stayId) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
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

        loc: {
            country: '' || "Portugal",
            countryCode: '' || "PT",
            city: '' || "Lisbon",
            address: '' | "17 Kombo st",
            lat: -8.61308,
            lng: 41.1413
        },

        reviews: [],

        likedByUsers: ['mini-user']
    }
}


// TEST DATA
storageService.post(STORAGE_KEY, getEmptyStay()).then(x => console.log(x))




