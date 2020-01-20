import { LoadingServicesForTopic, ServicesForTopic } from '../../validation/services/types';
import * as constants from '../../application/constants';

export const isLoadingServicesForTopic = (services: ServicesForTopic):
    services is LoadingServicesForTopic => (
        services.type === constants.TOPIC_SERVICES_LOADING
    );
