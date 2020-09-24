const ora = require('ora')
const error = require('../utils/error')
const path = require('path')
const fs = require('fs')

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
	const nodejs = "node"
	const web = "web"
	const binPath = path.join(__dirname, '../');

	const rootPath = process.cwd()
	const fileName = "package.json"
	const fileToCheck = `${rootPath}/${fileName}`

	try {
		let spinner = ora().start()
		console.log(`.... 🔥🔥 Clojurescript <-> Javascript made simple!`)
		console.log(`Getting started,`)
		spinner.stop()

		spinner = ora().start()
		if (fs.existsSync(fileToCheck)) {
			//file exists
			console.log(`${fileName} is placed well`);
		} else {
			console.log(`${fileName} is required but seems to NOT be installed.`);
			console.log(`cljs-js must need to work on a node.js project.`);
			console.log(`npm init -y and try again.`);
			spinner.stop()
			return;
		}
		console.log(`🤜 Done initializing the starting package.json`)
		spinner.stop()

		spinner = ora().start()
		await cmd('npm install shadow-cljs')
		console.log(`.... Installing shadow-cljs locally if not installed`)
		spinner.stop()
		console.log(`☝️ Done installing shadow-cljs into the proejct locally.`)		

		spinner = ora().start()
		console.log(`.... Generating Clojurescript things to be able to interop with Javascript,`)
		await cmd(`mkdir -p cljs && cd cljs && mkdir -p cljs && cd cljs && mkdir -p core`);
		await cmd(`cp ${binPath}/cp_src/fn.cljs ./cljs/cljs/core`);
		await cmd(`cp ${binPath}/cp_src/shadow-cljs.edn ./`);
		spinner.stop()

		spinner = ora().start()
		console.log(`.... Compiling generated Clojurescript initally, Wait for a little sec`)
		await cmd('shadow-cljs release node');
		await cmd('shadow-cljs release web');
		spinner.stop()
		console.log(`👍🏻 Done compiling clojurescript!`)

		console.log(`.... Generating sample interop.js to show interop cljs<->js sample for Node.js platform,`)
		await cmd(`cp ${binPath}/cp_src/interop.js ./`);
		console.log(`.... Generating sample interop.html to show interop cljs<->js sample for Web browser,`)
		await cmd(`cp ${binPath}/cp_src/interop.html ./`);

		console.log(`💪🏻 All done!`)
		console.log(`.... happy hacking with Clojurescript 🔥 immediately => ./cljs/cljs/core/fn.cljs`)
		console.log(``)
		console.log(``)
		console.log(`check ./interop.js and ./interop.html to see interop examples`)
		console.log(`(auto-compile feature might be going to be added soon 🙂)`)

	} catch (err) {
		console.error(err)
	}
}