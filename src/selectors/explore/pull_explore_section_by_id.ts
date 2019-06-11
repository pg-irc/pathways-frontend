import { Store } from '../../stores';
import * as model from '../../stores/explore';

export const pullExploreSectionById = (store: Store, learnId: model.Id): model.ExploreSection => (
    store.exploreSections.sections[learnId]
);
