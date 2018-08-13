import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/tasks';
import { Id as ServiceId, buildDefaultTaskServices } from '../../stores/services';
import { Locale } from '../../locale';
import { getLocalizedText } from '../locale/get_localized_text';
import { selectLocale } from '../locale/select_locale';
import { TaskServices } from './task_services';

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
