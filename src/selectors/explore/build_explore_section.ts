import * as select from './types';
import * as stores from '../../stores/explore';
import { Locale, getLocalizedText } from '../locale/get_localized_text';

export const buildExploreSection = (locale: Locale, theSection: stores.ExploreSection, icon: string): select.ExploreSection => {
    const id = theSection.id;
    const name = getLocalizedText(locale, theSection.name);
    const description = getLocalizedText(locale, theSection.description);

    return { id, name, description, icon };
};
