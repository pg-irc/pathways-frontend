import * as select from './types';
import * as stores from '../../stores/explore';

export const buildExploreSection = (theSection: stores.ExploreSection, icon: string): select.ExploreSection => {
    const id = theSection.id;
    const name = theSection.name;
    const description = theSection.description;

    return { id, name, description, icon };
};
