export default (state = {
  collapsed: false,
}, action) => {
  switch (action.type) {
    case 'global/changeLayoutCollapsed':
      return { ...state, collapsed: action.payload };
    default:
      return state;
  }
};
