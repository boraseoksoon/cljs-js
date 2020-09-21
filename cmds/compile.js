const ora = require('ora')

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function cmd(cmd) {
	const exec = require('child_process').exec;
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
			}
			resolve(stdout ? stdout : stderr);
		});
	});
}

module.exports = async (args) => {
  const spinner = ora().start()

  try {
		await cmd('shadow-cljs release node');
		await cmd('shadow-cljs release web');

    spinner.stop()
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}
