const ora = require('ora')
const error = require('../utils/error')

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
	const path = "./node_modules/cljs-js"

	try {
		console.log(`.... 👏👏👏 clojurescript <-> javascript made simple!`)
		
		console.log(`.... getting started,`)
		const spinner = ora().start()
		console.log(`.... installing shadow-cljs locally if not installed`)
		await cmd('npm list shadow-cljs || npm install shadow-cljs')
		spinner.stop()

		console.log(`.... generating things, `)
		const spinner = ora().start()
		await cmd(`mkdir -p cljs && cd cljs && mkdir -p ${nodejs} && cd ${nodejs} && mkdir -p core`);
		await cmd(`cd cljs && mkdir -p ${web} && cd ${web} && mkdir -p core`);
		await cmd(`cp ${path}/cp_src/${nodejs}_fn.cljs ./cljs/${nodejs}/core`);
		await cmd(`mv ./cljs/${nodejs}/core/${nodejs}_fn.cljs ./cljs/${nodejs}/core/fn.cljs`);
		
		await cmd(`cp ${path}/cp_src/${web}_fn.cljs ./cljs/${web}/core`);
		await cmd(`mv ./cljs/${web}/core/${web}_fn.cljs ./cljs/${web}/core/fn.cljs`);

		await cmd(`cp ${path}/cp_src/shadow-cljs.edn ./`);
		spinner.stop()

		console.log(`.... compiling clojurescript, `)
		const spinner = ora().start()
		await cmd('shadow-cljs compile node');
		await cmd('shadow-cljs compile web');
		spinner.stop()

		console.log(`.... generating interop.js to show interop cljs->js sample,`)
		await cmd(`cp ${path}/cp_src/interop.js ./`);
		
		console.log(`.... done!`)
		console.log(`try!`)
		console.log(`node ./interop.js`)
		console.log(`.... happy hacking 🔥 immediately for node.js => ./cljs/${nodejs}/core/fn.cljs`)
		console.log(`.... happy hacking 🔥 immediately for web browser => ./cljs/${web}/core/fn.cljs`)
		console.log(`To apply changes => cljs-js compile`)
		console.log(`(auto-compile feature is going to be added soon using figwheel. 🙂)`)

		spinner.stop()

	} catch (err) {
		spinner.stop()
		console.error(err)
	}
}