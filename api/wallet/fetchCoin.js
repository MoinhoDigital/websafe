export default async (appHandle, coinInfo) => {
  try {
    const { xorName, key, tagType } = coinInfo
    const coinHandle = await window.safeMutableData.newPublic(appHandle, Buffer.from(xorName, 'hex'), tagType)
    console.log('coin: ', coinHandle, key)
    const coin = await window.safeMutableData.get(coinHandle, key)
    return { coin, coinHandle }
  } catch (err) {
    console.log('Error feching coins: ', err)
  }
}
