export default async (appHandle, mdHandle, data) => {
  const mutHandle = await window.safeMutableData.newMutation(appHandle)
  await Promise.all(Object.keys(data).map(async (key) => {
    const encKey = await window.safeMutableData.encryptKey(mdHandle, key)
    const encValue = await window.safeMutableData.encryptValue(mdHandle, data[key])
    return window.safeMutableDataMutation.insert(mutHandle, encKey, encValue)
  }))

  await window.safeMutableData.applyEntriesMutation(mdHandle, mutHandle)
  window.safeMutableDataMutation.free(mutHandle)
}
