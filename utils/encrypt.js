export default async function (appHandle, input, pk) {
  if (Array.isArray(input)) {
    input = input.toString()
  }

  const pubEncKeyHandle = await window.safeCrypto.pubEncKeyKeyFromRaw(appHandle, Buffer.from(pk, 'hex'))
  const encryptSealed = await window.safeCryptoPubEncKey.encryptSealed(pubEncKeyHandle, input)
  return encryptSealed
}
