
export default async function (appHandle, serviceName, typeTag) {
  try {
    const serviceHash = await window.safeCrypto.sha3Hash(appHandle, serviceName)
    const serviceHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, typeTag)
    const entriesHandle = await window.safeMutableData.getEntries(serviceHandle)
    await window.safeMutableDataEntries.forEach(entriesHandle, (key, value) => {
      console.log('Key', key)
      console.log('Value', value)
    })
    await window.safeMutableDataEntries.free(entriesHandle)
    await window.safeMutableData.free(serviceHandle)
  } catch (err) {
    if (err.code === -103) {
      console.log('Service not found.')
      return null
    } else {
      console.dir(err)
    }
  }
}
