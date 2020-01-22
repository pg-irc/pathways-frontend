import * as constants from '../../application/constants';
import { LoadingServicesForTopic } from '../../validation/services/types';

export const buildLoadingServicesForTopic = (): LoadingServicesForTopic => ({
    type: constants.LOADING_SERVICES_FOR_TOPIC,
});