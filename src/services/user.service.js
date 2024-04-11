import axios from 'axios'

import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'auth/'
export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials,
    getUsers,
    saveLocalUser,
    remove,
    update,
    // changeScore,
}

window.userService = userService


function getUsers() {
    // return storageService.query('user')
    return httpService.get(BASE_URL + `user`)
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post(BASE_URL + 'login', userCred)
    if (user) return saveLocalUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update({ _id }) {
    // const user = await storageService.get('user', _id)
    // await storageService.put('user', user)

    const user = await httpService.put(`user/${_id}`)

    // When admin updates other user's details, do not update loggedinUser
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}



// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}



// ; (async () => {
//     await userService.signup({ fullname: 'Puki Norma', username: 'puki', password: '123', isAdmin: false })
//     await userService.signup({ fullname: 'Master Adminov', username: 'admin', password: '123', isAdmin: true })
//     await userService.signup({ fullname: 'Muki G', username: 'muki', password: '123', isAdmin: false })
// })()



