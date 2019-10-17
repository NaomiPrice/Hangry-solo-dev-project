import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getNotes (action){
    try{
        const response = yield axios.get(`/api/restaurant/notes/${action.payload}`);
        yield put({type: 'SET_NOTES', payload: response.data});
    }catch (error){
        console.log('error getting restaurant data for this restaurant', error);
    }
}

function* notesSaga() {
    yield takeLatest('GET_NOTES', getNotes);
  }
  
  export default notesSaga;