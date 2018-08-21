import * as select from './types';
import * as stores from '../../stores/explore';
import { Locale, getLocalizedText, getLocalizedTextOrDefault } from '../locale/get_localized_text';

export const buildExploreSection = (locale: Locale, theSection: stores.ExploreSection, icon: string): select.ExploreSection => {
    const id = theSection.id;
    const name = getLocalizedText(locale, theSection.name);
    const introduction = getLocalizedTextOrDefault('', locale, theSection.introduction);

    return { id, name, introduction, icon };
};
