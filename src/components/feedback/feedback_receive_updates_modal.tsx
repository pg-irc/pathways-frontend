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
import { UserInformation } from '../../stores/feedback/types';
import { showToast } from '../../application/toast';

interface FeedbackReceiveUpdatesProps {
    readonly isVisible: boolean;
    readonly onFinishPress: () => void;
    readonly isSendingFeedback: boolean;
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
    readonly userInformation: UserInformation;
}

const INPUT_PLACEHOLDER = t`Enter email`;

export const FeedbackReceiveUpdatesModal =
({ isVisible, onFinishPress, isSendingFeedback, userInformation, setUserInformation }: FeedbackReceiveUpdatesProps): JSX.Element => {

    const onChangeEmail = (value: string): void =>
        setUserInformation({
            ...userInformation,
            email: value,
        });

    const onPressIsEmployee = (): void =>
        setUserInformation({
            ...userInformation,
            isEmployee: !userInformation.isEmployee,
        });

    const onModalHide = (i18n: I18n) =>
        () => showToast(i18n._(t`Thank you for your contribution!`));

    const buttonLabel = userInformation.email.length ? t`Finish` : t`Finish without email`;

    return (
        <I18n>
            {({ i18n }: I18nProps): JSX.Element => (
                <Modal isVisible={isVisible} onBackdropPress={onFinishPress} backdropTransitionOutTiming={0} onModalHide={onModalHide(i18n)}>
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
                                value={userInformation.email}
                            />
                            <View style={styles.checkboxContainer}>
                                <Text style={[textStyles.captionStyleLeft, styles.checkBoxDescription]}>
                                    <Trans>Do you work at this service or organization?</Trans>
                                </Text>
                                <View style={styles.checkBox}>
                                    <CheckBox
                                        checked={userInformation.isEmployee}
                                        iconStyle={styles.checkBoxIcon}
                                        onPress={onPressIsEmployee}
                                    />
                                    <Text style={textStyles.paragraphStyleBrown}><Trans>Yes</Trans></Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.finishButtonContainer}>
                            <TouchableOpacity
                                onPress={onFinishPress}
                                style={isSendingFeedback ? [styles.finishButton, styles.finishButtonSending] : styles.finishButton}
                                disabled={isSendingFeedback}
                            >
                                <Text style={styles.finishText}>
                                    <Trans id={buttonLabel} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </I18n>
    );
};
