import { combineReducers } from 'redux';

import global from './globalReducer';
import tweets from './tweetsReducer';
import user from './userReducer';

export default combineReducers({
  global,
  tweets,
  user,
});
