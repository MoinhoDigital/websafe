import genXorName from '../utils/genXorName'

export default async (appHandle, input) => {
  const serviceInfo = {
    key: '_publicNames',
    tagType: 15001,
    name: `Services container for: ${name}`,
    description: `Container where all the services are mapped for the Public Name: ${name}`
  }
  try {
    const { key, tagType, name, description } = serviceInfo
    if (!input) {
      console.log('Invalid publicName')
    }
    const hashedName = await genXorName(appHandle, input.trim())
    const mdHandle = await window.safeMutableData.newPublic(appHandle, hashedName, tagType)
    await window.safeMutableData.quickSetup(mdHandle, {}, name, description)
    const containerHandle = await window.safeApp.getContainer(appHandle, key)
    const entriesHandle = await window.safeMutableData.getEntries(containerHandle)
    const mutHandle = await window.safeMutableDataEntries.mutate(entriesHandle)
    await window.safeMutableDataMutation.insert(mutHandle, input, hashedName)
    await window.safeMutableData.applyEntriesMutation(containerHandle, mutHandle)
    await window.safeMutableDataMutation.free(mutHandle)
    await window.safeMutableData.free(containerHandle)
    return { success: true }
  } catch (err) {
    console.log('Error creating new Public Name', err)
    return { error: err }
  }
}
