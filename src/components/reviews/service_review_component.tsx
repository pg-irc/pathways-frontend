import React from 'react';
import { Text, View } from 'react-native';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles, applicationStyles } from '../../application/styles';
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
        <HeaderComponent name={props.serviceName}/>
        <RatingsComponent rating={props.rating} onFinishRating={chooseRating}/>
    </View>
    );
};

export const HeaderComponent = ({name}: {readonly name: string}): JSX.Element => (
    <Header style={applicationStyles.headerContainer} androidStatusBarColor={colors.teal}>
        <View style={{ flex: 4, paddingHorizontal: 15 }}>
            <Text style={textStyles.headline6}>
                {name}
            </Text>
        </View>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0 }}
            onPress={(): void => console.log('go back to previous page')}
        />
    </Header>
);