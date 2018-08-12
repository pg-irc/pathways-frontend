import * as select from './types';
import * as stores from '../../stores/explore';
import { Locale, selectLocalizedText } from '../locale';

export const buildExploreSection = (locale: Locale, theSection: stores.ExploreSection, icon: string): select.ExploreSection => {
    const id = theSection.id;
    const name = selectLocalizedText(locale, theSection.name);
    const introduction = selectLocalizedText(locale, theSection.introduction);

    return { id, name, introduction, icon };
};
