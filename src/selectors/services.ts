import { Store } from '../stores';
import { Id as TaskId } from '../stores/tasks';
import { Id as ServiceId, buildDefaultTaskServices } from '../stores/services';
import { Task } from './tasks';
import { take } from 'ramda';
import { Locale } from '../locale';
import { selectLocalizedText, selectLocale } from './locale';

export interface Service {
    readonly id: string;
    readonly name: string;
    readonly description: string;
}

export interface TaskServices {
    readonly loading: boolean;
    readonly message: string;
    readonly services: ReadonlyArray<Service>;
}

export function selectTaskServices(taskId: TaskId, store: Store): TaskServices {
    const locale: Locale = selectLocale(store);
    const servicesStore = store.servicesInStore;
    const taskServices = servicesStore.taskServicesMap[taskId] || buildDefaultTaskServices();
    return {
        loading: taskServices.loading,
        message: taskServices.message,
        services: taskServices.serviceIds.map((serviceId: ServiceId) => {
            const service = servicesStore.serviceMap[serviceId];
            return {
                id: service.id,
                name: selectLocalizedText(locale, service.name),
                description: selectLocalizedText(locale, service.description),
            };
        }),
    };
}

export function createRelatedServicesQueryFromTask(task: Task): string {
    // TODO: Determine better method of getting / creating a search query.
    //       The current approach is to split task title into a list and take
    //       the first three words. The intention being to provide some
    //       (hopefully) relevant keywords but not so many that we don't get any
    //       results.
    return take(3, task.title.split(' ')).join(',');
}