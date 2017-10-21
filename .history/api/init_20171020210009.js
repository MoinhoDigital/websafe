export default async function (appInfo, permissions, ownContainer) {
  const appHandle = await window.safeApp.initialise({
    id: 'net.maidsafe.test.webapp.id',
    name: 'WebApp Test',
    vendor: 'MaidSafe Ltd.'
  }, (newState) => {
    console.log('Network state changed to: ', newState)
  })
  console.log('SAFEApp instance initialised and handle returned: ', appHandle)
  const authUri = window.safeApp.authorise(
    appHandle, // the app handle obtained when invoking `initialise`
    {
      _public: ['Insert'], // request to insert into `_public` container
      _other: ['Insert', 'Update'] // request to insert and update in `_other` container
    },
    {own_container: true} // and we want our own container, too
 )
  await window.safeApp.connectAuthorised(appHandle, authUri)
  console.log('The app was authorised & a session was created with the network')
}
