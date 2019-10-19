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

function* addCollection (action){
    try{
        yield axios.post(`/api/collection`, action.payload)
    }catch (error){
        console.log('error adding collection for this user', error)
    }
}

function* collectionSaga() {
    yield takeLatest('GET_COLLECTIONS', getCollection);
    yield takeLatest('ADD_COLLECTION', addCollection);
  }
  
  export default collectionSaga;