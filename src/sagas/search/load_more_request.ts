// tslint:disable: no-expression-statement
import { ForkEffect, takeLatest, put, CallEffect, PutEffect, SelectEffect, call, select } from 'redux-saga/effects';
import { LOAD_MORE_REQUEST } from '../../application/constants';
import { saveNumberOfSearchPages, saveSearchResults, saveSearchPage } from '../../stores/search';
import { selectSearchTerm } from '../../selectors/search/select_search_term';
import { selectSearchLatLong } from '../../selectors/search/select_search_lat_long';
import { fetchSearchResultsFromQuery } from '../../components/search/api/fetch_search_results_from_query';
import { selectSearchPage } from '../../selectors/search/select_search_page';
import { selectSearchResults } from '../../selectors/search/select_search_results';
import { SearchServiceData } from '../../validation/search/types';

export function* watchLoadMoreRequest(): IterableIterator<ForkEffect> {
    yield takeLatest(LOAD_MORE_REQUEST, loadMoreRequest);
}

type Effects = CallEffect | SelectEffect | PutEffect;

function* loadMoreRequest(): IterableIterator<Effects> {
    const searchTerm = yield select(selectSearchTerm);
    const searchLatLong = yield select(selectSearchLatLong);
    const searchPage: number = yield select(selectSearchPage);
    const searchResults: ReadonlyArray<SearchServiceData> = yield select(selectSearchResults);
    const nextPage = searchPage + 1;
    try {
        const moreResults: ReadonlyArray<SearchServiceData> = yield call(
            fetchSearchResultsFromQuery, searchTerm, nextPage, searchLatLong, saveNumberOfSearchPages,
        );
        yield put(saveSearchResults([...searchResults, ...moreResults]));
    } finally {
        yield put(saveSearchPage(nextPage));
    }
}