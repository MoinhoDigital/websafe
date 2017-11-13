import { genXorName, fromArrayBuffer, decrypt } from '../../utils'

export default async (appHandle, pk, inboxInfo) => {
  const { encPk, encSk, key, metadataKey, tagType } = inboxInfo
  try {
    let encryptedTxs = []
    const xorName = await genXorName(appHandle, pk)
    const inboxHandle = await window.safeMutableData.newPublic(appHandle, xorName, tagType)
    const entriesHandle = await window.safeMutableData.getEntries(inboxHandle)
    await window.safeMutableDataEntries.forEach(entriesHandle, (dataKey, dataValue) => {
      const id = fromArrayBuffer(dataKey)
      const txInfo = dataValue.buf
          // Ignore the Public encryption key entry, the metadata entry, and soft-deleted entries.
      if (id !== key && id !== metadataKey && txInfo.length > 0) {
        encryptedTxs.push({ id, txInfo })
      }
    })
    const decryptedTxs = await decrypt(appHandle, encryptedTxs, encPk, encSk)
    window.safeMutableDataEntries.free(entriesHandle)
    window.safeMutableData.free(inboxHandle)
    return decryptedTxs
  } catch (err) {
    console.log('Error reading transaction inbox data', err)
  }
}
