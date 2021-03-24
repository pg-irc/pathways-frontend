import { Store } from "../../stores";
import { Topic } from "./types";
import { selectCurrentTopic } from "./select_current_topic";

export const selectHelpTopicForRegion = (appStore: Store): Topic => {
    // TODO get the current region from the store
    // TODO map from region to the region-specific topic to retrieve from the help screen
    const topicId = 'contact-workers-at-your-local-settlement-agency_bc';
    return selectCurrentTopic(appStore, topicId);
}
