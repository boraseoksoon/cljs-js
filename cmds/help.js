const menus = {
  main: `
    cljs-js [command] <options>

    make  .............. create default interop structure between cljs and js
		compile ............ compile it using shadow-cljs
    version ............ show package version
    help ............... show help menu for a command`,

	make: `
    cljs-js make`,

	compile: `
    cljs-js compile <options>
		
		--none, -n ..... none optimization
    --optimization, -o ..... optimization to the max`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}
