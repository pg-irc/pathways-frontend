import { Store } from '../../stores';
import * as model from '../../stores/explore';

export const pullExploreSection = (store: Store, learnId: model.Id): model.ExploreSection => (
    store.exploreSectionsInStore.sections[learnId]
);
