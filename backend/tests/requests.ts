import * as request from 'supertest'
import initializeApp from '../app'

let g_app

async function initializeConnection() {
        g_app = await initializeApp()
}

async function getApp() {
    if(g_app === undefined) {
        await initializeConnection()
    }

    return g_app
}

async function get(url) {
    const app = await getApp()

    return request(app).get(url)
        .set('Accept', 'application/json')
}

async function post(url, body = undefined) {
    const app = await getApp()

    return request(app).post(url)
        .send(body)
        .set('Accept', 'application/json')
}

export {initializeConnection, get, post}