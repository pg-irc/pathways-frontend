import { HumanServiceData, ServiceList, ServiceListData } from '../../validation/services/types';

export const getSavedServicesIds = (bookmarkedServices: ServiceListData): ServiceList => (
    bookmarkedServices.map((service: HumanServiceData) => service.id)
);