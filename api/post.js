import genXorName from '../utils/genXorName'

export default async (appHandle, serviceName, typeTag, data, name, description) => {
  try {
    const serviceHash = await genXorName(appHandle, serviceName)
    const mdHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, typeTag)
    await window.safeMutableData.quickSetup(mdHandle, data, name, description)
  } catch (err) {
    console.log('Error on POST', err)
  }
}
