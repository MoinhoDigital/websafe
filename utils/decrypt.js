import fromArrayBuffer from './fromArrayBuffer'

export default async (appHandle, encryptedTxs, encPk, encSk) => {
  return Promise.all(encryptedTxs.map(async (encTx) => {
    const rawPk = Buffer.from(encPk, 'hex')
    const rawSk = Buffer.from(encSk, 'hex')
    const keyPairHandle = await window.safeCrypto.generateEncKeyPairFromRaw(appHandle, rawPk, rawSk)
    const decrypted = await window.safeCryptoKeyPair.decryptSealed(keyPairHandle, encTx.txInfo)
    window.safeCryptoKeyPair.free(keyPairHandle)
    const parsedTxInfo = JSON.parse(fromArrayBuffer(decrypted))
    return { id: encTx.id, ...parsedTxInfo }
  }))
}
