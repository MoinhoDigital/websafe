import { deserialiseArray, readEncryptedEntry, fromArrayBuffer } from '../../utils'

export default async (appHandle, serialisedWallet, key) => {
  console.log('Reading the coin wallet info...')
  const deserialisedWallet = deserialiseArray(serialisedWallet)
  const walletHandle = await window.safeMutableData.fromSerial(appHandle, deserialisedWallet)
  const coins = await readEncryptedEntry(walletHandle, key)
  window.safeMutableData.free(walletHandle)
  return JSON.parse(fromArrayBuffer(coins))
}
