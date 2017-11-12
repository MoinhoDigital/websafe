export default (buf) => String.fromCharCode.apply(null, new Uint8Array(buf))
