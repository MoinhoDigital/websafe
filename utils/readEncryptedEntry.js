export default async (mdHandle, key) => {
  const encKey = await window.safeMutableData.encryptKey(mdHandle, key)
  const encValue = await window.safeMutableData.get(mdHandle, encKey)
  return window.safeMutableData.decrypt(mdHandle, encValue.buf)
}
