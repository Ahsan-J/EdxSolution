import Color from 'color';
import _ from 'lodash';
const validate = (v: any) => !_.isNull(v) && !_.isUndefined(v) && !_.isEmpty(v);

export interface IColorBaseType {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  white: string;
  black: string;
  light: string;
  appBackground: string;
  link: string;
  dark: string;
  grey: string;
}

export interface IColorTone {
  dark: string;
  darker: string;
  darkest: string;
  light: string;
  lighter: string;
  lightest: string;
}

export interface IColorsType extends IColorBaseType {
  primaryDark: string;
  primaryDarker: string;
  primaryDarkest: string;
  primaryLight: string;
  primaryLighter: string;
  primaryLightest: string;
  secondaryDark: string;
  secondaryDarker: string;
  secondaryDarkest: string;
  secondaryLight: string;
  secondaryLighter: string;
  secondaryLightest: string;
  successDark: string;
  successDarker: string;
  successDarkest: string;
  successLight: string;
  successLighter: string;
  successLightest: string;
  infoDark: string;
  infoDarker: string;
  infoDarkest: string;
  infoLight: string;
  infoLighter: string;
  infoLightest: string;
  warningDark: string;
  warningDarker: string;
  warningDarkest: string;
  warningLight: string;
  warningLighter: string;
  warningLightest: string;
  dangerDark: string;
  dangerDarker: string;
  dangerDarkest: string;
  dangerLight: string;
  dangerLighter: string;
  dangerLightest: string;
  greyDark: string;
  greyDarker: string;
  greyDarkest: string;
  greyLight: string;
  greyLighter: string;
  greyLightest: string;
  blackDark: string;
  blackDarker: string;
  blackDarkest: string;
  blackLight: string;
  blackLighter: string;
  blackLightest: string;
  whiteDark: string;
  whiteDarker: string;
  whiteDarkest: string;
  whiteLight: string;
  whiteLighter: string;
  whiteLightest: string;
}

export interface ITypographyType {
  headingColor: string;
  headingFontWeight: string;
  subHeadingColor: keyof IColorsType;
  subHeadingFontWeight: string;
  bodyColor: keyof IColorsType;
  bodyFontWeight: string;
  primaryFontFamily: string;
  secondaryFontFamily: string;
  bodyFontSize: number;
  bodyFontSizeUnit: string;
  bodyLineHeight: string;
  primaryFontFamilyLink: string;
  secondaryFontFamilyLink: string;
}

type ButtonStyleType = {
  borderColor: keyof IColorsType;
  backgroundColor: keyof IColorsType;
  textColor: keyof IColorsType;
};

type ButtonSizeType = {
  fontSize: number;
  fontSizeUnit: string;
  padding: string | number;
  fontWeight: string;
};

export interface IButtonType {
  borderRadius: number;
  primary: ButtonStyleType;
  secondary: ButtonStyleType;
  outline: ButtonStyleType;
  defaultButtonSize: ButtonSizeType;
  smallButtonSize: ButtonSizeType;
  largeButtonSize: ButtonSizeType;
}

export type AppTheme = {
  varFactor?: number;
  touchOpacity?: number;
  colors: IColorsType;
  buttons: IButtonType;
  typography: ITypographyType;
};

const defaultVarFactor: number = 0.15;
const touchOpacityFactor: number = 0.65;

const defaultTheme: AppTheme = {
  varFactor: defaultVarFactor,
  touchOpacity: touchOpacityFactor,
  colors: {
    primary: '#bb2226',
    secondary: '#ff771f',
    success: '#0c8a79',
    warning: '#ffeb4b',
    danger: '#ff4200',
    info: '#558ed5',
    white: '#ffffff',
    black: '#212529',
    light: '#f5f5f5',
    appBackground: '#ffffff',
    link: '#0097a7',
    dark: '#484848',
    grey: '#aaaaaa',
  } as IColorsType,
  buttons: {
    borderRadius: 16,
    primary: {
      borderColor: 'primary',
      backgroundColor: 'primary',
      textColor: 'white',
    },
    secondary: {
      borderColor: 'secondary',
      backgroundColor: 'white',
      textColor: 'secondary',
    },
    outline: {
      borderColor: 'primary',
      backgroundColor: 'white',
      textColor: 'primary',
    },
    defaultButtonSize: {
      fontSize: 12,
      fontSizeUnit: 'px',
      padding: '8px 18px 8px 18px',
      fontWeight: '500',
    },
    smallButtonSize: {
      fontSize: 10,
      fontSizeUnit: 'px',
      padding: '6px 14px 6px 14px',
      fontWeight: '500',
    },
    largeButtonSize: {
      fontSize: 14,
      fontSizeUnit: 'px',
      padding: '12px 24px 12px 24px',
      fontWeight: '500',
    },
  } as IButtonType,
  typography: {
    headingColor: 'primary',
    headingFontWeight: '700',
    subHeadingColor: 'secondary',
    subHeadingFontWeight: '600',
    bodyColor: 'black',
    bodyFontWeight: '400',
    primaryFontFamily: 'Open Sans',
    secondaryFontFamily: 'Roboto',
    bodyFontSize: 14,
    bodyFontSizeUnit: 'px',
    bodyLineHeight: '1.5',
  } as ITypographyType,
};

const getButtonProperties = (
  theme: typeof defaultTheme,
  property: ButtonStyleType,
): ButtonStyleType => {
  return {
    ...property,
    borderColor: theme.colors[
      _.lowerFirst(_.trim(property.borderColor)) as keyof IColorsType
    ] as keyof IColorsType,

    backgroundColor: theme.colors[
      _.lowerFirst(_.trim(property.backgroundColor)) as keyof IColorsType
    ] as keyof IColorsType,
    textColor: theme.colors[
      _.lowerFirst(_.trim(property.textColor)) as keyof IColorsType
    ] as keyof IColorsType,
  };
};

export function parseThemeStore(jsonData = defaultTheme): AppTheme {
  let theme: AppTheme = {
    typography: {} as ITypographyType,
    colors: {} as IColorsType,
    buttons: {} as IButtonType,
  };

  if (_.has(jsonData, 'colors') && validate(jsonData.colors)) {
    const factor: number = jsonData.varFactor || defaultVarFactor;
    theme = {
      // Colors
      ...theme,
      colors: {
        ...theme.colors,
        ...jsonData.colors,
        // Primary Color
        primaryDark: Color(jsonData.colors.primary)
          .darken(factor * 1)
          .rgb()
          .string(),
        primaryDarker: Color(jsonData.colors.primary)
          .darken(factor * 2)
          .rgb()
          .string(),
        primaryDarkest: Color(jsonData.colors.primary)
          .darken(factor * 3)
          .rgb()
          .string(),

        primaryLight: Color(jsonData.colors.primary)
          .lighten(factor * 1)
          .rgb()
          .string(),
        primaryLighter: Color(jsonData.colors.primary)
          .lighten(factor * 2)
          .rgb()
          .string(),
        primaryLightest: Color(jsonData.colors.primary)
          .lighten(factor * 3)
          .rgb()
          .string(),
        // Secondary Color
        secondaryDark: Color(jsonData.colors.secondary)
          .darken(factor * 1)
          .rgb()
          .string(),
        secondaryDarker: Color(jsonData.colors.secondary)
          .darken(factor * 2)
          .rgb()
          .string(),
        secondaryDarkest: Color(jsonData.colors.secondary)
          .darken(factor * 3)
          .rgb()
          .string(),
        secondaryLight: Color(jsonData.colors.secondary)
          .lighten(factor * 1)
          .rgb()
          .string(),
        secondaryLighter: Color(jsonData.colors.secondary)
          .lighten(factor * 2)
          .rgb()
          .string(),
        secondaryLightest: Color(jsonData.colors.secondary)
          .lighten(factor * 3)
          .rgb()
          .string(),
        // Success Color
        successDark: Color(jsonData.colors.success)
          .darken(factor * 1)
          .rgb()
          .string(),
        successDarker: Color(jsonData.colors.success)
          .darken(factor * 2)
          .rgb()
          .string(),
        successDarkest: Color(jsonData.colors.success)
          .darken(factor * 3)
          .rgb()
          .string(),
        successLight: Color(jsonData.colors.success)
          .lighten(factor * 1)
          .rgb()
          .string(),
        successLighter: Color(jsonData.colors.success)
          .lighten(factor * 2)
          .rgb()
          .string(),
        successLightest: Color(jsonData.colors.success)
          .lighten(factor * 3)
          .rgb()
          .string(),
        // info color
        infoDark: Color(jsonData.colors.info)
          .darken(factor * 1)
          .rgb()
          .string(),
        infoDarker: Color(jsonData.colors.info)
          .darken(factor * 2)
          .rgb()
          .string(),
        infoDarkest: Color(jsonData.colors.info)
          .darken(factor * 3)
          .rgb()
          .string(),
        infoLight: Color(jsonData.colors.info)
          .lighten(factor * 1)
          .rgb()
          .string(),
        infoLighter: Color(jsonData.colors.info)
          .lighten(factor * 2)
          .rgb()
          .string(),
        infoLightest: Color(jsonData.colors.info)
          .lighten(factor * 3)
          .rgb()
          .string(),
        // Warning Color
        warningDark: Color(jsonData.colors.warning)
          .darken(factor * 1)
          .rgb()
          .string(),
        warningDarker: Color(jsonData.colors.warning)
          .darken(factor * 2)
          .rgb()
          .string(),
        warningDarkest: Color(jsonData.colors.warning)
          .darken(factor * 3)
          .rgb()
          .string(),
        warningLight: Color(jsonData.colors.warning)
          .lighten(factor * 1)
          .rgb()
          .string(),
        warningLighter: Color(jsonData.colors.warning)
          .lighten(factor * 2)
          .rgb()
          .string(),
        warningLightest: Color(jsonData.colors.warning)
          .lighten(factor * 3)
          .rgb()
          .string(),
        // Danger Color
        dangerDark: Color(jsonData.colors.danger)
          .darken(factor * 1)
          .rgb()
          .string(),
        dangerDarker: Color(jsonData.colors.danger)
          .darken(factor * 2)
          .rgb()
          .string(),
        dangerDarkest: Color(jsonData.colors.danger)
          .darken(factor * 3)
          .rgb()
          .string(),
        dangerLight: Color(jsonData.colors.danger)
          .lighten(factor * 1)
          .rgb()
          .string(),
        dangerLighter: Color(jsonData.colors.danger)
          .lighten(factor * 2)
          .rgb()
          .string(),
        dangerLightest: Color(jsonData.colors.danger)
          .lighten(factor * 3)
          .rgb()
          .string(),
        // Grey Color
        greyDark: Color(jsonData.colors.grey)
          .darken(factor * 1)
          .rgb()
          .string(),
        greyDarker: Color(jsonData.colors.grey)
          .darken(factor * 2)
          .rgb()
          .string(),
        greyDarkest: Color(jsonData.colors.grey)
          .darken(factor * 3)
          .rgb()
          .string(),
        greyLight: Color(jsonData.colors.grey)
          .lighten(factor * 1)
          .rgb()
          .string(),
        greyLighter: Color(jsonData.colors.grey)
          .lighten(factor * 2)
          .rgb()
          .string(),
        greyLightest: Color(jsonData.colors.grey)
          .lighten(factor * 3)
          .rgb()
          .string(),
        // Black Color
        blackDark: Color(jsonData.colors.black)
          .darken(factor * 1)
          .rgb()
          .string(),
        blackDarker: Color(jsonData.colors.black)
          .darken(factor * 2)
          .rgb()
          .string(),
        blackDarkest: Color(jsonData.colors.black)
          .darken(factor * 3)
          .rgb()
          .string(),
        blackLight: Color(jsonData.colors.black)
          .lighten(factor * 1)
          .rgb()
          .string(),
        blackLighter: Color(jsonData.colors.black)
          .lighten(factor * 2)
          .rgb()
          .string(),
        blackLightest: Color(jsonData.colors.black)
          .lighten(factor * 3)
          .rgb()
          .string(),
        // White Color
        whiteDark: Color(jsonData.colors.white)
          .darken(factor * 1)
          .rgb()
          .string(),
        whiteDarker: Color(jsonData.colors.white)
          .darken(factor * 2)
          .rgb()
          .string(),
        whiteDarkest: Color(jsonData.colors.white)
          .darken(factor * 3)
          .rgb()
          .string(),
        whiteLight: Color(jsonData.colors.white)
          .lighten(factor * 1)
          .rgb()
          .string(),
        whiteLighter: Color(jsonData.colors.white)
          .lighten(factor * 2)
          .rgb()
          .string(),
        whiteLightest: Color(jsonData.colors.white)
          .lighten(factor * 3)
          .rgb()
          .string(),
      },
    };
  }

  if (_.has(jsonData, 'typography') && validate(jsonData.typography)) {
    let typography = {
      headingColor:
        theme.colors[
          _.lowerFirst(
            _.trim(jsonData.typography.headingColor),
          ) as keyof IColorsType
        ],
      subHeadingColor:
        theme.colors[
          _.lowerFirst(
            _.trim(jsonData.typography.subHeadingColor),
          ) as keyof IColorsType
        ],
      bodyColor:
        theme.colors[
          _.lowerFirst(
            _.trim(jsonData.typography.bodyColor),
          ) as keyof IColorsType
        ],
      primaryFontFamily: jsonData.typography.primaryFontFamily,
      secondaryFontFamily: jsonData.typography.secondaryFontFamily,
      primaryFontFamilyLink:
        'https://fonts.googleapis.com/css?family=' +
        jsonData.typography.primaryFontFamily +
        ':400,500,600,700',
      secondaryFontFamilyLink:
        'https://fonts.googleapis.com/css?family=' +
        jsonData.typography.secondaryFontFamily +
        ':400,500,600,700',
    } as ITypographyType;

    theme = {
      // Typography
      ...theme,
      typography: {
        ...theme.typography,
        ...jsonData.typography,
        ...typography,
      },
      // accessible using branding because of a chance of over riding typography properties
    };
  }

  if (_.has(jsonData, 'buttons') && validate(jsonData.buttons)) {
    let buttons = {} as IButtonType;

    if (
      _.has(jsonData.buttons, 'primary') &&
      validate(jsonData.buttons.primary)
    ) {
      buttons = {
        ...buttons,
        primary: getButtonProperties(theme, jsonData.buttons.primary),
      };
    }
    if (
      _.has(jsonData.buttons, 'secondary') &&
      validate(jsonData.buttons.secondary)
    ) {
      buttons = {
        ...buttons,
        secondary: getButtonProperties(theme, jsonData.buttons.secondary),
      };
    }
    if (
      _.has(jsonData.buttons, 'outline') &&
      validate(jsonData.buttons.outline)
    ) {
      buttons = {
        ...buttons,
        outline: getButtonProperties(theme, jsonData.buttons.outline),
      };
    }

    theme = {
      // Buttons
      ...theme,
      buttons: {
        ...theme.buttons,
        ...jsonData.buttons,
        ...buttons,
      },
    };
  }

  return (theme = {
    ...defaultTheme,
    ...jsonData,
    ...theme,
  });
}
