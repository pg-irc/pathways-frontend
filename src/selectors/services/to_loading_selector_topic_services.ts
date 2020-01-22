import { SelectorLoadingServicesForTopic } from './types';
import * as constants from '../../application/constants';

export const toSelectorLoadingServicesForTopic = ():
    SelectorLoadingServicesForTopic => ({
        type: constants.LOADING_SERVICES_FOR_TOPIC,
    });