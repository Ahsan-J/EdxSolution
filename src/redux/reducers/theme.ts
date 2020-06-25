import {parseThemeStore} from '../../helpers/theme';

const initialState = parseThemeStore();

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_THEME':
      return (state = {
        ...state,
        ...parseThemeStore(action.theme),
      });
    default:
      return state;
  }
};
