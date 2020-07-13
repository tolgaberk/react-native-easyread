import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

const parseUrl = (fileName: string): string => {
  if (Platform.OS === 'ios') {
    return `${RNFS.MainBundlePath}/public/${fileName}`;
  }
  return `file:///android_asset/public/${fileName}`;
};

export default parseUrl;
