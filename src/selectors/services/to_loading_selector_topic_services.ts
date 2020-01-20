import { LoadingSelectorTopicServices } from './types';
import * as constants from '../../application/constants';

export const toLoadingSelectorTopicServices = ():
    LoadingSelectorTopicServices => ({
        type: constants.TOPIC_SERVICES_LOADING,
    });