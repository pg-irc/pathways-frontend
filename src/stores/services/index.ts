import { LocalizedText } from '../../locale';

import { Service, Store, ServiceMap } from './types';
import { UpdateTaskServicesAction, UpdateTaskServicesAsync, updateTaskServicesAsync } from './update_task_services';
import { ServiceData } from '../../api/api_client';
import { Task as constants } from '../../application/constants';
import { Task } from '../../fixtures/tasks';

export { Service };
export { UpdateTaskServicesAction, UpdateTaskServicesAsync, updateTaskServicesAsync };

export function serviceFromServiceData(data: ServiceData): Service {
    const { id, name }: ServiceData = data;
    // TODO: Perform appropriate data validation.
    //       Eg: ensure 'name' has appropriate LocalizedText structure.
    //       Alternatively bring in a tool to do this for us, eg: Serializr
    return { id: id as string, name: name as LocalizedText};
}

function buildDefaultStore(): Store {
    return {
        serviceMap: {},
        taskServicesMap: {},
    };
}

export function reducer(store: Store = buildDefaultStore(), action: UpdateTaskServicesAction): Store {
    switch (action.type) {
        case constants.UPDATE_SERVICES_REQUEST: return updateServicesRequest(store, action.payload);
        case constants.UPDATE_SERVICES_SUCCESS: return updateServicesSuccess(store, action.payload);
        case constants.UPDATE_SERVICES_FAILURE: return updateServicesFailure(store, action.payload);
        default: return store;
    }
}

type UpdateServicesRequestPayload = { readonly task: Task };
function updateServicesRequest(store: Store, { task }: UpdateServicesRequestPayload): Store {
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [task.id]: { ...store.taskServicesMap[task.id], message: '', loading: true },
        },
    };
}

type UpdateServicesSuccessPayload = { readonly task: Task, readonly services: ReadonlyArray<Service> };
function updateServicesSuccess(store: Store, { task, services }: UpdateServicesSuccessPayload): Store {
    const serviceMap = createServiceMap(services);
    const serviceIds = Object.keys(serviceMap);
    const taskServicesMap = { [task.id]: { ...store.taskServicesMap[task.id], serviceIds, loading: false } };
    return {
        ...store,
        serviceMap: { ...store.serviceMap, ...serviceMap },
        taskServicesMap: { ...store.taskServicesMap, ...taskServicesMap },
    };
}

type UpdateServicesFailurePayload = { readonly task: Task, readonly message: string };
function updateServicesFailure(store: Store, { task, message}: UpdateServicesFailurePayload): Store {
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [task.id]: { ...store.taskServicesMap[task.id], message, loading: false },
        },
    };
}

function createServiceMap(services: ReadonlyArray<Service>): ServiceMap {
    const theReducer = (serviceMap: ServiceMap, service: Service): ServiceMap => {
        return { ...serviceMap, [service.id]: service };
    };
    return services.reduce(theReducer, {});
}
