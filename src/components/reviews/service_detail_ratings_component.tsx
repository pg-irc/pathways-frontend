// tslint:disable: no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { textStyles, values } from '../../application/styles';
import { RatingsComponent } from './ratings_component';
import { ChooseRatingAction } from '../../stores/reviews/actions';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { useHistory } from 'react-router-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { Rating } from '../../stores/reviews';
import { Id } from '../../stores/services';

interface Props {
    readonly isVisible: boolean;
    readonly serviceId: string;
    readonly serviceName: string;
    readonly rating: Rating;
    readonly chooseRating: (rating: Rating, serviceId: Id) => ChooseRatingAction;
}

export const ServiceDetailRatingsComponent = (props: Props): JSX.Element => {
    const history = useHistory();
    const onFinishRating = (rating: Rating): ChooseRatingAction => {
        goToRouteWithParameter(Routes.ServiceReview, props.serviceId, history)();
        return props.chooseRating(rating, props.serviceId);
    };

    if (!props.isVisible) {
        return <EmptyComponent />;
    }

    return (
        <View style={{ paddingVertical: values.backgroundTextPadding}}>
            <Text style={[textStyles.headlineH3StyleBlackCenter, { paddingHorizontal: 10 }]}>
                    <Trans>How was your experience with {props.serviceName}?</Trans>
                </Text>
            <RatingsComponent rating={props.rating} serviceId={props.serviceId} chooseRating={onFinishRating}/>
        </View>
    );
};