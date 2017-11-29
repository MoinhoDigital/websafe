import genXorName from '../utils/genXorName'

export default async function (appHandle, serviceInfo, data, isPrivate = false) {
  const { key, tagType, name, description } = serviceInfo
  try {
    let serviceHandle
    if (key === 'ownContainer') {
      serviceHandle = await window.safeApp.getOwnContainer(appHandle)
    } else if (isPrivate) {
      serviceHandle = await window.safeMutableData.newRandomPrivate(appHandle, tagType)
    } else {
      console.log('publik', key)
      const serviceHash = await genXorName(appHandle, key)
      serviceHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, tagType)
      try {
        await window.safeMutableData.quickSetup(serviceHandle, {}, name, description)
        const permSetHandle = await window.safeMutableData.newPermissionSet(appHandle)
        await window.safeMutableDataPermissionsSet.setAllow(permSetHandle, 'Insert')
        await window.safeMutableData.setUserPermissions(serviceHandle, null, permSetHandle, 1)
      } catch (err) {
        console.log('qs', err)
      }
    }
    console.log('ddddd')
    const mutationHandle = await window.safeMutableData.newMutation(appHandle)
    console.log('mutationHandle', mutationHandle)
    for (const [dataKey, dataValue] of Object.entries(data)) {
      console.log('data', dataKey, dataValue)
      await window.safeMutableDataMutation.insert(mutationHandle, dataKey, dataValue)
    }
    console.log('applyEntriesMutation', serviceHandle, mutationHandle, serviceInfo)
    await window.safeMutableData.applyEntriesMutation(serviceHandle, mutationHandle)
    console.log('applied')
    await window.safeMutableDataMutation.free(mutationHandle)
    await window.safeMutableData.free(serviceHandle)
    return data
  } catch (err) {
    console.log('Error on INSERT', err)
    return {
      error: err
    }
  }
}
