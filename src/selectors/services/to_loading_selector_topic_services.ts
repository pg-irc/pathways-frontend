import { SelectorLoadingServicesForTopic } from './types';
import * as constants from '../../application/constants';

export const toSelectorLoadingServicesForTopic = ():
    SelectorLoadingServicesForTopic => ({
        type: constants.TOPIC_SERVICES_LOADING,
    });