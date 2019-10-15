import { Store } from '../../stores';
import { SelectorTopicServices } from './types';

export const getSavedServices = (appStore: Store): SelectorTopicServices => (
    appStore.services.savedServices
);