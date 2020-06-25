import _ from 'lodash';
import {IColorBaseType, IColorsType, IColorTone} from './theme';

type colorMapType = {
  [id: string]: keyof IColorBaseType;
};

export const getColorGroup = (val: string | number): keyof IColorBaseType => {
  const colorMap: colorMapType = {
    '0': 'primary',
    '1': 'secondary',
    '2': 'success',
    '3': 'warning',
    '4': 'danger',
    '5': 'info',
    '6': 'light',
    '7': 'dark',
    '8': 'grey',
    '9': 'link',
  };

  if (typeof val === 'number') {
    return colorMap[`${val % Object.keys(colorMap).length}`];
  }

  return colorMap[
    `${
      _.sum(_.map(_.split(`${val}`, ' '), (v) => v.charCodeAt(0))) %
      Object.keys(colorMap).length
    }`
  ];
};

// eslint-disable-next-line prettier/prettier
export const getColorShade = (colorBase: keyof IColorsType, colorTone?: keyof IColorTone): keyof IColorsType => {
  return (colorBase
    ?.toLowerCase()
    .replace(/lightest|lighter|light|darker|darkest|dark/g, '') +
    _.upperFirst(colorTone)) as keyof IColorsType;
};
