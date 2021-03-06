import init from './api/init'
import get from './api/get'
import insert from './api/insert'
import update from './api/update'
import getPublicNames from './api/getPublicNames'
import createPublicName from './api/createPublicName'
import createWallet from './api/wallet/createWallet'
import loadWalletData from './api/wallet/loadWalletData'
import sendTxNotif from './api/wallet/sendTxNotif'
import readTxInboxData from './api/wallet/readTxInboxData'
import createTxInbox from './api/wallet/createTxInbox'
import mintCoin from './api/wallet/mintCoin'
import mintCoins from './api/wallet/mintCoins'
import transferCoin from './api/wallet/transferCoin'
import removeTxInboxData from './api/wallet/removeTxInboxData'
import storeCoinsToWallet from './api/wallet/storeCoinsToWallet'
import checkOwnership from './api/wallet/checkOwnership'
import fetchCoin from './api/wallet/fetchCoin'

export {
    init, get, insert, update,
    getPublicNames, createPublicName,
    mintCoin, createTxInbox, createWallet, loadWalletData, mintCoins,
    sendTxNotif, readTxInboxData, transferCoin, removeTxInboxData,
    storeCoinsToWallet, checkOwnership, fetchCoin
}

export default init
