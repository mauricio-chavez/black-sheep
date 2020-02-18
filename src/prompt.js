const prompts = require('prompts')
const logger = require('./logger')
const {checkRoomAvailability, createRoom} = require('./actions/http')

async function roomPrompt(socket) {
  const questions = [
    {
      type: 'select',
      name: 'action',
      message: 'What you wanna do?',
      choices: [
        {title: 'Join a room', value: 'join'},
        {title: 'Create a room', value: 'create'}
      ],
      initial: 0
    },
    {
      type: 'text',
      name: 'room',
      message: prev =>
        prev === 'join' ? `Enter room's name` : `Set room's name`
    }
  ]

  const {action, room} = await prompts(questions)

  switch (action) {
    case 'create':
      const available = await checkRoomAvailability(room)
      if (!available) {
        logger('error', `${room} already exists`)
        return false
      } else {
        const {password} = await prompts({
          type: 'password',
          name: 'password',
          message: `Set room's password`
        })
        await createRoom(room, password, socket.id)
        const {username} = await prompts({
          type: 'text',
          name: 'username',
          message: 'Enter a username'
        })
        socket.emit('joinRoom', {room, password, username})
        return true
      }

    default:
      const {password, username} = await prompts([
        {
          type: 'password',
          name: 'password',
          message: `Enter room's password`
        },
        {
          type: 'text',
          name: 'username',
          message: 'Enter a username'
        }
      ])
      socket.emit('joinRoom', {room, password, username})
      return true
  }
}

module.exports = {
  roomPrompt
}
