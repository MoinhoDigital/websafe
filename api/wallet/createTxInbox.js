import { genKeyPair, genXorName } from '../../utils'

export default async (appHandle, pk, inboxInfo) => {
  try {
    const { name, description, key, tagType } = inboxInfo
    console.log('Creating TX inbox...')
    const encKeys = await genKeyPair(appHandle)
    const baseInbox = {
      [key]: encKeys.pk
    }
    const xorName = await genXorName(appHandle, pk)
    const inboxHandle = await window.safeMutableData.newPublic(appHandle, xorName, tagType)
    await window.safeMutableData.quickSetup(inboxHandle, baseInbox, name, description)
    const permSetHandle = await window.safeMutableData.newPermissionSet(appHandle)
    await window.safeMutableDataPermissionsSet.setAllow(permSetHandle, 'Insert')
    await window.safeMutableData.setUserPermissions(inboxHandle, null, permSetHandle, 1)
    window.safeMutableDataPermissionsSet.free(permSetHandle)
    window.safeMutableData.free(inboxHandle)
    return encKeys
  } catch (err) {
    console.log('Error creating tx inbox', err)
  }
}
