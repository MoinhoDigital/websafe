import fetchCoin from './fetchCoin'

export default async (appHandle, pk, coinId) => {
  console.log('Reading coin data...', pk, coinId)
  const { coin, coinHandle } = await fetchCoin(appHandle, coinId)
  window.safeMutableData.free(coinHandle)
  const coinData = JSON.parse(coin.buf.toString())
  console.log('Coin data: ', coinData)
  // TODO: implement ownership check using sign keys
  if (coinData.owner !== pk) {
    console.log('Ownership doesnt match', pk, coinData)
  }
  return Promise.resolve(coinData)
}
