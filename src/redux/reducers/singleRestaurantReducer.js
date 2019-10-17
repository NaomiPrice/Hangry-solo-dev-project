const singleRestaurantReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SINGLE_RESTAURANT':
        return {...action.payload[0]};
      default:
        return state;
    }
  };
  
  
  export default singleRestaurantReducer;