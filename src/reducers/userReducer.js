export default (state = {}, action) => {
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
