import {
  LAYOUT_COLLAPSED,
  FETCH_NOTICES,
  NOTICES_SUCCEED,
} from '../actions/globalActions';

export default (state = {
  collapsed: false,
  fetchingNotices: false,
  notices: [],
}, action) => {
  switch (action.type) {
    case LAYOUT_COLLAPSED:
      return { ...state, collapsed: action.payload };
    case FETCH_NOTICES:
      return { ...state, fetchingNotices: true };
    case NOTICES_SUCCEED:
      return { ...state, fetchingNotices: false, notices: action.payload };
    default:
      return state;
  }
};
