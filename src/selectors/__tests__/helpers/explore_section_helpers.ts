// tslint:disable:no-class no-this readonly-keyword no-expression-statement

import { ExploreSection } from '../../explore/types';
import { aString } from '../../../application/__tests__/helpers/random_test_values';

export class ExploreSectionBuilder {
    id: string = aString();
    name: string = aString();
    introduction: string = aString();
    icon: string = aString();

    withId(id: string): ExploreSectionBuilder {
        this.id = id;
        return this;
    }

    withName(name: string): ExploreSectionBuilder {
        this.name = name;
        return this;
    }

    withIntroduction(introduction: string): ExploreSectionBuilder {
        this.introduction = introduction;
        return this;
    }

    withIcon(icon: string): ExploreSectionBuilder {
        this.icon = icon;
        return this;
    }

    build(): ExploreSection {
        return {
            id: this.id,
            name: this.name,
            introduction: this.introduction,
            icon: this.icon,
        };
    }
}
