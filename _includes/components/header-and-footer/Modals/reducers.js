export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_MODAL':
      return {
        ...state,
        modal: {
          title: action.title,
          markup: action.markup,
        },
      };

    case 'REMOVE_MODAL':
      return {
        ...state,
        modal: null,
      };

    default: return state;
  }
};
