import { Task } from '../../stores/topics';
import { TaxonomyTermReference } from '../../stores/taxonomies';

export const getTaxonomyTerms = (task: Task): ReadonlyArray<TaxonomyTermReference> => task.taxonomyTerms;
