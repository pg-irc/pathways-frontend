// tslint:disable: no-expression-statement
import React, { Dispatch, SetStateAction, useState } from 'react';
import { t } from '@lingui/macro';
import { Trans, I18n } from '@lingui/react';
import { Text, View } from 'react-native';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { Header } from 'native-base';
import { RatingsComponent } from './ratings_component';
import { ChooseRatingAction, ClearReviewAction, CloseDiscardChangesModalAction, OpenDiscardChangesModalAction, SubmitServiceReviewAction } from '../../stores/reviews/actions';
import { MultilineKeyboardDoneButton, MultilineTextInputForPlatform } from '../multiline_text_input_for_platform';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboardIsVisible } from '../use_keyboard_is_visible';
import { isAndroid } from '../../application/helpers/is_android';
import { DiscardChangesModal } from '../feedback/discard_changes_modal';
import { SubmitFeedbackButton } from '../feedback/submit_feedback_button';
import { backFromServiceReview, goToRouteWithParameter, Routes } from '../../application/routing';
import { memoryHistory } from '../../application';
import { Id } from '../../stores/services';
import { Rating } from '../../stores/reviews';
import { History } from 'history';

export interface ServiceReviewProps {
    readonly serviceId: Id;
    readonly serviceName: string;
    readonly rating: Rating;
    readonly showDiscardChangesModal: boolean;
    readonly isSending: boolean;
}

export interface ServiceReviewActions {
    readonly chooseRating: (rating: Rating, serviceId: Id) => ChooseRatingAction;
    readonly openDiscardChangesModal: () => OpenDiscardChangesModalAction;
    readonly closeDiscardChangesModal: () => CloseDiscardChangesModalAction;
    readonly submitServiceReview: (serviceId: Id, comment: string) => SubmitServiceReviewAction;
    readonly clearReview: () => ClearReviewAction;
}

type Props = ServiceReviewProps & ServiceReviewActions;

export const ServiceReviewComponent = (props: Props): JSX.Element => {
    const [comment, setComment]: readonly[string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const keyboardIsVisible = useKeyboardIsVisible();

    const onDiscardPress = (): void => {
        props.clearReview();
        props.closeDiscardChangesModal();
        backFromServiceReview(memoryHistory);
    };

    const onSubmitButtonPress = (): void => {
        props.submitServiceReview(props.serviceId, comment);
        backFromServiceReview(memoryHistory);
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
                <ServiceNameComponent name={props.serviceName}/>
                <RatingQuestionComponent />
                <RatingsComponent rating={props.rating} serviceId={props.serviceId} chooseRating={props.chooseRating}/>
                <CommentComponent comment={comment} setComment={setComment} isFocused={props.rating !== Rating.Zero}/>
                <ExplainReviewUsageComponent history={memoryHistory} serviceId={props.serviceId}/>
            </KeyboardAwareScrollView>
            <MultilineKeyboardDoneButton isVisible={isAndroid() && keyboardIsVisible}/>
            <SubmitFeedbackButton
                isVisible={!keyboardIsVisible}
                disabled={props.isSending || props.rating === Rating.Zero}
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

const ServiceNameComponent = ({name}: {readonly name: string}): JSX.Element => (
    <View>
        <Text style={[textStyles.contentTitle, { fontSize: 20 }]}>
            <Trans>Looks like you used the service,</Trans> {name}
        </Text>
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
    readonly isFocused: boolean;
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
                            isFocused={props.isFocused}
                            onChangeText={props.setComment}
                        />
                    </View>
                </View>
            )
        }
    </I18n>
);

const ExplainReviewUsageComponent = ({ history, serviceId }: { readonly history: History, readonly serviceId: Id }): JSX.Element => {
    const onPress = (): void => {
        goToRouteWithParameter(Routes.ExplainFeedback, serviceId, history)();
    };
    return (
        <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={[textStyles.paragraphSmallStyleLeft, { fontSize: 14 }]}>
                <Trans>Your feedback is reviewed by our team and shared with the service provider.</Trans>
                <Text style={[textStyles.messageLink, { fontSize: 14 }]}onPress={onPress}>
                        {' '}
                        <Trans>Learn more</Trans>
                    </Text>
            </Text>
        </View>
    );
};