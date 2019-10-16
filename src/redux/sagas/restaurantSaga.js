import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getRestaurants (action){
    try{
        const response = yield axios.get(`/api/restaurant/${action.payload}`);
        yield put({type: 'SET_RESTAURANTS', payload: response.data});
    }catch (error){
        console.log('error getting restaurants for this collection', error);
    }
}

function* restaurantSaga() {
    yield takeLatest('GET_RESTAURANTS', getRestaurants);
  }
  
  export default restaurantSaga;