export default async (appHandle, coinInfo) => {
  const { id, key, tagType } = coinInfo
  const coinHandle = await window.safeMutableData.newPublic(appHandle, Buffer.from(id, 'hex'), tagType)
  const coin = await window.safeMutableData.get(coinHandle, key)
  return { coin, coinHandle }
}
