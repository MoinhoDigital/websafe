export default async function (appInfo, permissions, ownContainer) {
  try {
    // Initialise
    const appHandle = await window.safeApp.initialise({
      id: appInfo.id,
      name: appInfo.name,
      vendor: appInfo.vendor
    })
    // Authorise
    const authUri = await window.safeApp.authorise(appHandle, permissions, ownContainer)
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
