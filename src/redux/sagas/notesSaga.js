import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getNotes (action){
    try{
        const response = yield axios.get(`/api/notes/${action.payload}`);
        yield put({type: 'SET_NOTES', payload: response.data});
    }catch (error){
        console.log('error getting restaurant data for this restaurant', error);
    }
}

function* addNote (action){
    try{
        yield axios.post(`/api/notes`, action.payload);
        
    }catch (error){
        console.log('error creating note', error)
    }
}

function* notesSaga() {
    yield takeLatest('GET_NOTES', getNotes);
    yield takeLatest('ADD_NOTE', addNote);
  }
  
  export default notesSaga;