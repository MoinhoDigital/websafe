export default async (appHandle, coinHandle, pk, coin) => {
  try {
    const coinData = JSON.parse(coin.buf.toString())
    console.log('Coin data: ', coinData)
    // TODO: implement ownership check using sign keys
    if (coinData.owner !== pk) {
      console.log('Ownership doesnt match', pk, coinData)
    }
    return Promise.resolve(coinData)
  } catch (err) {
    console.log('Error checking ownership:', err)
  }
}
