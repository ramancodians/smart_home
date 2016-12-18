import { AsyncStorage } from 'react-native';

export const storage = {
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync : {
  }
}
