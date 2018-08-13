import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/tasks';
import { Id as ServiceId, buildDefaultTaskServices } from '../../stores/services';
import { Locale } from '../../locale';
import { getLocalizedText } from '../locale/get_localized_text';
import { selectLocale } from '../locale/select_locale';
import { Task } from '../tasks/task';
import * as R from 'ramda';
import { Service } from './service';

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
                name: getLocalizedText(locale, service.name),
                description: getLocalizedText(locale, service.description),
            };
        }),
    };
}

export function createRelatedServicesQueryFromTask(task: Task): string {
    return R.take(3, task.title.split(' ')).join(',');
}