import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouterProps } from '../../application/routing';
import { selectIsSendingReview } from '../../selectors/reviews/select_is_sending_review';
import { selectRating } from '../../selectors/reviews/select_rating';
import { selectComment } from '../../selectors/reviews/select_comment';
import { selectShowDiscardChangesModal } from '../../selectors/reviews/select_show_discard_changes_modal';
import { selectServiceNameById } from '../../selectors/services/select_service_name_by_id';
import { Store } from '../../stores';
import { Rating } from '../../stores/reviews';
import { chooseRating, ChooseRatingAction, clearReview, ClearReviewAction, closeDiscardChangesModal,
    CloseDiscardChangesModalAction, openDiscardChangesModal, OpenDiscardChangesModalAction,
    saveComment, SaveCommentAction, submitServiceReview, SubmitServiceReviewAction,
} from '../../stores/reviews/actions';
import { Id } from '../../stores/services';
import { ServiceReviewActions, ServiceReviewComponent, ServiceReviewProps } from './service_review_component';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceReviewProps => {
    const serviceId = ownProps.match.params.serviceId;
    return {
        serviceId: serviceId,
        serviceName: selectServiceNameById(store, serviceId),
        rating: selectRating(store),
        comment: selectComment(store),
        showDiscardChangesModal: selectShowDiscardChangesModal(store),
        isSending: selectIsSendingReview(store),
    };
};

type Actions = ChooseRatingAction |
    OpenDiscardChangesModalAction |
    CloseDiscardChangesModalAction |
    SubmitServiceReviewAction |
    ClearReviewAction |
    SaveCommentAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): ServiceReviewActions => ({
    chooseRating: (rating: Rating, serviceId: Id): ChooseRatingAction => dispatch(chooseRating(rating, serviceId)),
    saveComment: (comment: string): SaveCommentAction => dispatch(saveComment(comment)),
    openDiscardChangesModal: (): OpenDiscardChangesModalAction => dispatch(openDiscardChangesModal()),
    closeDiscardChangesModal: (): CloseDiscardChangesModalAction => dispatch(closeDiscardChangesModal()),
    submitServiceReview: (serviceId: Id, comment: string): SubmitServiceReviewAction => dispatch(submitServiceReview(serviceId, comment)),
    clearReview: (): ClearReviewAction => dispatch(clearReview()),
});

export const ServiceReviewConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ServiceReviewComponent);
