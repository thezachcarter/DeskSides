import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getBrandJournalists() {
    try {
        const response = yield axios.get('/api/brand-journalists');
        yield put ({type: 'SET_BRAND_JOURNALISTS', payload: response.data});
    } catch (error) {
        console.log('getBrandJournalistsSaga', error);
    }
}

function* brandJournalistsSaga() {
    yield takeLatest('GET_BRAND_JOURNALISTS', getBrandJournalists);
}

export default brandJournalistsSaga;