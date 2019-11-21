import { connect } from 'react-redux';
import { Store } from '../../stores';
import { selectCurrentService } from '../../selectors/services/select_current_service';
import { ServiceDetailProps, ServiceDetailComponent } from './service_detail_component';
import { RouterProps } from '../../application/routing';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceDetailProps => {
    return {
        service: selectCurrentService(store, ownProps.match.params.serviceId),
        history: ownProps.history,
    };
};

export const ServiceDetailConnectedComponent = connect(mapStateToProps)(ServiceDetailComponent);
