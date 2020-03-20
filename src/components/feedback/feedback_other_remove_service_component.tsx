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
import React from 'react';
import Modal from 'react-native-modal';

import { colors, textStyles } from '../../application/styles';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';

import styles from './styles';

type HeaderComponentProps = {
    readonly headerLabel: TemplateStringsArray;
    readonly onClose: () => void;
};

type ContentComponentProps = {
    readonly inputLabel: TemplateStringsArray;
    readonly placeholder: TemplateStringsArray;
};

type FooterComponentProps = {
    readonly disabled: boolean;
    readonly onSubmit: () => void;
};

type ModalProps = {
    readonly isVisible: boolean;
};

const HeaderComponent = (props: HeaderComponentProps): JSX.Element => {
    return (
        <Header style={styles.headerContainer}>
            <Left style={styles.headerBackButton}>
                <Button onPress={props.onClose} transparent>
                    <Icon name='chevron-left' type='FontAwesome' style={styles.headerElement}/>
                </Button>
                <Title style={styles.headerLeftTitle}>
                    <Text style={textStyles.headline6}>
                        <Trans id={props.headerLabel} />
                    </Text>
                </Title>
            </Left>
            <Right>
                <CloseButtonComponent
                    color={colors.greyishBrown}
                    additionalStyle={{ paddingTop: 0 }}
                    onPress={props.onClose}
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
                                placeholder={i18n._(props.placeholder)}
                                placeholderTextColor={colors.darkerGrey}
                                style={styles.input}
                                textAlignVertical='top'
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
                >
                    <Text style={submitTextStyle}>
                        <Trans>Submit</Trans>
                    </Text>
                </MultiLineButtonComponent>
            </FooterTab>
        </Footer>
    );
};

type FeedbackSuggestionProps = HeaderComponentProps & ContentComponentProps & ModalProps;

export const FeedbackOtherRemoveServiceModal = (props: FeedbackSuggestionProps): JSX.Element => {
    return (
        <Modal isVisible={props.isVisible} style={{ margin: 0 }}>
            <Container>
                <HeaderComponent headerLabel={props.headerLabel} onClose={props.onClose} />
                <ContentComponent inputLabel={props.inputLabel} placeholder={props.placeholder} />
                <FooterComponent disabled={true} onSubmit={(): undefined => undefined} />
            </Container>
        </Modal>
    );
};
