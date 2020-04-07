// tslint:disable:no-expression-statement
import { t } from '@lingui/macro';
import { I18n, Trans } from '@lingui/react';
import { Input } from 'native-base';
import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity } from 'react-native';

import { colors, textStyles } from '../../application/styles';
import { CheckBox } from './check_box_component';

import { receiveUpdatesStyles as styles } from './styles';
import { UseSendFeedback, ServiceFeedback } from './hooks/use_send_feedback';

interface FeedbackReceiveUpdatesProps {
    readonly isVisible: boolean;
    readonly onHide: () => void;
    readonly isSendingFeedback: UseSendFeedback['isSendingFeedback'];
    readonly setFeedback: Dispatch<SetStateAction<ServiceFeedback>>;
    readonly feedback: ServiceFeedback;
}

const INPUT_PLACEHOLDER = t`Enter email`;

export const FeedbackReceiveUpdatesModal =
({ isVisible, onHide, isSendingFeedback, setFeedback, feedback }: FeedbackReceiveUpdatesProps): JSX.Element => {

    const onChangeEmail = (value: string): void =>
        setFeedback({
            ...feedback,
            authorEmail: {
                ...feedback.authorEmail,
                value,
            },
        });

    const onPressIsEmployee = (): void =>
        setFeedback({
            ...feedback,
            authorIsEmployee: {
                ...feedback.authorIsEmployee,
                value: feedback.authorIsEmployee.value === 'true' ? 'false' : 'true',
            },
        });

    const buttonLabel = feedback.authorEmail.value.length ? t`Finish` : t`Finish without email`;

    const onFinish = (): void => onHide();

    return (
        <Modal isVisible={isVisible} onBackdropPress={onHide}>
            <I18n>
                {
                    ({ i18n }: I18nProps): JSX.Element => (
                        <View style={styles.receiveUpdatesContainer}>
                            <View style={styles.receiveUpdatesInnerContainer}>
                                <Text style={textStyles.headlineH2StyleBlackLeft}>
                                    <Trans>Receiving Updates</Trans>
                                </Text>
                                <Text style={[textStyles.paragraphStyleBrown, styles.description]}>
                                    <Trans>Enter your email if you would like to receive updates about this issue</Trans>
                                </Text>
                                <Input
                                    style={styles.emailInputStyle}
                                    onChangeText={onChangeEmail}
                                    placeholder={i18n._(INPUT_PLACEHOLDER)}
                                    placeholderTextColor={colors.darkerGrey}
                                    value={feedback.authorEmail.value}
                                />
                                <View style={styles.checkboxContainer}>
                                    <Text style={[textStyles.captionStyleLeft, styles.checkBoxDescription]}>
                                        <Trans>Do you work at this service or organization?</Trans>
                                    </Text>
                                    <View style={styles.checkBox}>
                                        <CheckBox
                                            checked={feedback.authorIsEmployee.value === 'true'}
                                            iconStyle={styles.checkBoxIcon}
                                            onPress={onPressIsEmployee}
                                        />
                                        <Text style={textStyles.paragraphStyleBrown}><Trans>Yes</Trans></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.finishButtonContainer}>
                                <TouchableOpacity
                                    onPress={onFinish}
                                    style={isSendingFeedback ? [styles.finishButton, styles.finishButtonSending] : styles.finishButton}
                                    disabled={isSendingFeedback}
                                >
                                    <Text style={styles.finishText}>
                                        <Trans id={buttonLabel} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </I18n>
        </Modal>
    );
};
