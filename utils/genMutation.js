import genXorName from './genXorName'

export default async function (appHandle, serviceName, typeTag) {
  const serviceHash = await genXorName(appHandle, serviceName)
  const serviceHandle = await window.safeMutableData.newPublic(appHandle, serviceHash, typeTag)
  const mutationHandle = await window.safeMutableData.newMutation(appHandle)
  return {
    serviceHandle,
    mutationHandle
  }
}
