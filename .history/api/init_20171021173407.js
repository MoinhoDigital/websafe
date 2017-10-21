const defaults = {
  info: {
    id: 'net.maidsafe.test.webapp.id',
    name: 'WebApp Test',
    vendor: 'MaidSafe Ltd.'
  },
  permissions: {
    _public: ['Insert'], // request to insert into `_public` container
    _other: ['Insert', 'Update'] // request to insert and update in `_other` container
  }
}

export default async function (appInfo, permissions, ownContainer) {
  // Initialise
  const appHandle = await window.safeApp.initialise({
    id: appInfo.id || defaults.info.id,
    name: appInfo.name || defaults.info.name,
    vendor: appInfo.vendor || defaults.info.vendor
  }, (newState) => {
    console.log('Network state changed to: ', newState)
  })
  console.log('SAFEApp instance initialised and handle returned: ', appHandle)
  // Authorise
  const authUri = window.safeApp.authorise(appHandle, permissions || defaults.permissions)
    {own_container: true} // and we want our own container, too
 )
  await window.safeApp.connectAuthorised(appHandle, authUri)
  console.log('The app was authorised & a session was created with the network')
}
