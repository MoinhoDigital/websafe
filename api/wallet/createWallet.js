import { genXorName, insertEntriesEncrypted } from '../../utils'

export default async (appHandle, pk, walletInfo) => {
  const { name, description, key, tagType } = walletInfo
  const emptyCoins = {
    [key]: JSON.stringify([])
  }
  try {
    const keyPairHandle = await window.safeCrypto.generateEncKeyPair(appHandle)
    const secEncKeyHandle = await window.safeCryptoKeyPair.getSecEncKey(keyPairHandle)
    const secEncKey = await window.safeCryptoSecEncKey.getRaw(secEncKeyHandle)
    const nonce = await window.safeCrypto.generateNonce(appHandle)
    const xorName = await genXorName(appHandle, pk)
    const walletHandle = await window.safeMutableData.newPrivate(appHandle, xorName, tagType, secEncKey.buffer, nonce.buffer)
    await window.safeMutableData.quickSetup(walletHandle, {}, name, description) // TODO: support the case that it exists already
    await insertEntriesEncrypted(appHandle, walletHandle, emptyCoins)
    const serialisedWallet = await window.safeMutableData.serialise(walletHandle)
    window.safeCryptoKeyPair.free(keyPairHandle)
    window.safeCryptoSecEncKey.free(secEncKeyHandle)
    window.safeMutableData.free(walletHandle)
    const walletArr = new Uint8Array(serialisedWallet)
    return walletArr.toString()
  } catch (err) {
    console.log('Error creating wallet', err)
  }
}
