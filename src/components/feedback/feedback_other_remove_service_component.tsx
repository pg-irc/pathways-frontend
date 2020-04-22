// tslint:disable:no-expression-statement
import { t } from '@lingui/macro';
import { Trans, I18n } from '@lingui/react';
import {
    Button,
    Container,
    Content,
    Footer,
    FooterTab,
    Header,
    Icon,
    Item,
    Input,
    Label,
    Left,
    Right,
    Text,
    Title,
} from 'native-base';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useHistory } from 'react-router-native';

import { colors, textStyles } from '../../application/styles';
import { goBack } from '../../application/routing';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';

import { otherRemoveServiceStyles as styles } from './styles';
import { Feedback, FeedbackScreen, FeedbackModal } from '../../stores/feedback/types';
import { SubmitAction, DiscardChangesAction, CloseAction, BackAction, CancelDiscardChangesAction } from '../../stores/feedback';
import { FeedbackDiscardChangesModal } from './feedback_discard_changes_modal';

type HeaderComponentProps = {
    readonly headerLabel: TemplateStringsArray;
    readonly onClosePress: () => void;
    readonly onBackPress: () => void;
};

type ContentComponentProps = {
    readonly input: string;
    readonly inputLabel: TemplateStringsArray;
    readonly onInputChange: (value: string) => void;
    readonly placeholder: TemplateStringsArray;
};

type FooterComponentProps = {
    readonly disabled: boolean;
    readonly onSubmitPress: () => void;
};

interface SuggestionContent {
    readonly header: TemplateStringsArray;
    readonly label: TemplateStringsArray;
    readonly placeholder: TemplateStringsArray;
}

interface SuggestionContentMap {
    readonly [key: string]: SuggestionContent;
}

export interface FeedbackOtherRemoveServiceState {
    readonly feedbackScreen: FeedbackScreen;
    readonly feedbackModal: FeedbackModal;
}

export interface FeedbackOtherRemoveServiceActions {
    readonly submitFeedback: (feedback: Feedback) => SubmitAction;
    readonly discardFeedback: () => DiscardChangesAction;
    readonly cancelDiscardFeedback: () => CancelDiscardChangesAction;
    readonly close: () => CloseAction;
    readonly back: () => BackAction;
}

export type FeedbackOtherRemoveServiceProps = FeedbackOtherRemoveServiceState & FeedbackOtherRemoveServiceActions;

const SUGGESTION_CONTENT: SuggestionContentMap = {
    OTHER: {
        header: t`Other`,
        label: t`Tell us more about this service`,
        placeholder: t`Comment or suggest edits`,
    },
    REMOVE_SERVICE: {
        header: t`Remove Service`,
        label: t`What is your reason for removal?`,
        placeholder: t`e.g. Service is permanently closed`,
    },
};

const HeaderComponent = ({ headerLabel, onClosePress, onBackPress}: HeaderComponentProps): JSX.Element => (
    <Header style={styles.headerContainer}>
        <Left style={styles.headerBackButton}>
            <Button onPress={onBackPress} transparent>
                <Icon name='chevron-left' type='FontAwesome' style={styles.headerElement}/>
            </Button>
            <Title style={styles.headerLeftTitle}>
                <Text style={textStyles.headline6}>
                    <Trans id={headerLabel} />
                </Text>
            </Title>
        </Left>
        <Right>
            <CloseButtonComponent
                color={colors.greyishBrown}
                additionalStyle={{ paddingTop: 0 }}
                onPress={onClosePress}
            />
        </Right>
    </Header>
);

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
                    onPress={props.onSubmitPress}
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

export const FeedbackOtherRemoveServiceComponent = (props: FeedbackOtherRemoveServiceProps): JSX.Element => {
    const isOtherFeedback = props.feedbackScreen === FeedbackScreen.OtherChangesPage;
    const content: SuggestionContent = isOtherFeedback ? SUGGESTION_CONTENT.OTHER : SUGGESTION_CONTENT.REMOVE_SERVICE;
    const history = useHistory();
    const [feedback, setFeedback]: readonly[string, Dispatch<SetStateAction<string>>] = useState<string>('');
    useEffect(navigateOnScreenChange, [props.feedbackScreen]);

    function navigateOnScreenChange(): void {
        if (props.feedbackScreen === FeedbackScreen.ServiceDetail) {
            goBack(history);
        }
    }

    const onSubmitPress = (): void => {
        if (isOtherFeedback) {
            props.submitFeedback({ type: 'other_feedback', value: feedback });
        } else {
            props.submitFeedback({ type: 'remove_service', reason: feedback });
        }
    };

    const onBackPress = (): void => {
        props.back();
    };

    const onClosePress = (): void => {
        props.close();
    };

    const onDiscardPress = (): void => {
        props.discardFeedback();
    };

    const onKeepEditingPress = (): void => {
        props.cancelDiscardFeedback();
    };

    return (
        <Container>
            <HeaderComponent headerLabel={content.header} onBackPress={onBackPress} onClosePress={onClosePress} />
            <ContentComponent
                inputLabel={content.label}
                input={feedback}
                onInputChange={setFeedback}
                placeholder={content.placeholder}
            />
            <FooterComponent disabled={feedback.length === 0} onSubmitPress={onSubmitPress} />
            <FeedbackDiscardChangesModal
                isVisible={props.feedbackModal === FeedbackModal.ConfirmDiscardChangesModal}
                onDiscardPress={onDiscardPress}
                onKeepEditingPress={onKeepEditingPress}
            />
        </Container>
    );
};
