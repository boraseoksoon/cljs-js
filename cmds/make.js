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
		console.log(`.... 🙏🏿👏👏 Clojurescript <-> Javascript made simple!`)
		console.log(`Getting started,`)
		spinner.stop()

		spinner = ora().start()
		if (fs.existsSync(fileToCheck)) {
			//file exists
			console.log(`${fileName} is placed well`);
		} else {
			console.log(`${fileName} is required but seems to NOT be installed.`);
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
		await cmd(`mkdir -p cljs && cd cljs && mkdir -p ${nodejs} && cd ${nodejs} && mkdir -p core`);
		await cmd(`cd cljs && mkdir -p ${web} && cd ${web} && mkdir -p core`);
		await cmd(`cp ${binPath}/cp_src/${nodejs}_fn.cljs ./cljs/${nodejs}/core`);
		await cmd(`mv ./cljs/${nodejs}/core/${nodejs}_fn.cljs ./cljs/${nodejs}/core/fn.cljs`);

		await cmd(`cp ${binPath}/cp_src/${web}_fn.cljs ./cljs/${web}/core`);
		await cmd(`mv ./cljs/${web}/core/${web}_fn.cljs ./cljs/${web}/core/fn.cljs`);

		await cmd(`cp ${binPath}/cp_src/shadow-cljs.edn ./`);
		spinner.stop()

		spinner = ora().start()
		console.log(`.... Compiling generated Clojurescript initally, Wait for a little sec`)
		await cmd('shadow-cljs release node');
		await cmd('shadow-cljs release web');
		spinner.stop()
		console.log(`👍🏻 Done compiling clojurescript!`)

		console.log(`.... Generating sample interop.js to show interop cljs->js sample,`)
		await cmd(`cp ${binPath}/cp_src/interop.js ./`);

		console.log(`💪🏻 All done!`)
		console.log(``)
		console.log(``)
		console.log(`try!`)
		console.log(`node ./interop.js`)
		console.log(`
			From now on, all you need to focus is ..
			1. Go to yourproject/cljs/node/core/fn.cljs for node.js or yourproject/cljs/web/core/fn.cljs for web project.
			2. If you guess you've write some beautiful functions in fn.cljs, then type ''cljs-js compile''
			3. Then, It will compile your Clojurescript files into optimized Javascripts files in yourproject/cljs_dist. 
			
			* Unfortunately, you should manually interop the rest of it currently whenever you change the codes and compile these while in the later version, hopefully I would like to add some features like auto generate interop codes and auto-compile features whenever saved if possible.

			your project
			├── cljs
			│   ├── node
			│   │   └── core
			│   │       └── fn.cljs ==> where you write your Clojure code for Node.js.
			│   └── web
			│       └── core
			│           └── fn.cljs ==> where you write your Clojure code for Web browser platform.
			├── interop.js ==> where interop between cljs <=> js is done.
			├── cljs_dist
			│   ├── node
			│   │   └── index.js ==> after ``cljs-js compile``, cljs/node/core/fn.cljs is compiled down into here.
			│   └── web
			│       └── index.js ==> after ``cljs-js compile``, cljs/web/core/fn.cljs is compiled down into here.
			...
			...
			..
		`)

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