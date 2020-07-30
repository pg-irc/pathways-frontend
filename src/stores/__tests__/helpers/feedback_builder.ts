// tslint:disable: readonly-keyword no-this no-class
import { ServiceFeedback, FeedbackField } from '../../feedback/types';
import { aString } from '../../../application/helpers/random_test_values';

const aFeedbackField = (): FeedbackField => ({value: aString(), shouldSend: true});

export class ServiceFeedbackBuilder {
    name: FeedbackField = aFeedbackField();
    organization: FeedbackField = aFeedbackField();
    description: FeedbackField = aFeedbackField();
    address: FeedbackField = aFeedbackField();
    phone: FeedbackField = aFeedbackField();
    website: FeedbackField = aFeedbackField();
    email: FeedbackField = aFeedbackField();

    build(): ServiceFeedback {
        return {
            type: 'service_feedback',
            name: this.name,
            organization: this.organization,
            description: this.description,
            address: this.address,
            phone: this.phone,
            website: this.website,
            email: this.email,
        };
    }
}
