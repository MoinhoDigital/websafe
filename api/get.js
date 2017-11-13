
export default async function (appHandle, serviceName, typeTag) {
  let data
  try {
    const serviceHash = await window.safeCrypto.sha3Hash(appHandle, serviceName)
    const serviceHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, typeTag)
    const entriesHandle = await window.safeMutableData.getEntries(serviceHandle)
    await window.safeMutableDataEntries.forEach(entriesHandle, (key, value) => {
      console.log('Key', key)
      console.log('Value', value)
      data.push({ [key]: value })
    })
    await window.safeMutableDataEntries.free(entriesHandle)
    await window.safeMutableData.free(serviceHandle)
    return data
  } catch (err) {
    if (err.code === -103) {
      console.log('Error on GET. Service not found.')
      return null
    } else {
      console.dir('Error on GET:', err)
    }
  }
}
