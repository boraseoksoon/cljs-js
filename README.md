## cljs-js
******* THIS IS VERY SERIOUS PROTOTYPE AND NOT A PRODUCTION READY PROJECT *********

cljs-js is a CLI(command line interface) software to make Clojurescript <-> JavaScript interoperability fast, easy and simple as it aims to let you immediately start Clojurescript <-> JavaScript hacking with one line command.
			
[![NPM Version][npm-image]][npm-url]

## Installation for Node.js

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm i	-g cljs-js
```

## How to use
1. go to your node.js root project that you would like to add clojurescript to.
2. cljs-js make

```bash
$ cljs-js make
```

cljs-js will generate scaffolding structures for cljs-js interop.

structure should look like this
```
```

in ./interop.js generated, you can see clojurescript is exported to javascript.
try node ./interop.js

To apply changes of clojurescript, you need..

```bash
$ cljs-js compile
```

## After cljs-js make, 
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

## Installation for Web Browser 

CDN

```
TO BE INTRODUCED
```

## Features
You can create and use Clojurescript immediately into existing Javascript project.

## Credits
 [clojurescript](https://github.com/clojure/clojurescript)
 [clojure](https://github.com/clojure/clojure)
 [shadow-cljs](https://github.com/thheller/shadow-cljs)
 [figwheel](https://github.com/bhauman/lein-figwheel)

## Contributing

[Contributing Guide](Contributing.md)

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/express.svg
[npm-url]: https://npmjs.org/package/express
