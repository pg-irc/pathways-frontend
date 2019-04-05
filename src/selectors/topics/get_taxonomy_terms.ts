import { Topic } from '../../stores/topics';
import { TaxonomyTermReference } from '../../stores/taxonomies';

export const getTaxonomyTerms = (topic: Topic): ReadonlyArray<TaxonomyTermReference> => topic.taxonomyTerms;
