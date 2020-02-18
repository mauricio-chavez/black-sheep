const axios = require('axios').default
const logger = require('../logger')

// TODO change it to production ready setup
const url =
  process.env.NODE_ENV === 'production' ? 'prod' : 'http://localhost:3000'

async function checkRoomAvailability(room) {
  try {
    const {data} = await axios.get(`${url}/room-availability`, {
      params: {room}
    })
    return data.available
  } catch (error) {
    logger('error', error)
    return false
  }
}

async function createRoom(room, password, socketId) {
  try {
    const {
      data: {created}
    } = await axios.post(`${url}/create-room`, {room, password, socketId})

    if (created) {
      logger('success', `Room "${room}" created`)
    } else {
      logger('error', `Couldn't create room "${room}"`)
    }
    return created
  } catch (error) {
    logger('error', error)
    return false
  }
}

module.exports = {
  checkRoomAvailability,
  createRoom
}
