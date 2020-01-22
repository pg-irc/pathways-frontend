import * as constants from '../../application/constants';
import { InitialEmptyServicesForTopic } from '../../validation/services/types';

export const buildInitialEmptyServicesForTopic = (): InitialEmptyServicesForTopic => ({
    type: constants.INITIAL_EMPTY_SERVICES_FOR_TOPIC,
});
