// tslint:disable: no-expression-statement
import { ForkEffect, takeLatest, put, CallEffect, PutEffect, SelectEffect, call, select } from 'redux-saga/effects';
import { SEARCH_REQUEST } from '../../application/constants';
import {
    SearchRequestAction, setCollapseSearchInput, saveSearchTerm, saveSearchLocation, saveSearchLatLong, saveNumberOfSearchPages, saveSearchResults,
} from '../../stores/search';
import { isDeviceOnline } from '../../application/helpers/is_device_online';
import { selectSearchLatLong } from '../../selectors/search/select_search_lat_long';
import { selectSearchLocation } from '../../selectors/search/select_search_location';
import { fetchLatLongFromLocation } from '../../api/fetch_lat_long_from_location';
import { fetchSearchResultsFromQuery, AlgoliaResponse } from '../../components/search/api/fetch_search_results_from_query';
import { selectSearchPage } from '../../selectors/search/select_search_page';
import { searchExecuted } from '../../stores/analytics';
import { LatLong } from '../../validation/latlong/types';
import { validateServiceSearchResponse } from '../../validation/search';

export function* watchSearchRequest(): IterableIterator<ForkEffect> {
    yield takeLatest(SEARCH_REQUEST, searchRequest);
}

type Effects = CallEffect | SelectEffect | PutEffect;

function* searchRequest(action: SearchRequestAction): IterableIterator<Effects> {
    const isOnline = yield call(isDeviceOnline);
    const searchTermInput = action.payload.searchTermInput;
    const searchLocationInput = action.payload.searchLocationInput;
    yield put(setCollapseSearchInput(true));
    yield put(saveSearchTerm(searchTermInput));
    yield put(saveSearchLocation(searchLocationInput));
    // tslint:disable-next-line: no-let
    let latLong: LatLong = yield select(selectSearchLatLong);
    const savedLocation: string = yield select(selectSearchLocation);
    const savedPageNumber: number = yield select(selectSearchPage);

    try {
        if (locationInputIsSavedLocation(searchLocationInput, savedLocation)) {
            latLong = yield call(fetchLatLongFromLocation, searchLocationInput, isOnline);
            yield put(saveSearchLatLong(latLong));
        }
        const apiResponse: AlgoliaResponse = yield call(fetchSearchResultsFromQuery, searchTermInput, savedPageNumber, latLong);
        const searchResults = validateServiceSearchResponse(apiResponse.hits);
        yield put(saveSearchResults(searchResults));
        yield put(saveNumberOfSearchPages(apiResponse.nbPages));
    } finally {
        yield put(searchExecuted(searchTermInput, searchLocationInput));
    }
}

const locationInputIsSavedLocation = (locationInput: string, savedLocation: string): boolean => (
    locationInput === savedLocation
);