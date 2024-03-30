import { Dimensions, Platform } from "react-native";
import Constants from 'expo-constants';

export default {
  get height() { return Dimensions.get('screen').height},
  get width() { return Dimensions.get('screen').width},
  get safeHeight() { return Dimensions.get('window').height},
  get nbHeight() { return Platform.OS === "ios" ? 36 : Dimensions.get('screen').height - Dimensions.get('window').height},
  sbHeight: Constants.statusBarHeight,
  version: Constants.expoConfig?.version,
};
