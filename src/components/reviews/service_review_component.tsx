import React from 'react';
import { Trans } from '@lingui/react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles, applicationStyles, values } from '../../application/styles';
import { Header } from 'native-base';
import { RatingsComponent } from './ratings_component';
import { chooseRating, ChooseRatingAction } from '../../stores/reviews/actions';

export interface ServiceReviewProps {
    readonly serviceId: string;
    readonly serviceName: string;
    readonly rating: number;
}

export interface ServiceReviewActions {
    readonly chooseRating: (rating: number) => ChooseRatingAction;
}

type Props = ServiceReviewProps & ServiceReviewActions;

export const ServiceReviewComponent = (props: Props): JSX.Element => {
    return (
        <View>
        <HeaderComponent/>
        <ServiceNameComponent name={props.serviceName}/>
        <RatingQuestionComponent />
        <RatingsComponent rating={props.rating} onFinishRating={chooseRating}/>
    </View>
    );
};

export const HeaderComponent = (): JSX.Element => (
    <Header style={applicationStyles.headerContainer} androidStatusBarColor={colors.teal}>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0 }}
            onPress={(): void => console.log('go back to previous page')}
        />
    </Header>
);

export const ServiceNameComponent = ({name}: {readonly name: string}): JSX.Element => {
    return (
        <View>
            <Text style={[textStyles.contentTitle, { paddingHorizontal: values.backgroundTextPadding }]}>
                <Trans>Looks like you used the service,</Trans>
            </Text>
            <TouchableOpacity>
                <Text style={[textStyles.contentTitle, { paddingHorizontal: values.backgroundTextPadding, color: colors.teal }]}>
                    {name}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export const RatingQuestionComponent = (): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphStyle}>
            <Trans>How would you rate this service?</Trans>
        </Text>
    </View>
);