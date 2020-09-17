## cljs-js

cljs-js is a CLI(command line interface) software to make Clojurescript <-> JavaScript interoperability fast, easy and simple as it aims to let you immediately start Clojurescript <-> JavaScript hacking with one liner command.

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
$ npm i cljs-js -save
```

## How to use
1. go to your node.js root project.
2. do it like below

cljs-js will generate scaffolding structures for cljs-js interop.

```bash
$ cljs-js make
```

in ./interop.js generated, you can see clojurescript is exported to javascript.
try node ./interop.js

To apply changes of clojurescript, you need..

```bash
$ cljs-js compile
```

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
