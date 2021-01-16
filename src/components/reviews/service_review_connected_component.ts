import { connect } from 'react-redux';
import { RouterProps } from '../../application/routing';
import { selectServiceNameById } from '../../selectors/services/select_service_name_by_id';
import { Store } from '../../stores';
import { ServiceReviewComponent, ServiceReviewProps } from './service_review_component';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceReviewProps => {
    const serviceId = ownProps.match.params.serviceId;
    return {
        serviceId: serviceId,
        serviceName: selectServiceNameById(store, serviceId),
    };
};

export const ServiceReviewConnectedComponent = connect(mapStateToProps)(ServiceReviewComponent);
