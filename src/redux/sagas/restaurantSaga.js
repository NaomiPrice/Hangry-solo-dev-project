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

function* addRestaurant (action){
    try{
        const response = yield axios.post(`/api/restaurant`, action.payload);
        //use id from restaurant post to send with note post
        yield axios.post(`/api/notes/${response.data[0].id}`, action.payload);
        yield console.log(action.payload.collectionId);
        yield put({type: 'GET_RESTAURANTS', payload: action.payload.collectionId})
        
        // yield getRestaurants(action.payload.)
    }catch (error){
        console.log('error adding restaurant', error);
    }
}

function* deleteResaurant (action){
    try{
        yield axios.delete(`/api/restaurant/${action.payload.restaurantId}`);
        yield put({type: 'GET_RESTAURANTS' , payload: action.payload.collectionId})
    }catch (error){
        console.log('error deleting restaurant', error);
    }
}

function* restaurantSaga() {
    yield takeLatest('GET_RESTAURANTS', getRestaurants);
    yield takeLatest('ADD_RESTAURANT', addRestaurant);
    yield takeLatest('DELETE_RESTAURANT', deleteResaurant);
  }
  
  export default restaurantSaga;