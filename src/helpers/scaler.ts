import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 350;
const guidelineBaseHeight: number = 680;

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
// eslint-disable-next-line prettier/prettier
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
// eslint-disable-next-line prettier/prettier
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export const getDeviceWidth = () => width;
export const getDeviceHeight = () => height;
