// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put, select, SelectEffect } from 'redux-saga/effects';
import * as constants from '../application/constants';
import * as actions from '../stores/services/actions';
import { validateServicesAtLocationArray, toServicesFromValidatedData } from '../validation/services';
import { searchServices, APIResponse } from '../api';
import { getDeviceLocation, DeviceLocation } from '../application/helpers/get_device_location';
import * as errors from '../validation/errors/is_error';
import { Errors } from '../validation/errors/types';
import { HumanServiceData } from '../validation/services/types';
import { selectBookmarkedServicesIds } from '../selectors/services/select_bookmarked_services_ids';
import { isDeviceOnline } from '../application/helpers/is_device_online';
import { AlgoliaResponse, fetchServicesForOrganization } from '../components/search/api/fetch_search_results_from_query';
import { validateServiceSearchResponse } from '../validation/search';
import { toHumanServiceData } from '../validation/search/to_human_service_data';
import { OpenOrganizationAction } from '../stores/organization/actions';

export function* watchUpdateServicesForTopic(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateServicesForTopic);
}

export function* watchUpdateServicesForOrganization(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.OPEN_ORGANIZATION, updateServicesForOrganization);
}

export function* updateServicesForTopic(action: actions.BuildServicesRequestAction): UpdateResult {
    const topicId = action.payload.topicId;
    try {
        const isOnline = yield call(isDeviceOnline);
        if (!isOnline) {
            return yield put(actions.buildServicesError(topicId, Errors.Offline));
        }

        const deviceLocationResponse: DeviceLocation = yield call(getDeviceLocation, action.payload.manualUserLocation.latLong);
        if (errors.isNoLocationPermissionError(deviceLocationResponse)) {
            return yield put(actions.buildServicesError(topicId, deviceLocationResponse.type));
        }

        if (errors.isLocationFetchTimeoutError(deviceLocationResponse)) {
            return yield put(actions.buildServicesError(topicId, deviceLocationResponse.type));
        }

        const apiResponse: APIResponse = yield call(searchServices, topicId, deviceLocationResponse);
        if (errors.isBadResponseError(apiResponse)) {
            return yield put(actions.buildServicesError(topicId, Errors.BadServerResponse));
        }

        const validatedApiResponse = validateServicesAtLocationArray(apiResponse.results);
        if (!validatedApiResponse.isValid) {
            return yield put(actions.buildServicesError(topicId, Errors.InvalidServerData));
        }

        const bookmarkedServiceIds = yield select(selectBookmarkedServicesIds);
        const services = toServicesFromValidatedData(bookmarkedServiceIds, validatedApiResponse.validData);
        yield put(actions.buildServicesSuccess(topicId, services));
    } catch (error) {
        yield put(actions.buildServicesError(topicId, Errors.Exception));
    }
}

export function* updateServicesForOrganization(action: OpenOrganizationAction): UpdateServicesForOrganizationResult {
    const organizationId = action.payload.organizationId;
    try {
        const algoliaResponse: AlgoliaResponse = yield call(fetchServicesForOrganization, organizationId);

        const validatedAlgoliaResponse = validateServiceSearchResponse(algoliaResponse.hits);

        const bookmarkedServiceIds = yield select(selectBookmarkedServicesIds);

        const services = validatedAlgoliaResponse.map(item => toHumanServiceData(item, bookmarkedServiceIds));

        yield put(actions.saveServicesForOrganization(organizationId, services));
    } catch (error) {
        console.warn(error);
    }
}

type SuccessOrFailureResult = actions.BuildServicesSuccessAction | actions.BuildServicesErrorAction;

type UpdateResult = IterableIterator<ReadonlyArray<HumanServiceData> | SelectEffect | CallEffect | PutEffect<SuccessOrFailureResult>>;

type UpdateServicesForOrganizationResult = IterableIterator<ReadonlyArray<HumanServiceData> | SelectEffect | CallEffect |
 PutEffect<actions.SaveServicesForOrganizationAction>>;