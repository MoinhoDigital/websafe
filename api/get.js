import fromArrayBuffer from '../utils/fromArrayBuffer'

export default async function (appHandle, serviceName, typeTag, metadata = false) {
  let data = []
  try {
    const serviceHash = await window.safeCrypto.sha3Hash(appHandle, serviceName)
    const serviceHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, typeTag)
    const entriesHandle = await window.safeMutableData.getEntries(serviceHandle)
    await window.safeMutableDataEntries.forEach(entriesHandle, async (key, value) => {
      const rawValue = await fromArrayBuffer(value.buf)
      if (metadata) {
        data.push({ [key]: rawValue })
      } else {
        if (fromArrayBuffer(key) !== '_metadata') {
          data.push({ [key]: rawValue })
        }
      }
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
