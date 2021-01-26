// tslint:disable: no-expression-statement
import React, { Dispatch, SetStateAction, useState } from 'react';
import { t } from '@lingui/macro';
import { Trans, I18n } from '@lingui/react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { Header } from 'native-base';
import { RatingsComponent } from './ratings_component';
import { ChooseRatingAction, CloseDiscardChangesModalAction, OpenDiscardChangesModalAction, SubmitServiceReviewAction } from '../../stores/reviews/actions';
import { MultilineKeyboardDoneButton, MultilineTextInputForPlatform } from '../multiline_text_input_for_platform';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboardIsVisible } from '../use_keyboard_is_visible';
import { isAndroid } from '../../application/helpers/is_android';
import { DiscardChangesModal } from '../feedback/discard_changes_modal';
import { SubmitFeedbackButton } from '../feedback/submit_feedback_button';
import { backToServiceDetailOnServiceReviewDiscard } from '../../application/routing';
import { memoryHistory } from '../../application';
import { Id } from '../../stores/services';
import { Rating } from '../../stores/reviews';

export interface ServiceReviewProps {
    readonly serviceId: Id;
    readonly serviceName: string;
    readonly rating: Rating;
    readonly showDiscardChangesModal: boolean;
}

export interface ServiceReviewActions {
    readonly chooseRating: (rating: Rating) => ChooseRatingAction;
    readonly openDiscardChangesModal: () => OpenDiscardChangesModalAction;
    readonly closeDiscardChangesModal: () => CloseDiscardChangesModalAction;
    readonly submitServiceReview: (serviceId: Id, comment: string) => SubmitServiceReviewAction;
}

type Props = ServiceReviewProps & ServiceReviewActions;

export const ServiceReviewComponent = (props: Props): JSX.Element => {
    const [comment, setComment]: readonly[string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const keyboardIsVisible = useKeyboardIsVisible();

    const onDiscardPress = (): void => {
        props.closeDiscardChangesModal();
        backToServiceDetailOnServiceReviewDiscard(memoryHistory);
    };

    const onSubmitButtonPress = (): void => {
        // TODO wire up airtable https://github.com/pg-irc/pathways-frontend/issues/1345
        props.submitServiceReview(props.serviceId, comment);
    };
    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent openDiscardChangesModal={props.openDiscardChangesModal}/>
            <KeyboardAwareScrollView
                enableResetScrollToCoords={false}
                extraHeight={100}
                enableOnAndroid={true}
                extraScrollHeight={100}
                style={{ padding: 20 }}
            >
                <ServiceNameComponent name={props.serviceName} onPress={memoryHistory.goBack} />
                <RatingQuestionComponent />
                <RatingsComponent rating={props.rating} chooseRating={props.chooseRating}/>
                <CommentComponent comment={comment} setComment={setComment}/>
            </KeyboardAwareScrollView>
            <MultilineKeyboardDoneButton isVisible={isAndroid() && keyboardIsVisible}/>
            <SubmitFeedbackButton
                isVisible={!keyboardIsVisible}
                disabled={false}
                onPress={onSubmitButtonPress}
            />
            <DiscardChangesModal
                isVisible={props.showDiscardChangesModal}
                onKeepEditingPress={props.closeDiscardChangesModal}
                onDiscardPress={onDiscardPress}
            />
        </View>
    );
};

const HeaderComponent = ({openDiscardChangesModal}: {readonly openDiscardChangesModal: () => OpenDiscardChangesModalAction}): JSX.Element => (
    <Header style={applicationStyles.headerContainer} androidStatusBarColor={colors.teal}>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0 }}
            onPress={openDiscardChangesModal}
        />
    </Header>
);

const ServiceNameComponent = ({name, onPress}: {readonly name: string, readonly onPress: () => void}): JSX.Element => (
    <View>
        <Text style={textStyles.contentTitle}>
            <Trans>Looks like you used the service,</Trans>
        </Text>
        <TouchableOpacity onPress={onPress}>
            <Text style={[textStyles.contentTitle, { color: colors.teal }]}>
                {name}
            </Text>
        </TouchableOpacity>
    </View>
);

const RatingQuestionComponent = (): JSX.Element => (
    <View style={{ paddingTop: 20, paddingBottom: 10 }}>
        <Text style={textStyles.paragraphStyle}>
            <Trans>How was your experience with this service?</Trans>
        </Text>
    </View>
);

export interface CommentProps {
    readonly comment: string;
    readonly setComment: Dispatch<SetStateAction<string>>;
}

const CommentComponent = (props: CommentProps): JSX.Element => (
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