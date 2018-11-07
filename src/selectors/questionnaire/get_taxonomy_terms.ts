import { Answer } from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';

export const getTaxonomyTerms = (answer: Answer): ReadonlyArray<TaxonomyTermReference> => answer.taxonomyTerms;
