const ora = require('ora')

module.exports = async (args) => {
  const spinner = ora().start()

  try {
    spinner.stop()
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}
