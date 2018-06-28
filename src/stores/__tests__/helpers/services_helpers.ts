// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { aString } from '../../../application/__tests__/helpers/random_test_values';
import { Id } from '../../services';
import { Id as TaskId } from '../../tasks';
import { TaskServices, Service, TaskServicesMap, ServiceMap, Store } from '../../services/types';
import { LocalizedText } from '../../../locale';
import { LocalizedTextBuilder } from './locale_helpers';

export function buildNormalizedServices(tasks: ReadonlyArray<TaskServicesBuilder>, services: ReadonlyArray<ServiceBuilder>): Store {
    return {
        serviceMap: buildServiceMap(services),
        taskServicesMap: buildTaskServicesMap(tasks, services),
    };
}

function buildServiceMap(services: ReadonlyArray<ServiceBuilder>): ServiceMap {
    const buildAndMapToId = (map: ServiceMap, builder: ServiceBuilder): ServiceMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return services.reduce(buildAndMapToId, {});
}

function buildTaskServicesMap(tasks: ReadonlyArray<TaskServicesBuilder>, services: ReadonlyArray<ServiceBuilder>): TaskServicesMap {
    const buildAndMapToId = (map: TaskServicesMap, builder: TaskServicesBuilder): TaskServicesMap => {
        const serviceIds = services.map((service: ServiceBuilder) => service.id);
        return { ...map, [builder.id]: builder.withServiceIds(serviceIds).build() };
    };
    return tasks.reduce(buildAndMapToId, {});
}

export class ServiceBuilder {
    id: Id = aString();
    name: LocalizedText = new LocalizedTextBuilder().build();
    description: LocalizedText = new LocalizedTextBuilder().build();

    withId(id: Id): ServiceBuilder {
        this.id = id;
        return this;
    }

    withName(name: LocalizedText): ServiceBuilder {
        this.name = name;
        return this;
    }

    withDescription(description: LocalizedText): ServiceBuilder {
        this.description = description;
        return this;
    }

    build(): Service {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
        };
    }
}

export class TaskServicesBuilder {
    id: TaskId = aString();
    loading: boolean = false;
    message: string = aString();
    serviceIds: ReadonlyArray<Id> = [];

    withTaskId(id: TaskId): TaskServicesBuilder {
        this.id = id;
        return this;
    }

    withLoading(loading: boolean): TaskServicesBuilder {
        this.loading = loading;
        return this;
    }

    withMessage(message: string): TaskServicesBuilder {
        this.message = message;
        return this;
    }

    withServiceIds(serviceIds: ReadonlyArray<Id>): TaskServicesBuilder {
        this.serviceIds = serviceIds;
        return this;
    }

    build(): TaskServices {
        return {
            loading: this.loading,
            message: this.message,
            serviceIds: this.serviceIds,
        };
    }
}