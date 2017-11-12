export default (strOrBuffer) => {
  const arrItems = strOrBuffer.split(',')
  return Uint8Array.from(arrItems)
}
