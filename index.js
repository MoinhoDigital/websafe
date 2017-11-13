import init from './api/init'
import auth from './api/auth'
import get from './api/get'
import put from './api/put'
import createWallet from './api/wallet/createWallet'
import loadWalletData from './api/wallet/loadWalletData'
import sendTxNotif from './api/wallet/sendTxNotif'
import readTxInboxData from './api/wallet/readTxInboxData'
import createTxInbox from './api/wallet/createTxInbox'
import mintCoin from './api/wallet/mintCoin'

export { init, auth, get, put, mintCoin, createTxInbox, createWallet, loadWalletData, sendTxNotif, readTxInboxData }

export default init
