// tslint:disable:no-expression-statement
import { t } from '@lingui/macro';
import { Trans, I18n } from '@lingui/react';
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Item,
    Input,
    Label,
    Text,
} from 'native-base';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useHistory } from 'react-router-native';

import { colors } from '../../application/styles';
import { goBack } from '../../application/routing';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import { otherRemoveServiceStyles as styles } from './styles';
import { Feedback, FeedbackScreen, FeedbackModal } from '../../stores/feedback/types';
import { SubmitAction, DiscardChangesAction, CloseAction, BackAction, CancelDiscardChangesAction } from '../../stores/feedback';
import { DiscardChangesModal } from './discard_changes_modal';
import { HeaderComponent } from './header_component';

type ContentComponentProps = {
    readonly input: string;
    readonly inputLabel: TemplateStringsArray;
    readonly onInputChange: (value: string) => void;
    readonly placeholder: TemplateStringsArray;
};

type FooterComponentProps = {
    readonly disabled: boolean;
    readonly submitFeedback: () => void;
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
    readonly feedbackScreen: FeedbackScreen;
    readonly feedbackModal: FeedbackModal;
}

export interface OtherRemoveServiceActions {
    readonly submitFeedback: (feedback: Feedback) => SubmitAction;
    readonly discardFeedback: () => DiscardChangesAction;
    readonly cancelDiscardFeedback: () => CancelDiscardChangesAction;
    readonly close: () => CloseAction;
    readonly back: () => BackAction;
}

export type FeedbackOtherRemoveServiceProps = OtherRemoveServiceState & OtherRemoveServiceActions;

const SUGGESTION_CONTENT: SuggestionContentMap = {
    OTHER: {
        header: t`Other feedback about this service.`,
        label: t`Tell us more about this service`,
        placeholder: t`Comment or suggest edits`,
    },
    REMOVE_SERVICE: {
        header: t`This service no longer exists.`,
        label: t`Provide any additional information (optional)`,
        placeholder: t`e.g. Service is permanently closed`,
    },
};

const ContentComponent = (props: ContentComponentProps): JSX.Element => {
  return (
        <I18n>
            {
                ({ i18n }: I18nProps): JSX.Element => (
                    <Content padder>
                        <Item placeholderLabel={true} stackedLabel>
                            <Label style={styles.inputLabel}>
                                <Trans id={props.inputLabel} />
                            </Label>
                            <Input
                                multiline
                                numberOfLines={5}
                                onChangeText={props.onInputChange}
                                placeholder={i18n._(props.placeholder)}
                                placeholderTextColor={colors.darkerGrey}
                                style={styles.input}
                                textAlignVertical='top'
                                value={props.input}
                            />
                        </Item>
                    </Content>
                )
            }
        </I18n>
  );
};

const FooterComponent = (props: FooterComponentProps): JSX.Element => {
    const submitTextStyle = props.disabled
        ? styles.submitText
        : styles.submitTextDisabled;

    const submitButtonStyle = props.disabled
        ? [styles.submitButton, styles.submitButtonDisabled]
        : styles.submitButton;

    return (
        <Footer style={styles.footerContainer}>
            <FooterTab style={styles.footerTab}>
                <MultiLineButtonComponent
                    onPress={props.submitFeedback}
                    additionalStyles={submitButtonStyle}
                    disabled={props.disabled}
                >
                    <Text style={submitTextStyle}>
                        <Trans>Submit</Trans>
                    </Text>
                </MultiLineButtonComponent>
            </FooterTab>
        </Footer>
    );
};

export const OtherRemoveServiceComponent = (props: FeedbackOtherRemoveServiceProps): JSX.Element => {
    const isOtherFeedback = props.feedbackScreen === FeedbackScreen.OtherChangesPage;
    const content: SuggestionContent = isOtherFeedback ? SUGGESTION_CONTENT.OTHER : SUGGESTION_CONTENT.REMOVE_SERVICE;
    const history = useHistory();
    const [feedback, setFeedback]: readonly[string, Dispatch<SetStateAction<string>>] = useState<string>('');

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
    };

    return (
        <Container>
            <HeaderComponent headerLabel={content.header} back={props.back} close={props.close} />
            <ContentComponent
                inputLabel={content.label}
                input={feedback}
                onInputChange={setFeedback}
                placeholder={content.placeholder}
            />
            <FooterComponent disabled={feedback.length === 0} submitFeedback={submitFeedback} />
            <DiscardChangesModal
                onDiscardPress={props.discardFeedback}
                onKeepEditingPress={props.cancelDiscardFeedback}
                isVisible={props.feedbackModal === FeedbackModal.ConfirmDiscardChangesModal}
            />
        </Container>
    );
};
