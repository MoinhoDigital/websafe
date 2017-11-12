export default async function (appInfo, permissions, ownContainer) {
  const { id, name, vendor } = appInfo
  if (!id || !name || !vendor) {
    console.log('Init failed. Expected appInfo to be an object containing id, name and vendor.')
    return null
  }
  if (!permissions) {
    console.log('Init failed. Expected permissions.')
    return null
  }
  try {
    // Initialise
    const appHandle = await window.safeApp.initialise({
      id,
      name,
      vendor
    })
    // Authorise
    const authUri = await window.safeApp.authorise(appHandle, permissions, {
      own_container: ownContainer || false
    })
    // Get authorised session
    await window.safeApp.connectAuthorised(appHandle, authUri)
    console.log('The app was authorised & a session was created with the network')
    return {
      appHandle,
      authUri
    }
  } catch (err) {
    console.log(err)
  }
}
