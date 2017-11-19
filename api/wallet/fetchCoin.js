export default async (appHandle, coinInfo) => {
  try {
    const { id, key, tagType } = coinInfo
    const coinHandle = await window.safeMutableData.newPublic(appHandle, Buffer.from(id, 'hex'), tagType)
    console.log('coin: ', coinHandle, key)
    const coin = await window.safeMutableData.get(coinHandle, key)
    return { coin, coinHandle }
  } catch (err) {
    console.log('Error feching coins: ', err)
  }
}
