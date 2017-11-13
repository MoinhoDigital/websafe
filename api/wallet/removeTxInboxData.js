import { genXorName } from '../../utils'

export default async (appHandle, pk, txs, tagType) => {
  const mutHandle = await window.safeMutableData.newMutation(appHandle)
  await Promise.all(txs.map(async (tx) => window.safeMutableDataMutation.remove(mutHandle, tx.id, 1)))
  const xorName = await genXorName(appHandle, pk)
  const txInboxHandle = await window.safeMutableData.newPublic(appHandle, xorName, tagType)
  await window.safeMutableData.applyEntriesMutation(txInboxHandle, mutHandle)
  window.safeMutableData.free(txInboxHandle)
  window.safeMutableDataMutation.free(mutHandle)
}
