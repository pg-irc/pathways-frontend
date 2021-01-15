// tslint:disable: no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { textStyles } from '../../application/styles';
import { RatingsComponent } from './ratings_component';
import { ChooseRatingAction } from '../../stores/reviews/actions';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { useHistory } from 'react-router-native';

interface Props {
    readonly serviceId: string;
    readonly rating: number;
    readonly chooseRating: (rating: number) => ChooseRatingAction;
}

export const ServiceDetailRatingsComponent = (props: Props): JSX.Element => {
    const history = useHistory();
    const onFinishRating = (rating: number): void => {
        props.chooseRating(rating);
        goToRouteWithParameter(Routes.ServiceReview, props.serviceId, history)();
    };
    return (
        <View>
            <Text style={textStyles.headlineH3StyleBlackCenter}>
                    <Trans>Review this service</Trans>
                </Text>
            <RatingsComponent rating={props.rating} onFinishRating={onFinishRating}/>
        </View>
    );
};