// tslint:disable:no-expression-statement no-let
import { reduce, FeedbackScreen, suggestAnUpdate, chooseChangeNameOrDetails } from '../feedback/actions';

describe('feedback reducer', () => {
    test('suggest update opens choose mode modal', () => {
        const oldStore = {
            screen: FeedbackScreen.ServiceDetail,
        };
        const action = suggestAnUpdate();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ChooseFeedbackModeModal);
    });
    test('change name and details opens editable service detail', () => {
        const oldStore = {
            screen: FeedbackScreen.ChooseFeedbackModeModal,
        };
        const action = chooseChangeNameOrDetails();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.EditableServiceDetailPage);
    });

});
