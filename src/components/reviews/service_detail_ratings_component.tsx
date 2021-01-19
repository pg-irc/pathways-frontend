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

interface Props {
    readonly isVisible: boolean;
    readonly serviceId: string;
    readonly serviceName: string;
    readonly rating: number;
    readonly chooseRating: (rating: number) => ChooseRatingAction;
}

export const ServiceDetailRatingsComponent = (props: Props): JSX.Element => {
    const history = useHistory();
    const onFinishRating = (rating: number): ChooseRatingAction => {
        goToRouteWithParameter(Routes.ServiceReview, props.serviceId, history)();
        return props.chooseRating(rating);
    };

    if (!props.isVisible) {
        return <EmptyComponent />;
    }

    return (
        <View style={{ paddingVertical: values.backgroundTextPadding}}>
            <Text style={[textStyles.headlineH3StyleBlackCenter, { paddingHorizontal: 10 }]}>
                    <Trans>How was your experience with</Trans> {props.serviceName}?
                </Text>
            <RatingsComponent rating={props.rating} chooseRating={onFinishRating}/>
        </View>
    );
};