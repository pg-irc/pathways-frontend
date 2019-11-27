import { HumanServiceData, ServiceList } from '../../validation/services/types';

export const getSavedServicesIds = (bookmarkedServices: ReadonlyArray<HumanServiceData>): ServiceList => (
    bookmarkedServices.map((service: HumanServiceData) => service.id)
);