const singleRestaurantReducer = (state = {loading:true}, action) => {
    switch (action.type) {
      case 'SET_SINGLE_RESTAURANT':
        return {...action.payload[0]};
      case 'LOADING_RESTAURANT':
        return {
          ...state, 
          loading:true,
        }
      default:
        return state;
    }
  };
  
  
  export default singleRestaurantReducer;