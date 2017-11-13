import init from './api/init'
import auth from './api/auth'
import get from './api/get'
import put from './api/put'
import getPublicNames from './api/getPublicNames'
import createWallet from './api/wallet/createWallet'
import loadWalletData from './api/wallet/loadWalletData'
import sendTxNotif from './api/wallet/sendTxNotif'
import readTxInboxData from './api/wallet/readTxInboxData'
import createTxInbox from './api/wallet/createTxInbox'
import mintCoin from './api/wallet/mintCoin'
import transferCoin from './api/wallet/transferCoin'
import removeTxInboxData from './api/wallet/removeTxInboxData'
import storeCoinsToWallet from './api/wallet/storeCoinsToWallet'
import checkOwnership from './api/wallet/checkOwnership'
import fetchCoin from './api/wallet/fetchCoin'

export {
    init, auth, get, put,
    getPublicNames,
    mintCoin, createTxInbox, createWallet, loadWalletData,
    sendTxNotif, readTxInboxData, transferCoin, removeTxInboxData,
    storeCoinsToWallet, checkOwnership, fetchCoin
}

export default init
