import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouterProps } from '../../application/routing';
import { selectRating } from '../../selectors/reviews/select_rating';
import { selectShowDiscardChangesModal } from '../../selectors/reviews/select_show_discard_changes_modal';
import { selectServiceNameById } from '../../selectors/services/select_service_name_by_id';
import { Store } from '../../stores';
import { chooseRating, ChooseRatingAction, closeDiscardChangesModal,
    CloseDiscardChangesModalAction, openDiscardChangesModal, OpenDiscardChangesModalAction,
} from '../../stores/reviews/actions';
import { ServiceReviewActions, ServiceReviewComponent, ServiceReviewProps } from './service_review_component';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceReviewProps => {
    const serviceId = ownProps.match.params.serviceId;
    return {
        serviceId: serviceId,
        serviceName: selectServiceNameById(store, serviceId),
        rating: selectRating(store),
        showDiscardChangesModal: selectShowDiscardChangesModal(store),
    };
};

type Actions = ChooseRatingAction |
    OpenDiscardChangesModalAction |
    CloseDiscardChangesModalAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): ServiceReviewActions => ({
    chooseRating: (rating: number): ChooseRatingAction =>
        dispatch(chooseRating(rating)),
    openDiscardChangesModal: (): OpenDiscardChangesModalAction =>
        dispatch(openDiscardChangesModal()),
    closeDiscardChangesModal: (): CloseDiscardChangesModalAction =>
        dispatch(closeDiscardChangesModal()),
});

export const ServiceReviewConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ServiceReviewComponent);
