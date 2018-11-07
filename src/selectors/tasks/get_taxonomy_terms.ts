import { Task } from '../../stores/tasks';
import { TaxonomyTermReference } from '../../stores/taxonomies';

export const getTaxonomyTerms = (task: Task): ReadonlyArray<TaxonomyTermReference> => task.taxonomyTerms;
