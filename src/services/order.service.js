import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const orderService = {
    add,
    query,
    remove,
    emptyOrder
}

function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return httpService.get(`review${queryStr}`)
    return storageService.query('review')
}

function emptyOrder() {
    return {
        hostId: '',
        buyer: {
            _id: '',
            fullname: '',
        },
        totalPrice: 0,
        startDate: '',
        endDate: '',
        guests: {
            adults: 0,
            kids: 0
        },
        stay: {
            _id: '',
            name: '',
            price: 0
        },
        msgs: [],
        status: "pending"
    }
}


async function remove(reviewId) {
    // await httpService.delete(`review/${reviewId}`)
    await storageService.remove('review', reviewId)
}

async function add({ txt, aboutUserId }) {
    // const addedReview = await httpService.post(`review`, {txt, aboutUserId})

    const aboutUser = await userService.getById(aboutUserId)

    const reviewToAdd = {
        txt,
        byUser: userService.getLoggedinUser(),
        aboutUser: {
            _id: aboutUser._id,
            fullname: aboutUser.fullname,
            imgUrl: aboutUser.imgUrl
        }
    }

    reviewToAdd.byUser.score += 10
    await userService.update(reviewToAdd.byUser)
    const addedReview = await storageService.post('review', reviewToAdd)
    return addedReview
}