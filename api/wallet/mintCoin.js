export default async function (appHandle, pk, coinInfo, asset) {
  try {
    const { owner, key, tagType } = coinInfo
    const coin = { owner: pk, prev_owner: owner, asset }
    const coinData = { [key]: JSON.stringify(coin) }
    const coinHandle = await window.safeMutableData.newRandomPublic(appHandle, tagType)
    await window.safeMutableData.quickSetup(coinHandle, coinData)
    const permSetHandle = await window.safeMutableData.newPermissionSet(appHandle)
    await window.safeMutableDataPermissionsSet.setAllow(permSetHandle, 'Update')
    await window.safeMutableData.setUserPermissions(coinHandle, null, permSetHandle, 1)
    await window.safeMutableDataPermissionsSet.free(permSetHandle)
    const nameAndTag = await window.safeMutableData.getNameAndTag(coinHandle)
    const coinXorName = nameAndTag.name.buffer.toString('hex')
    await window.safeMutableData.free(coinHandle)
    return {
      xorName: coinXorName,
      asset
    }
  } catch (err) {
    console.log('Error minting coin', err)
    return err
  }
}
