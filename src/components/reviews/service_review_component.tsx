import React, { Dispatch, SetStateAction, useState } from 'react';
import { t } from '@lingui/macro';
import { Trans, I18n } from '@lingui/react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { Header } from 'native-base';
import { RatingsComponent } from './ratings_component';
import { chooseRating, ChooseRatingAction, CloseDiscardChangesModalAction, OpenDiscardChangesModalAction } from '../../stores/reviews/actions';
import { useHistory } from 'react-router-native';
import { MultilineKeyboardDoneButton, MultilineTextInputForPlatform } from '../multiline_text_input_for_platform';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboardIsVisible } from '../use_keyboard_is_visible';
import { isAndroid } from '../../application/helpers/is_android';

export interface ServiceReviewProps {
    readonly serviceId: string;
    readonly serviceName: string;
    readonly rating: number;
    readonly showDiscardChangesModal: boolean;
}

export interface ServiceReviewActions {
    readonly chooseRating: (rating: number) => ChooseRatingAction;
    readonly openDiscardChangesModal: () => OpenDiscardChangesModalAction;
    readonly closeDiscardChangesModal: () => CloseDiscardChangesModalAction;
}

type Props = ServiceReviewProps & ServiceReviewActions;

export const ServiceReviewComponent = (props: Props): JSX.Element => {
    const [comment, setComment]: readonly[string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const keyboardIsVisible = useKeyboardIsVisible();
    return (
        <View style={{ flex: 1 }}>
        <HeaderComponent/>
        <KeyboardAwareScrollView
            enableResetScrollToCoords={false}
            extraHeight={100}
            enableOnAndroid={true}
            extraScrollHeight={100}
            style={{ padding: 20 }}
        >
            <ServiceNameComponent name={props.serviceName}/>
            <RatingQuestionComponent />
            <RatingsComponent rating={props.rating} onFinishRating={chooseRating}/>
            <CommentComponent comment={comment} setComment={setComment}/>
        </KeyboardAwareScrollView>
            <MultilineKeyboardDoneButton isVisible={isAndroid() && keyboardIsVisible}/>
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

export interface CommentProps {
    readonly comment: string;
    readonly setComment: Dispatch<SetStateAction<string>>;
}

const CommentComponent = (props: CommentProps): JSX.Element => {
    return (
        <I18n>
            {
                ({ i18n }: I18nProps): JSX.Element => (
                    <View style={{ paddingTop: 20, flex: 1 }}>
                        <Text style={textStyles.paragraphStyle}>
                            <Trans>Tell us more about your experience:</Trans>
                        </Text>
                    <View style={{ marginTop: 20 }}>
                        <MultilineTextInputForPlatform
                            i18n={i18n}
                            value={props.comment}
                            numberOfLines={5}
                            placeholder={t`Comment`}
                            style={applicationStyles.input}
                            isFocused={true}
                            onChangeText={props.setComment}
                        />
                    </View>
                </View>
                )
            }
        </I18n>
    );
};