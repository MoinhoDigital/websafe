import genXorName from '../utils/genXorName'

export default async function (appHandle, container, tagType, key, newValue) {
  try {
    let mutationHandle = await window.safeMutableData.newMutation(appHandle)
    let mdHandle
    if (container === 'ownContainer') {
      mdHandle = await window.safeApp.getOwnContainer(appHandle)
    } else {
      const serviceHash = await genXorName(appHandle, container)
      mdHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, tagType)
    }

    const value = await window.safeMutableData.get(mdHandle, key)
    await window.safeMutableDataMutation.update(mutationHandle, key, JSON.stringify(newValue), value.version + 1)
    await window.safeMutableData.applyEntriesMutation(mdHandle, mutationHandle)
    await window.safeMutableDataMutation.free(mutationHandle)
    await window.safeMutableData.free(mdHandle)
    return true
  } catch (err) {
    console.log('Error on UPDATE', err)
    return undefined
  }
}
