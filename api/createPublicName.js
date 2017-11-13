import genXorName from '../utils/genXorName'

export default async (appHandle, name) => {
  try {
    if (!name) {
      console.log('Invalid publicName')
    }
    const metaName = `Services container for: ${name}`
    const metaDesc = `Container where all the services are mapped for the Public Name: ${name}`
    const hashedName = await genXorName(name.trim())
    const mdHandle = await window.safeMutableData.newPublic(appHandle, hashedName, 15001)
    await window.safeMutableData.quickSetup(mdHandle, {}, metaName, metaDesc)
    // const containerHandle = await window.safeApp.getContainer(appHandle, '_publicNames')
  } catch (err) {
    console.log('Error creating new Public Names', err)
  }
}
// const insertToMData = async (md, key, val, toEncrypt) => {
//   let keyToInsert = key;
//   let valToInsert = val;

//   try {
//     const entries = await md.getEntries();
//     const mut = await entries.mutate();
//     if (toEncrypt) {
//       keyToInsert = await md.encryptKey(key);
//       valToInsert = await md.encryptValue(val);
//     }
//     await mut.insert(keyToInsert, valToInsert);
//     await md.applyEntriesMutation(mut);
//     return;
//   } catch (err) {
//     console.log('Insert into mutable data error :: ', err);
//     throw err;
//   }
// };
// export const createPublicName = async (app, name) => {
//     try {
//       if (!name) {
//         return reject(makeError(CONSTANTS.APP_ERR_CODE.INVALID_PUBLIC_NAME, 'Invalid publicName'));
//       }
//       const metaName = `Services container for: ${name}`;
//       const metaDesc = `Container where all the services are mapped for the Public Name: ${name}`;
//       const hashedName = await app.crypto.sha3Hash(name.trim());
  
//       const servCntr = await app.mutableData.newPublic(hashedName, CONSTANTS.TYPE_TAG.DNS);
//       await servCntr.quickSetup({}, metaName, metaDesc);
//       const pubNamesCntr = await app.auth.getContainer(CONSTANTS.ACCESS_CONTAINERS.PUBLIC_NAMES);
//       await insertToMData(pubNamesCntr, name, hashedName, true);
//       return;
//     } catch (err) {
//       console.log('Create public name error :: ', err);
//       throw err;
//     }
//   };
