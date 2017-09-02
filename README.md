# Basic setup for babel based development

# Version 1.0.2

## Install dependencies

`yarn install`

### Installed Babel plugins

Usage examples of following plugins can be seen in
main unit test source file.

* [ `transform-object-rest-spread` ](https://babeljs.io/docs/plugins/transform-object-rest-spread/)
* [ `transform-async-to-generator` ](https://babeljs.io/docs/plugins/transform-async-to-generator/)
* [ `syntax-trailing-function-commas` ](https://babeljs.io/docs/plugins/syntax-trailing-function-commas/)
* -[ `transform-decorators` ](https://babeljs.io/docs/plugins/transform-decorators/)- Conflicts with ESLint parser

## Testing

Before testing `src/` and `test/` source files
MUST be validated by eslint before they will be executed by `mocha`.

`npm test`

### Sequential scenarios for mocha support

See [mocha-steps](https://github.com/rprieto/mocha-steps)
and usage example in main unit test source file.

## ESlint

`npm lint`

# Creating project based on `babel-baseplate` (WIP)

* Clone `babel-baseplate` repository.
* Create `~/bin/` if not exist.
* From repository's directory execute `./bin/create-link.js`
* Reload shell environment
* From any directory execute following to clone 'babel-baseplate` master and
  add `babel-baseplate` as `upstream` remote.
  * Accepts only absolute non existin path as target for cloning.

```
create-babel-baseplate-script.sh $(pwd)/glpl
```

# Scaffolding (WIP)

`
tools/generator.js
tools/gen.js
`
