import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getCollection (action){
    try{
        const response = yield axios.get(`/api/collection`);
        yield put({type: 'SET_COLLECTIONS', payload: response.data});
    }catch (error){
        console.log('error getting collections for this user', error);
    }
}

function* collectionSaga() {
    yield takeLatest('GET_COLLECTIONS', getCollection);
  }
  
  export default collectionSaga;