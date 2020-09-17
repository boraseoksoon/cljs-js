const nodejs = require("./cljs_dist/node/index")
const web_cljs = require("./cljs_dist/web/index")

console.log(nodejs.hello("nodejs!")) 
console.log(web_cljs.hello("web!"))

// if (
//   typeof module !== 'undefined' &&
//   typeof module.exports !== 'undefined'
// ) {
// 	exports.nodejs = nodejs
// } else {
// 	window = { web_cljs }
// }