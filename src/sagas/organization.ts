// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put, SelectEffect } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { OpenOrganizationAction, saveOrganization, SaveOrganizationAction } from '../stores/organization/actions';
import { APIResponse, getOrganization } from '../api';
import { HumanOrganizationData } from '../validation/organizations/types';

export function* watchUpdateOrganization(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.OPEN_ORGANIZATION, updateOrganization);
}

export function* updateOrganization(action: OpenOrganizationAction): UpdateResult {
    const organizationId = action.payload.organizationId;
    try {
        const apiResponse: APIResponse = yield call(getOrganization, organizationId);
        const organization: HumanOrganizationData = apiResponse.results;
        yield put(saveOrganization(organization));
    } catch (error) {
        console.warn(error);
    }
}

type UpdateResult = IterableIterator<HumanOrganizationData | SelectEffect | CallEffect | PutEffect<SaveOrganizationAction>>;