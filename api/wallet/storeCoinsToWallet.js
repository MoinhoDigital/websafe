import { deserialiseArray } from '../../utils'

export default async (appHandle, serialisedWallet, coins, key) => {
  try {
    console.log('Saving coins in the wallet on the network...')
    const walletHandle = await window.safeMutableData.fromSerial(appHandle, deserialiseArray(serialisedWallet))
    const encKey = await window.safeMutableData.encryptKey(walletHandle, key)
    const currentCoinsRaw = await window.safeMutableData.get(walletHandle, encKey)
    const mutHandle = await window.safeMutableData.newMutation(appHandle)
    const encValue = await window.safeMutableData.encryptValue(walletHandle, JSON.stringify(coins))
    await window.safeMutableDataMutation.update(mutHandle, encKey, encValue, currentCoinsRaw.version + 1)
    await window.safeMutableData.applyEntriesMutation(walletHandle, mutHandle)
    window.safeMutableData.free(walletHandle)
    window.safeMutableDataMutation.free(mutHandle)
    return true
  } catch (err) {
    console.log('Error on storing coins to wallet', err)
  }
}
