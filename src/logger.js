const chalk = require('chalk')

module.exports = function logger(type, data) {
  switch (type) {
    case 'success':
      console.log(chalk.bgGreen(chalk.black('SUCCESS')), chalk.bold(data))
      break
    case 'info':
      console.log(chalk.bgYellow(chalk.black('INFO')), chalk.bold(data))
      break
    case 'error':
      console.log(chalk.bgRed(chalk.black('ERROR')), chalk.bold(data))
      break
    case 'message':
      console.log(chalk.bgMagenta(chalk.black('MESSAGE')), chalk.bold(data))
      break
  }
}
