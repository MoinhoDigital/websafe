import { genId, encrypt, genXorName } from '../../utils'

export default async function (appHandle, pk, coinIds, assetInfo) {
  const { name, key, tagType } = assetInfo
  const txId = genId()
  let tx = {
    coinIds,
    name,
    date: (new Date()).toUTCString()
  }

  console.log('Sending TX notification to recipient. TX id: ', txId)
  try {
    const xorName = await genXorName(appHandle, pk)
    const txInboxHandle = await window.safeMutableData.newPublic(appHandle, xorName, tagType)
    const encPk = await window.safeMutableData.get(txInboxHandle, key)
    const encryptedTx = await encrypt(appHandle, JSON.stringify(tx), encPk.buf.toString())
    const mdHandle = await window.safeMutableData.newMutation(appHandle)
    await window.safeMutableDataMutation.insert(mdHandle, txId, encryptedTx)
    await window.safeMutableData.applyEntriesMutation(txInboxHandle, mdHandle)
    await window.safeMutableData.free(txInboxHandle)
    await window.safeMutableDataMutation.free(mdHandle)
    return txId
  } catch (err) {
    console.log('Error on sendTxNotif', err)
    return err
  }
}
