// tslint:disable:no-let no-expression-statement

import { ExploreSection, denormalizeSections } from '../explore';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';

describe('denormalizing explore section', () => {
    const locale = new LocaleBuilder().build();
    let sections: ReadonlyArray<ExploreSection>;
    const name = aString();
    const icon = aString();

    beforeEach(() => {
        const id = aString();
        const exploreSectionMap = {
            [id]: {
                id,
                icon,
                name: {
                    [locale.code]: name,
                },
            },
        };
        sections = denormalizeSections(locale, exploreSectionMap);
    });

    it('should build section with localized name', () => {
        expect(sections[0].name).toBe(name);
    });

    it('should build section with icon', () => {
        expect(sections[0].icon).toBe(icon);
    });
});
