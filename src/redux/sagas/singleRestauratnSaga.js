import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getRestaurant (action){
    try{
        const response = yield axios.get(`/api/restaurant/single/${action.payload}`);
        yield put({type: 'SET_SINGLE_RESTAURANT', payload: response.data});
    }catch (error){
        console.log('error getting restaurant data for this restaurant', error);
    }
}

function* singleRestaurantSaga() {
    yield takeLatest('GET_SINGLE_RESTAURANT', getRestaurant);
  }
  
  export default singleRestaurantSaga;