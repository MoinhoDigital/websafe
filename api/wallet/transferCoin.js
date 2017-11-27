import fetchCoin from './fetchCoin'
import checkOwnership from './checkOwnership'

export default async (appHandle, pk, sk, coinInfo, recipient) => {
  try {
    const { xorName, key } = coinInfo
    console.log("Transfering coin's ownership in the network...", xorName, recipient)
    const { coin, coinHandle } = await fetchCoin(appHandle, coinInfo)
    let coinData = await checkOwnership(appHandle, coinHandle, pk, coin)
    console.log('Coin data', coinData)
    coinData.owner = recipient
    coinData.prev_owner = pk
    console.log("Coin's new ownership: ", coinData)
    const mutHandle = await window.safeMutableData.newMutation(appHandle)
    await window.safeMutableDataMutation.update(mutHandle, key, JSON.stringify(coinData), coin.version + 1)
    await window.safeMutableData.applyEntriesMutation(coinHandle, mutHandle)
    window.safeMutableDataMutation.free(mutHandle)
    window.safeMutableData.free(coinHandle)
    return true
  } catch (err) {
    console.log('Error transfering coin', err)
    return false
  }
}
