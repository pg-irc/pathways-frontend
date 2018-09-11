import * as R from 'ramda';
import { LocalizedText } from '../../locale';

import { Id, Service, ServiceStore, ServiceMap, TaskServices, PhoneNumber, APIPhoneNumber } from './types';
import { UpdateTaskServicesAsync, updateTaskServicesAsync } from './update_task_services';
import * as constants from '../../application/constants';
import { Action } from 'redux';

export { Id, Service, ServiceStore };
export { UpdateTaskServicesAsync, updateTaskServicesAsync };

export function serviceFromServiceData(data: any): Service { // tslint:disable-line:no-any
    // TODO: Perform appropriate data validation.
    //       Alternatively bring in a tool to do this for us, eg: Serializr
    const id: string = data.service.id || undefined;
    const name: LocalizedText = { 'en': data.service.name || '' };
    const description: LocalizedText = { 'en': data.service.description || '' };
    const phoneNumbers: ReadonlyArray<PhoneNumber> = data.location.phone_numbers ?
        APIPhoneNumbersToStorePhoneNumbers(data.location.phone_numbers) : [];
    return { id, name, description, phoneNumbers };
}

function APIPhoneNumbersToStorePhoneNumbers(phoneNumbers: ReadonlyArray<APIPhoneNumber>): ReadonlyArray<PhoneNumber> {
    return R.map((phoneNumber: APIPhoneNumber): PhoneNumber => ({
        type: phoneNumber.phone_number_type,
        phoneNumber: phoneNumber.phone_number,
    }), phoneNumbers);
}

function buildDefaultStore(): ServiceStore {
    return {
        serviceMap: {},
        taskServicesMap: {},
    };
}

export function buildDefaultTaskServices(): TaskServices {
    return {
        loading: false,
        message: '',
        serviceIds: [],
    };
}

export function reducer(store: ServiceStore = buildDefaultStore(), action: Action): ServiceStore {
    switch (action.type) {
        case constants.LOAD_SERVICES_REQUEST:
            return updateServicesRequest(store, action as UpdateTaskServicesAsync.Request);
        case constants.LOAD_SERVICES_SUCCESS:
            return updateServicesSuccess(store, action as UpdateTaskServicesAsync.Success);
        case constants.LOAD_SERVICES_FAILURE:
            return updateServicesFailure(store, action as UpdateTaskServicesAsync.Failure);
        default:
            return store;
    }
}

function updateServicesRequest(store: ServiceStore, action: UpdateTaskServicesAsync.Request): ServiceStore {
    const taskId = action.payload.taskId;
    const taskServices = store.taskServicesMap[taskId] || buildDefaultTaskServices();
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [taskId]: { ...taskServices, message: '', loading: true },
        },
    };
}

function updateServicesSuccess(store: ServiceStore, action: UpdateTaskServicesAsync.Success): ServiceStore {
    const services = action.payload.services;
    const taskId = action.payload.taskId;
    const serviceMap = createServiceMap(services);
    const serviceIds = Object.keys(serviceMap);
    const taskServicesMap = { [taskId]: { ...store.taskServicesMap[taskId], serviceIds, loading: false } };
    return {
        ...store,
        serviceMap: { ...store.serviceMap, ...serviceMap },
        taskServicesMap: { ...store.taskServicesMap, ...taskServicesMap },
    };
}

function updateServicesFailure(store: ServiceStore, action: UpdateTaskServicesAsync.Failure): ServiceStore {
    const taskId = action.payload.taskId;
    const message = action.payload.message;
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [taskId]: { ...store.taskServicesMap[taskId], message, loading: false },
        },
    };
}

function createServiceMap(services: ReadonlyArray<Service>): ServiceMap {
    const theReducer = (serviceMap: ServiceMap, service: Service): ServiceMap => {
        return { ...serviceMap, [service.id]: service };
    };
    return services.reduce(theReducer, {});
}
