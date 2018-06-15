import * as model from '../../stores/explore';
import * as R from 'ramda';
import { selectLocalizedText } from '../locale';
import { Locale } from '../../locale/types';
import { ExploreSection } from '../explore';

export const denormalizeSections =
    (locale: Locale, store: model.ExploreSectionMap): ReadonlyArray<ExploreSection> => {
        const buildSection = (id: string): ExploreSection => {
            const name = selectLocalizedText(locale, store[id].name);
            const introduction = selectLocalizedText(locale, store[id].introduction);
            const icon = store[id].icon;
            return { id, name, introduction, icon };
        };
        return R.map(buildSection, R.keys(store));
    };

export const getExploreSectionById =
    (locale: Locale, id: model.Id, sections: model.ExploreSectionMap): ExploreSection => {
        const theSection = sections[id];
        const name = selectLocalizedText(locale, theSection.name);
        const introduction = selectLocalizedText(locale, theSection.introduction);
        const icon = theSection.icon;

        return { id, name, introduction, icon };
    };
