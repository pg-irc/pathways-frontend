import React from 'react';
import { t } from '@lingui/macro';
import { Trans, I18n } from '@lingui/react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { Header } from 'native-base';
import { RatingsComponent } from './ratings_component';
import { chooseRating, ChooseRatingAction } from '../../stores/reviews/actions';
import { useHistory } from 'react-router-native';
import { MultilineTextInputForPlatform } from '../multiline_text_input_for_platform';

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
        <View style={{ flex: 1 }}>
        <HeaderComponent/>
        <View style={{ padding: 20 }}>
            <ServiceNameComponent name={props.serviceName}/>
            <RatingQuestionComponent />
            <RatingsComponent rating={props.rating} onFinishRating={chooseRating}/>
            <CommentComponent />
        </View>
    </View>
    );
};

const HeaderComponent = (): JSX.Element => {
    const history = useHistory();
    return (
        <Header style={applicationStyles.headerContainer} androidStatusBarColor={colors.teal}>
            <CloseButtonComponent
                color={colors.greyishBrown}
                additionalStyle={{ paddingTop: 0 }}
                // TODO include discard modal logic
                onPress={history.goBack}
            />
        </Header>
    );
};

const ServiceNameComponent = ({name}: {readonly name: string}): JSX.Element => {
    return (
        <View>
            <Text style={textStyles.contentTitle}>
                <Trans>Looks like you used the service,</Trans>
            </Text>
            <TouchableOpacity>
                <Text style={[textStyles.contentTitle, { color: colors.teal }]}>
                    {name}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const RatingQuestionComponent = (): JSX.Element => (
    <View style={{ paddingTop: 20, paddingBottom: 10 }}>
        <Text style={textStyles.paragraphStyle}>
            <Trans>How would you rate this service?</Trans>
        </Text>
    </View>
);

const CommentComponent = (): JSX.Element => {
    return (
        <I18n>
            {
                ({ i18n }: I18nProps): JSX.Element => (
                    <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                    <Text style={textStyles.paragraphStyle}>
                        <Trans>Tell us more about your experience:</Trans>
                    </Text>
                    <MultilineTextInputForPlatform
                        i18n={i18n}
                        value={''}
                        numberOfLines={5}
                        placeholder={t`Comment`}
                        style={[applicationStyles.input, { marginHorizontal: 0, marginTop: 10}]}
                        isFocused={false}
                        onChangeText={() => console.log('onChange')}
                    />
                </View>
                )
            }
        </I18n>
    );
};