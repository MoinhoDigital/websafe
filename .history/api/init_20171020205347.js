export default async function (appInfo, permissions, ownContainer) {
    const appHandle = await window.safeApp.initialise({
        id: 'net.maidsafe.test.webapp.id',
        name: 'WebApp Test',
        vendor: 'MaidSafe Ltd.'
     }, (newState) => {
        console.log("Network state changed to: ", newState);
     })
}