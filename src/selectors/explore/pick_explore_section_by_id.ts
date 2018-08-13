import { Store } from '../../stores';
import { Id, ExploreSection } from '../../stores/explore';

export const pickExploreSectionById = (appStore: Store, id: Id): ExploreSection => (
    appStore.exploreSectionsInStore.sections[id]
);
