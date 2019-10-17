const singleNoteReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ONE_NOTE':
        return {...action.payload[0]};
      default:
        return state;
    }
  };
  
  export default singleNoteReducer;