import genXorName from '../utils/genXorName'

export default async function (appHandle, serviceInfo, data, isPrivate = false) {
  const { key, tagType, name, description } = serviceInfo
  try {
    let serviceHandle
    if (key === 'ownContainer') {
      serviceHandle = await window.safeApp.getOwnContainer(appHandle)
    } else {
      const serviceHash = await genXorName(appHandle, key)
      serviceHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, tagType)
    }
    const entriesHandle = await window.safeMutableData.getEntries(serviceHandle)
    const dataLength = await window.safeMutableDataEntries.len(entriesHandle)
    if (dataLength < 1) {
      let mdHandle
      if (key === 'ownContainer' || isPrivate) {
        mdHandle = await window.safeMutableData.newRandomPrivate(appHandle, tagType)
      } else {
        const serviceHash = await genXorName(appHandle, key).toString()
        mdHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, tagType)
      }
      await window.safeMutableData.quickSetup(mdHandle, {}, name, description)
    }
    const mutationHandle = await window.safeMutableData.newMutation(appHandle)
    for (const [dataKey, dataValue] of Object.entries(data)) {
      await window.safeMutableDataMutation.insert(mutationHandle, dataKey, dataValue)
    }
    await window.safeMutableData.applyEntriesMutation(serviceHandle, mutationHandle)
    await window.safeMutableDataMutation.free(mutationHandle)
    await window.safeMutableData.free(serviceHandle)
    return data
  } catch (err) {
    console.log('Error on PUT', err)
    return undefined
  }
}
