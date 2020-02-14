const io = require('socket.io-client')
const logger = require('./logger')
const {roomPrompt} = require('./prompt')

const socket = io('http://localhost:3000')

socket.on('connect', async () => {
  logger('success', `Connected with ID ${socket.id} ✨`)
  await roomPrompt(socket)
  socket.disconnect()
})
