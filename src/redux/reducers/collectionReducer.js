const collectionReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_COLLECTIONS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // collections will be on the redux state at:
  // state.collections
  export default collectionReducer;