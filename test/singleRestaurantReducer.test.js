import singleRestaurantReducer from '../src/redux/reducers/singleRestaurantReducer';

test('single restaurant reducer should initially be loading-true', () => {
    const action = {};
    // First argument is the existing state, the second is your action
    const returnedState = singleRestaurantReducer(undefined, action);
    expect(returnedState).toBe({loading: true});
  });