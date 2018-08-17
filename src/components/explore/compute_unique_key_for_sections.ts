import * as R from 'ramda';
import { ExploreSection } from '../../selectors/explore/types';

export const computeUniqueKeyForSections = (sections: ReadonlyArray<ExploreSection>): string => (
    R.toString(R.reduce(R.concat, '', R.pluck('name', sections)))
);
