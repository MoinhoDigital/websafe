export default async function (appHandle, serviceName, typeTag, key, value) {
  try {
    const serviceHash = await window.safeCrypto.sha3Hash(appHandle, serviceName)
    const serviceHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, typeTag)
    const mutationHandle = await window.safeMutableData.newMutation(appHandle)
    await window.safeMutableDataMutation.insert(mutationHandle, key, value)
    await window.safeMutableData.applyEntriesMutation(serviceHandle, mutationHandle)
    await window.safeMutableDataMutation.free(mutationHandle)
    await window.safeMutableData.free(serviceHandle)
  } catch (err) {
    console.log('Error', err)
  }
}
