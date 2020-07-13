import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import prettyPrint from '../helpers/prettyLog';

const htmlUrl = 'index.html';

// (async () => {
//   if (Platform.OS === 'ios') {
//     const files = await RNFS.readDir(RNFS.MainBundlePath + '/public');
//     console.log('files', files);
//   } else {
//     const files = await RNFS.readDirAssets('public');
//     prettyPrint(files);
//   }
// })();

export default { htmlUrl };
