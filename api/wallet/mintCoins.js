import mintCoin from './mintCoin'

export default async function (appHandle, privateKey, assetInfo, asset, amount) {
  let mintedCoins = []
  for (let i = amount; i > 0; i--) {
    console.log('Minting', i)
    const newCoin = await mintCoin(appHandle, privateKey, assetInfo, asset)
    mintedCoins.push(newCoin)
  }
  return mintedCoins
}
