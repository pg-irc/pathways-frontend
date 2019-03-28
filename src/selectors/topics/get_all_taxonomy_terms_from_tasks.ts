import { TopicMap } from '../../stores/topics';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { getTaxonomyTerms } from './get_taxonomy_terms';
import { flattenOneLevel } from '../questionnaire/flatten_one_level';
import * as R from 'ramda';

export const getAllTaxonomyTermsFromTasks = (tasks: TopicMap): ReadonlyArray<TaxonomyTermReference> => (
    R.uniq(flattenOneLevel(R.map(getTaxonomyTerms, R.values(tasks))))
);
