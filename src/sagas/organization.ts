// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put, SelectEffect, select } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { errorOrganization, loadingOrganization, OpenOrganizationAction, 
    ErrorOrganizationAction, LoadingOrganizationAction, saveOrganization, SaveOrganizationAction } from '../stores/organization/actions';
import { APIResponse, getOrganization } from '../api';
import { HumanOrganizationData } from '../validation/organizations/types';
import { isDeviceOnline } from '../application/helpers/is_device_online';
import { Errors } from '../validation/errors/types';
import { selectOrganizationById } from '../selectors/organizations/select_organization_by_id';

export function* watchUOpenOrganization(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.OPEN_ORGANIZATION, openOrganization);
}

export function* openOrganization(action: OpenOrganizationAction): UpdateResult {
    const organizationId = action.payload.organizationId;
    yield put(loadingOrganization());
    try {
        const existingOrganization: HumanOrganizationData = yield select(selectOrganizationById, organizationId);
        if (existingOrganization) {
            return yield put(saveOrganization(existingOrganization));
        }
        const isOnline = yield call(isDeviceOnline);
        if (!isOnline) {
            return yield put(errorOrganization(organizationId, Errors.Offline));
        }

        const apiResponse: APIResponse = yield call(getOrganization, organizationId);
        const organization: HumanOrganizationData = apiResponse.results;
        yield put(saveOrganization(organization));
    } catch (error) {
        return yield put(errorOrganization(organizationId, Errors.Exception));
    }
}

type UpdateResult = IterableIterator<HumanOrganizationData | SelectEffect | CallEffect |
PutEffect<SaveOrganizationAction | ErrorOrganizationAction| LoadingOrganizationAction>>;