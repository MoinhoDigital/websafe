# Abstracting common patterns SAFE

[![npm](https://img.shields.io/npm/v/websafe.svg?style=flat-square)](https://www.npmjs.com/package/websafe)

## Why?
[MaidSafe](https://maidsafe.net) is a brilliant technology being developed since 2006 with the goal of making a fully decentralized and autonomaus web. Currently in **Alpha 2** it's still very difficult to combine it's API in order to create meaningful interactions. This library aims in abstracting useful patterns for using in any applications aiming for the [SAFE Browser](https://github.com/maidsafe/safe_browser) and mobile in the future by using [react-native-node](https://github.com/staltz/react-native-node).

## Usage
`npm i websafe -S`

or

`yarn add websafe`

Now you can simply import individual functions to your project

```js
const { init } = require('safeweb')

const { appHandle, authUri } = await init(appInfo, perms, true)

```

We will be using `await/async` functions, since they're are the cleanest way of writing and reading asynchronous code, and are native to the SAFE Browser.

## API

### Basic
#### `init({appInfo}, {permissions}, ownContainer<bool>)`
takes care of basic bootstrapping: [initialises](http://docs.maidsafe.net/beaker-plugin-safe-app/#windowsafeappinitialise), [authorises](http://docs.maidsafe.net/beaker-plugin-safe-app/#windowsafeappauthorise) and [connects](http://docs.maidsafe.net/beaker-plugin-safe-app/#windowsafeappconnectauthorised). Return `appHandle` and `authUri` which are used in other functions.

```js
const appInfo = {
    id: 'app.moinhodigital.0.1',
    name: 'My App',
    vendor: 'moinhodigital'
}

const perms = {
    _public: ['Read', 'Insert', 'Update', 'Delete'],
    _publicNames: ['Read', 'Insert', 'Update', 'Delete']
}

const { appHandle, authUri } = await init(appInfo, perms, true)
```

#### `get([appHandle], [serviceName], [typeTag])`

#### `put([appHandle], [serviceName], [typeTag])`

### Wallet
Mostly based on [safe-coins-wallet](https://github.com/bochaco/safe-coins-wallet) and [safe-faucet](https://github.com/bochaco/safe-faucet).

#### `mintCoin(appHandle, {coinInfo}, pk)`
Mints new coins and returns the new coin's id.

```js
coinInfo = {
    owner: 'GENESIS',
    key: 'coin-data',
    tagType: 21082018
}

const coinXorName = await mintCoin(appHandle, pk, coinInfo)
//662b9e526920183d5e8d098d489f40e353fe537daef51521b0abbf8cb1b92a74
```

#### `sendTxNotif(appHandle, pk, [coinIds], {assetInfo})`
Send notification of a transaction to recipient, returns transaction id.
```js
const assetInfo = {
    name: formData.asset,
    key: '__tx_enc_pk',
    tagType: 20082018
}
await sendTxNotif(appHandle, pk, coinIds, assetInfo)
//
```

#### `createWallet(appHandle, pk, {walletInfo})`
Creates a new wallet with users private key and wallet information, returns serialised handle for the mutable data.
```js
const walletInfo = {
    name: 'Wallet',
    description: 'Container to receive notifications for wallet transactions',
    key: '__coins',
    tagType: 1012017
}
const wallet = await createWallet(appHandle, pk, walletInfo)
// 100,118,37,35,91,42,43,249,44...
```

#### `createTxInbox(appHandle, pk, {inboxInfo})`
Cretes an container to store transactions for the wallet, returns private/public keys for the container.
```js
const inboxInfo = {
    key: '__tx_enc_pk',
    name: 'Transaction Inbox',
    description: 'Container to receive notifications of transactions',
    tagType: 20082018
}
// {
//     pk: "d95571fd086a8e5d27c2dffe239cdeb70d971b0lu0ec860a8f672cfe7790915a",
//     sk: "450dca921a295f55b6a214ffd2cpo221f2e30a91c4042cc874586911186f0efb"
// }
```

#### `loadWalletData(appHandle, serialisedWallet, key)`
Loads data from wallet using wallet serialised wallet handle and wallet key, returns data.
```js
const walletInfo = {
    key: '__coins',
} 
const wallet = await createWallet(appHandle, input, walletInfo)
const walletCoins = await loadWalletData(appHandle, wallet, walletInfo.key)
```

#### `readTxInboxData(appHandle, pk, {inboxInfo})`
Reads transaction inbox data using user private key and inbox information.
```js
const inboxInfo = {
    name: 'Transaction Inbox',
    description: 'Container to receive notifications of transactions',
    tagType: 20082018
    key: '__tx_enc_pk',
    metadataKey: '_metadata',
    tagType: 20082018
}
const inbox = await createTxInbox(appHandle, input, inboxInfo)
inboxInfo.encPk = inbox.pk
inboxInfo.encSk = inbox.sk
const inboxData = await readTxInboxData(appHandle, pk, inboxInfo)
// [Array]
```

#### `fetchCoin(appHandle, coinInfo)`
Fetches a coin's handle by using it's ID, returns coin's MD object and handle.
```js
const coinInfo = {
    id:,
    key:,
    tagType:,
}
const { coin, coinHandle } = await fetchCoin(appHandle, coinInfo)
//
```

#### `checkOwnership(appHandle, pk, coinId)`
Check's ownership of certain coin using user's private key and coin id, returns coin's data.
```js
const { coin, coinHandle } = await fetchCoin(appHandle, coinInfo)
let coinData = await checkOwnership(appHandle, pk, coin.buf.toString())
//
```

#### `transferCoin(appHandle, pk, sk, {coinInfo}, recipient)`
Changes coin ownership using `coinInfo` and `recipient`'s address, returns transaction id.
```js
const coinInfo = {
    id: '6bbb7f94ed0bc4a9b99a008ccc0f537e4b54917eb81bfeca5f1124cd50a4d3d1',
    key: '__coins',
    tagType: 1012017
}
const transfer = await transferCoin(appHandle, pk, inbox.sk, coinInfo, 'Satoshi Nakamoto')
```

#### `removeTxInboxData(appHandle, pk, [txs], tagType)`
Removes transaction from inbox data.


#### `storeCoinsToWallet(appHandle, serialisedWallet, coins, key)`
Store coins to wallet.

### Utils
#### `encrypt(appHandle, input, pk)`
Encrypts any input with the users private key.
```js
const encData = await encrypt(appHandle, input, pk)
// ArrayBuffer()
```

#### `insertEntriesEncrypted(appHandle, mdHandle, {data})`
Inserts encrypted data to mutation. Data is an object.
```js
const emptyData = {
    coins: JSON.stringify([])
}
await insertEntriesEncrypted(appHandle, mdHandle, emptyData)
```

#### `genKeyPair(appHandle)`
Generates a new public/private pair for the user.
```js
const encKeys = await genKeyPair(appHandle)
// {
//     pk: "d95571fd086a8e5d27c2dffe239cdeb70d971b0lu0ec860a8f672cfe7790915a",
//     sk: "450dca921a295f55b6a214ffd2cpo221f2e30a91c4042cc874586911186f0efb"
// }
```

#### `genXorName(appHandle, pk)`
Generates a xor name using users private key.
```js
const xorName = await genXorName(appHandle, pk)
// Array Buffer {}
```

#### `decrypt(appHandle, data, encPk, encSk)`
Decrypts data using users encrypted public and secret keys, returns decrypted data.
```js
const decryptedTxs = await decryptTxs(appHandle, encryptedTxs, encPk, encSk)
// [Array]
```

#### `genId()`
```js
const txId = genId(32)
// 6121128e237df38bb4aff3152109cc415a8aff3255766c07a9c026df8a3cba61
```



## TODO

#### GET Immutable Data

#### PUT Immutable Data


## Contributing
Please **do** contribute! We need everyones help to figure out common patterns in building applications for the SAFE web.
