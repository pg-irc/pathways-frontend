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
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useHistory, useParams } from 'react-router-native';

import { colors, textStyles } from '../../application/styles';
import { Routes, replaceRouteWithParameter, QueryParameters } from '../../application/routing';
import { useQuery } from '../../hooks/use_query';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';

import { otherRemoveServiceStyles as styles } from './styles';
import { getEmptyFeedback, Feedback } from './hooks/use_send_feedback';

type HeaderComponentProps = {
    readonly headerLabel: TemplateStringsArray;
    readonly serviceId: string;
};

type ContentComponentProps = {
    readonly input: string;
    readonly inputLabel: TemplateStringsArray;
    readonly onInputChange: (value: string) => void;
    readonly placeholder: TemplateStringsArray;
};

type FooterComponentProps = {
    readonly disabled: boolean;
    readonly onSubmit: () => void;
};

interface RouteParams {
    readonly serviceId: string;
}

interface SuggestionContent {
    readonly header: TemplateStringsArray;
    readonly label: TemplateStringsArray;
    readonly placeholder: TemplateStringsArray;
}

interface SuggestionContentMap {
    readonly [key: string]: SuggestionContent;
}

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

const useServiceDetailRoute = (serviceId: string, queryParam: QueryParameters): () => void => {
    const history = useHistory();

    return replaceRouteWithParameter(
        Routes.ServiceDetail,
        serviceId,
        history,
        queryParam,
    );
};

const useFeedbackInputControl = (): readonly [string, (value: string) => void] => {
    const [input, setInput]: readonly [string, Dispatch<SetStateAction<string>>]
        = useState<string>('');

    const onInputChange = (value: string): void => setInput(value);

    return [input, onInputChange];
};

const HeaderComponent = ({ headerLabel, serviceId }: HeaderComponentProps): JSX.Element => {
    const goBackShowModal = useServiceDetailRoute(
        serviceId,
        { feedbackOptionsModalMode: 'hidden' },
    );

    const goBackHideModal = useServiceDetailRoute(
        serviceId,
        { feedbackOptionsModalMode: 'visible' },
    );

    const onBack = (): void => goBackShowModal();

    const onClose = (): void => goBackHideModal();

    return (
        <Header style={styles.headerContainer}>
            <Left style={styles.headerBackButton}>
                <Button onPress={onBack} transparent>
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
                    onPress={onClose}
                />
            </Right>
        </Header>
    );
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
                    onPress={props.onSubmit}
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

const getFeedbackJSON = (mode: QueryParameters['feedbackContentMode'], input: string, serviceId: string): string => {
    const feedback: Feedback = { ...getEmptyFeedback(), bc211Id: { value: serviceId, shouldSend: true }};
    const feedbackField = mode === 'OTHER' ?
        { other: {...feedback.other, value: input } }
        :
        { removalReason: {...feedback.removalReason, value: input }};
    return JSON.stringify({ ...feedback, ...feedbackField });
};

export const FeedbackOtherRemoveServiceModal = (): JSX.Element => {
    const query = useQuery();

    const params = useParams<RouteParams>();

    const serviceId = params.serviceId;

    const [input, onInputChange]: readonly [string, (value: string) => void]
        = useFeedbackInputControl();

    const goBackReceiveUpdatesShow = useServiceDetailRoute(serviceId, {
        feedbackSubmitModalMode: 'visible',
        feedback: getFeedbackJSON(query.feedbackContentMode, input, serviceId),
    });

    const onSubmit = (): void => goBackReceiveUpdatesShow();

    // TODO: Formulate a more robust typed query param getter
    const content: SuggestionContent = SUGGESTION_CONTENT[query.feedbackContentMode];

    return (
        <Container>
            <HeaderComponent headerLabel={content.header} serviceId={serviceId} />
            <ContentComponent
                inputLabel={content.label}
                input={input}
                onInputChange={onInputChange}
                placeholder={content.placeholder}
            />
            <FooterComponent disabled={input.length === 0} onSubmit={onSubmit} />
        </Container>
    );
};
