import {AppTheme} from '../../helpers/theme';

export const updateThemeStore = (theme: AppTheme) => {
  return {
    type: 'UPDATE_CURRENT_THEME',
    theme,
  };
};
