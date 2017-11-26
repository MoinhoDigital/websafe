import fromArrayBuffer from '../utils/fromArrayBuffer'
import genXorName from '../utils/genXorName'

export default async function (appHandle, serviceName, typeTag, key = null, metadata = false) {
  let data = []
  try {
    let serviceHandle
    if (serviceName === 'ownContainer') {
      serviceHandle = await window.safeApp.getOwnContainer(appHandle)
    } else {
      const serviceHash = await genXorName(appHandle, serviceName)
      serviceHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, typeTag)
    }
    const entriesHandle = await window.safeMutableData.getEntries(serviceHandle)
    await window.safeMutableDataEntries.forEach(entriesHandle, async (eKey, eValue) => {
      const rawValue = await fromArrayBuffer(eValue.buf)
      if (key === eKey) {
        data = rawValue
      } else {
        if (metadata) {
          data.push({ [eKey]: rawValue })
        } else {
          if (fromArrayBuffer(eKey) !== '_metadata') {
            data.push({ [eKey]: rawValue })
          }
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
      console.log('Error on GET:', err)
    }
  }
}
