export default async (appHandle) => {
  try {
    let rawKeyPair = {}
    const keyPairHandle = await window.safeCrypto.generateEncKeyPair(appHandle)
    const pubEncKeyHandle = await window.safeCryptoKeyPair.getPubEncKey(keyPairHandle)
    const rawPubEncKey = await window.safeCryptoPubEncKey.getRaw(pubEncKeyHandle)
    window.safeCryptoPubEncKey.free(pubEncKeyHandle)
    rawKeyPair.pk = rawPubEncKey.buffer.toString('hex')
    const secEncKeyHandle = await window.safeCryptoKeyPair.getSecEncKey(keyPairHandle)
    const rawSecEncKey = await window.safeCryptoSecEncKey.getRaw(secEncKeyHandle)
    await window.safeCryptoSecEncKey.free(secEncKeyHandle)
    await window.safeCryptoKeyPair.free(keyPairHandle)
    rawKeyPair.sk = rawSecEncKey.buffer.toString('hex')
    return rawKeyPair
  } catch (err) {
    console.log(err)
    return err
  }
}
