export default (state = {
  currentUser: {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/keeYtvRpGFVVKOOiOZDS.png',
    userid: '00000001',
    notifyCount: 12,
  },
}, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, name: action.payload };
    case 'SET_USER_AGE':
      return { ...state, age: action.payload };
    case 'E':
      throw new Error('E');
    case 'FETCH_USER_FULLFILLED':
      return { ...state, name: action.payload.name, age: action.payload.age };
    default:
      return state;
  }
};
