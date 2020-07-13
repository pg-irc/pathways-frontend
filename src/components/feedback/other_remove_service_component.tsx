// tslint:disable:no-expression-statement
import { t } from '@lingui/macro';
import { Trans, I18n } from '@lingui/react';
import { TextInput, Text } from 'react-native';
import { Container, Content } from 'native-base';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useHistory } from 'react-router-native';
import { colors, textStyles } from '../../application/styles';
import { goBack, Routes, RouterProps, goToRouteWithParameter } from '../../application/routing';
import { otherRemoveServiceStyles as styles } from './styles';
import { Feedback, FeedbackScreen, FeedbackModal } from '../../stores/feedback/types';
import { SubmitAction, DiscardChangesAction, CloseAction, CancelDiscardChangesAction, CloseWithFeedbackAction } from '../../stores/feedback';
import { DiscardChangesModal } from './discard_changes_modal';
import { HeaderComponent } from './header_component';
import { SubmitFeedbackButton } from './submit_feedback_button';
import { isAndroid } from '../../application/helpers/is_android';

type ContentComponentProps = {
    readonly input: string;
    readonly inputLabel: TemplateStringsArray;
    readonly onInputChange: (value: string) => void;
    readonly placeholder: TemplateStringsArray;
};

interface SuggestionContent {
    readonly header: TemplateStringsArray;
    readonly label: TemplateStringsArray;
    readonly placeholder: TemplateStringsArray;
}

interface SuggestionContentMap {
    readonly [key: string]: SuggestionContent;
}

export interface OtherRemoveServiceState {
    readonly feedbackByType: string;
    readonly feedbackScreen: FeedbackScreen;
    readonly feedbackModal: FeedbackModal;
}

export interface OtherRemoveServiceActions {
    readonly submitFeedback: (feedback: Feedback) => SubmitAction;
    readonly discardFeedback: () => DiscardChangesAction;
    readonly cancelDiscardFeedback: () => CancelDiscardChangesAction;
    readonly close: () => CloseAction;
    readonly closeWithFeedback: () => CloseWithFeedbackAction;
}

export type FeedbackOtherRemoveServiceProps = OtherRemoveServiceState & OtherRemoveServiceActions & RouterProps;

const SUGGESTION_CONTENT: SuggestionContentMap = {
    OTHER: {
        header: t`Other suggestions`,
        label: t`Tell us more about this service`,
        placeholder: t`Comment or suggest edits`,
    },
    REMOVE_SERVICE: {
        header: t`This service no longer exists`,
        label: t`Provide any additional information (optional)`,
        placeholder: t`e.g. Service is permanently closed`,
    },
};

const ContentComponent = (props: ContentComponentProps): JSX.Element => {
  return (
        <I18n>
            {
                ({ i18n }: I18nProps): JSX.Element => (
                    <Content padder style={{ marginTop: 5}}>
                        <Text style={[textStyles.suggestionText, {paddingBottom: 10, marginHorizontal: 10 }]}>
                            <Trans id={props.inputLabel} />
                        </Text>
                        <TextInput
                            multiline
                            numberOfLines={5}
                            onChangeText={props.onInputChange}
                            placeholder={i18n._(props.placeholder)}
                            placeholderTextColor={colors.darkerGrey}
                            style={[styles.input, { marginHorizontal: getMarginHorizontalForPlatform()}]}
                            textAlignVertical='top'
                            value={props.input}
                        />
                    </Content>
                )
            }
        </I18n>
  );
};

const getMarginHorizontalForPlatform = (): number => (
    isAndroid() ? 0 : 10
)

export const OtherRemoveServiceComponent = (props: FeedbackOtherRemoveServiceProps): JSX.Element => {
    const isOtherFeedback = props.feedbackScreen === FeedbackScreen.OtherChangesPage;
    const content: SuggestionContent = isOtherFeedback ? SUGGESTION_CONTENT.OTHER : SUGGESTION_CONTENT.REMOVE_SERVICE;
    const history = useHistory();
    const [feedback, setFeedback]: readonly[string, Dispatch<SetStateAction<string>>] = useState<string>(props.feedbackByType);

    useEffect((): void => {
        if (props.feedbackScreen === FeedbackScreen.ServiceDetail) {
            goBack(history);
        }
    }, [props.feedbackScreen]);

    const submitFeedback = (): void => {
        if (isOtherFeedback) {
            props.submitFeedback({ type: 'other_feedback', value: feedback });
        } else {
            props.submitFeedback({ type: 'remove_service', reason: feedback });
        }
        goToRouteWithParameter(Routes.ContactInformation, props.match.params.serviceId, history)();
    };

    const onDiscardModalDiscardPress = (): void => {
        props.discardFeedback();
        goToRouteWithParameter(Routes.ServiceDetail, props.match.params.serviceId, history)();
    };

    const onClosePress = (): void => {
        if (!feedback) {
            props.close();
            goToRouteWithParameter(Routes.ServiceDetail, props.match.params.serviceId, history)();
        }
        props.closeWithFeedback();
    };

    return (
        <Container>
            <HeaderComponent
                headerLabel={content.header}
                close={onClosePress}
            />
            <ContentComponent
                inputLabel={content.label}
                input={feedback}
                onInputChange={setFeedback}
                placeholder={content.placeholder}
            />
            <SubmitFeedbackButton
                onPress={submitFeedback}
                disabled={!feedback}
                isVisible={true}
            />
            <DiscardChangesModal
                onDiscardPress={onDiscardModalDiscardPress}
                onKeepEditingPress={props.cancelDiscardFeedback}
                isVisible={props.feedbackModal === FeedbackModal.ConfirmDiscardChangesModal}
            />
        </Container>
    );
};