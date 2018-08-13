import { ExploreTaxonomyId } from '../../stores/taxonomies';
import * as R from 'ramda';

export const filterExploreTaxonomyTerms = R.filter(R.propEq('taxonomyId', ExploreTaxonomyId));
