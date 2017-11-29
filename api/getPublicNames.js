import fromArrayBuffer from '../utils/fromArrayBuffer'

export default async (appHandle) => {
  let publicNames = []
  try {
    const access = await window.safeApp.canAccessContainer(appHandle, '_publicNames', ['Read'])
    if (access) {
      const mdHandle = await window.safeApp.getContainer(appHandle, '_publicNames')
      const keysHandle = await window.safeMutableData.getKeys(mdHandle)
      const keysLength = await window.safeMutableDataKeys.len(keysHandle)
      if (keysLength === 0) {
        return []
      }
      await window.safeMutableDataKeys.forEach(keysHandle, async (eKey) => {
        const decryptedKey = fromArrayBuffer(eKey)
        publicNames.push(decryptedKey)
      })
      return publicNames
    }
  } catch (err) {
    console.log('Error on getting publicNames', err)
  }
}

// export const fetchPublicNames = async (app) => {
//   const publicNames = [];

//   const decryptPublicName = (pubNamesCntr, encPubName) => (
//     new Promise(async (resolve, reject) => {
//       try {
//         const decPubNameBuf = await pubNamesCntr.decrypt(encPubName);
//         const decPubName = decPubNameBuf.toString();
//         if (decPubName !== CONSTANTS.MD_META_KEY) {
//           publicNames.push({
//             name: decPubName
//           });
//         }
//         resolve(true);
//       } catch (err) {
//         if (err.code === CONSTANTS.ERROR_CODE.SYMMETRIC_DECIPHER_FAILURE) {
//           return resolve(true);
//         }
//         reject(err);
//       }
//     })
//   );

//   try {
//     const pubNamesCntr = await app.auth.getContainer(CONSTANTS.ACCESS_CONTAINERS.PUBLIC_NAMES);
//     const pubNames = await pubNamesCntr.getKeys();
//     const pubNamesLen = await pubNames.len();
//     if (pubNamesLen === 0) {
//       return [];
//     }
//     const encPubNames = [];
//     await pubNames.forEach((key) => {
//       encPubNames.push(key);
//     });

//     const decryptPubNamesQ = [];
//     for (const encPubName of encPubNames) {
//       decryptPubNamesQ.push(decryptPublicName(pubNamesCntr, encPubName));
//     }

//     await Promise.all(decryptPubNamesQ);
//     return publicNames;
//   } catch (err) {
//     console.error('Fetch public names error :: ', err);
//     throw err;
//   }
// }
