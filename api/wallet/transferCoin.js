import fetchCoin from './fetchCoin'
import checkOwnership from './checkOwnership'

export default async (appHandle, pk, sk, coinInfo, recipient) => {
  try {
    const { id, key } = coinInfo
    console.log("Transfering coin's ownership in the network...", id, recipient)
    const { coin, coinHandle } = await fetchCoin(appHandle, coinInfo)
    console.log('Coin data', coin, coinHandle)
    let coinData = await checkOwnership(appHandle, pk, coin.buf.toString())
    coinData.owner = recipient
    coinData.prev_owner = pk
    console.log("Coin's new ownership: ", coinData)
    const mutHandle = await window.safeMutableData.newMutation(appHandle)
    await window.safeMutableDataMutation.update(mutHandle, key, JSON.stringify(coinData), coin.version + 1)
    await window.safeMutableData.applyEntriesMutation(coinHandle, mutHandle)
    window.safeMutableDataMutation.free(mutHandle)
    window.safeMutableData.free(coinHandle)
  } catch (err) {
    console.log('Error transfering coin', err)
  }
}
