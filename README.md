# WebSafe - Abstracting common patterns for the SAFE Browser

**Still coneceptualizing**

[MaidSafe](https://maidsafe.net) is a brilliant technology being developed since 2016 with the goal of making a fully decentralized and autonomaus web. Currently in **Alpha 2** it's still very difficult to combine it's API in order to create simple interactions, this library aims in abstracting such patterns for use any application for the [SAFE Browser](https://github.com/maidsafe/safe_browser).

We will be using `await/async` functions, since they're are the cleanest way of writing and reading asynchronous code, and are native to the SAFE Browser.

## Usage
`npm i websafe -S`

or

`yarn add websafe`

## API

### Initialization
- `init` - takes care of basic bootstrapping: [initialises](http://docs.maidsafe.net/beaker-plugin-safe-app/#windowsafeappinitialise), [authorises](http://docs.maidsafe.net/beaker-plugin-safe-app/#windowsafeappauthorise) and [connects](http://docs.maidsafe.net/beaker-plugin-safe-app/#windowsafeappconnectauthorised)

### Bootstrapping
- `auth` - checks if user has an account corresponding to a public id and if not create one:   [checks for access](http://docs.maidsafe.net/beaker-plugin-safe-app/#windowsafeappcanaccesscontainer), [gets containers](http://docs.maidsafe.net/beaker-plugin-safe-app/#windowsafeappgetcontainer) (`_public` and `_publicNames`), [encrypts public id](http://docs.maidsafe.net/beaker-plugin-safe-app/#windowsafemutabledataencryptkey), ...

- `setupContainer`

- `setupService`

### GET Mutable Data

### PUT Mutable Data

### GET Immutable Data

### PUT Immutable Data


## Contributing
Please **do** contribute! We need everyones help to figure out common patterns in building applications for the SAFE web.
