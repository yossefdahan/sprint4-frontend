import { httpService } from "./http.service"
import { storageService } from "./async-storage.service"
import { userService } from "./user.service"
import { utilService } from "./util.service"
const STORAGE_KEY_ORDER_PROCCES = "orderInProcess"
const STORAGE_KEY = "orders"
const BASE_URL = 'order/'

// createOrders()

export const orderService = {
  query,
  remove,
  emptyOrder,
  saveLocalOrder,
  getOrderPending,
  saveOrder,
}

async function query() {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  return httpService.get(BASE_URL)
  // return storageService.query(STORAGE_KEY)
}

function emptyOrder() {
  return {
    hostId: "123dsfsd",
    buyer: {
      _id: "33342df",
      fullname: "yosef",
    },
    totalPrice: 0,
    startDate: "",
    endDate: "",
    guests: {
      adults: 0,
      kids: 0,
    },
    stay: {
      _id: "",
      name: "",
      price: 0,
    },
    msgs: [],
    status: "pending",
  }
}

async function saveOrder(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await httpService.put(`order/${order._id}`, order)
  } else {
    order.createdAt = Date.now()
    savedOrder = await httpService.post(`order`, order)
  }
  return savedOrder
}

async function remove(reviewId) {
  await httpService.delete(`order/${reviewId}`)
  // await storageService.remove("review", reviewId)
}

// async function add({ txt, aboutUserId }) {
//     // const addedReview = await httpService.post(`review`, {txt, aboutUserId})

//     const aboutUser = await userService.getById(aboutUserId)

//     const reviewToAdd = {
//         txt,
//         byUser: userService.getLoggedinUser(),
//         aboutUser: {
//             _id: aboutUser._id,
//             fullname: aboutUser.fullname,
//             imgUrl: aboutUser.imgUrl
//         }
//     }

//     reviewToAdd.byUser.score += 10
//     await userService.update(reviewToAdd.byUser)
//     const addedReview = await storageService.post('review', reviewToAdd)
//     return addedReview
// }

// async function add(order) {
//   order.createdAt = Date.now()
//   await storageService.post(STORAGE_KEY, order)
// }
// async function OrderInProggres(order) {
//     order._id = utilService.makeId(5)
//     return saveLocalOrder(order)
// }

async function saveLocalOrder(order) {
  // order = { _id: order, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score, isAdmin: user.isAdmin }
  // order._id = utilService.makeId(5)
  sessionStorage.setItem(STORAGE_KEY_ORDER_PROCCES, JSON.stringify(order))
  return order
}

function getOrderPending() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_ORDER_PROCCES))
}

function createOrders() {
  let orders = utilService.loadFromStorage(STORAGE_KEY)
  if (!orders || !orders.length) {
    orders = [
      {
        _id: "o1225",
        hostId: "u102",
        buyer: {
          _id: "u103",
          fullname: "User 1",
        },
        totalPrice: 160,
        startDate: "2025/10/15",
        endDate: "2025/10/17",
        guests: {
          adults: 1,
          kids: 2,
        },
        stay: {
          _id: "h102",
          name: "House Of Uncle My",
          price: 80.0,
        },
        msgs: [],
        status: "pending", // approved, rejected
      },

      {
        _id: "o1224",
        hostId: "u102",
        buyer: {
          _id: "u104",
          fullname: "User 1",
        },
        totalPrice: 160,
        startDate: "2025/10/15",
        endDate: "2025/10/17",
        guests: {
          adults: 1,
          kids: 2,
          pets: 1,
        },
        stay: {
          _id: "h102",
          name: "House Of Uncle My",
          price: 80.0,
        },
        msgs: [],
        status: "pending",
      },

      {
        _id: "o1226",
        hostId: "u203",
        buyer: {
          _id: "u205",
          fullname: "Leah Chen",
        },
        totalPrice: 300,
        startDate: "2025/11/05",
        endDate: "2025/11/12",
        guests: {
          adults: 2,
          kids: 1,
        },
        stay: {
          _id: "h203",
          name: "Urban Studio Loft",
          price: 50.0,
        },
        msgs: [],
        status: "approved",
      },
      {
        _id: "o1227",
        hostId: "u207",
        buyer: {
          _id: "u208",
          fullname: "Tom Hansen",
        },
        totalPrice: 260,
        startDate: "2025/12/20",
        endDate: "2025/12/25",
        guests: {
          adults: 2,
          kids: 0,
        },
        stay: {
          _id: "h204",
          name: "Beachfront Bungalow",
          price: 65.0,
        },
        msgs: [],
        status: "pending",
      },
    ]
    utilService.saveToStorage(STORAGE_KEY, orders)
  }
}
