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
import { EmptyComponent } from '../empty_component/empty_component';

interface FeedbackReceiveUpdatesProps {
    readonly isSendingFeedback: boolean;
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
    readonly userInformation: UserInformation;
    readonly onFinishPress: () => void;
    readonly isVisible: boolean;
    readonly onModalHide: (i18n: I18n) => () => void;
}

const INPUT_PLACEHOLDER = t`Enter email`;
const NAME_PLACEHOLDER = t`Enter your name`;
const ORGANIZATION_PLACEHOLDER = t`Enter your organization name`;
const JOB_TITLE_PLACEHOLDER = t`Enter your job title`;

export const FeedbackReceiveUpdatesModal =
({ onFinishPress, isSendingFeedback, userInformation, setUserInformation, isVisible, onModalHide }: FeedbackReceiveUpdatesProps): JSX.Element => {

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

    const buttonLabel = userInformation.email.length ? t`Finish` : t`Finish without email`;

    // this is required to see extra employee inputs
    const minHeight = !userInformation.isEmployee ? 315 : 415;
    return (
        <I18n>
            {({ i18n }: I18nProps): JSX.Element => (
                <Modal isVisible={isVisible} backdropTransitionOutTiming={0} onModalHide={onModalHide(i18n)}>
                    <View style={[styles.receiveUpdatesContainer, { minHeight }]}>
                        <View style={styles.receiveUpdatesInnerContainer}>
                            <View>
                                <Text style={textStyles.headlineH2StyleBlackLeft}>
                                    <Trans>Receiving Updates</Trans>
                                </Text>
                                <Text style={textStyles.paragraphStyleBrown}>
                                    <Trans>Enter your email if you would like to receive updates about this issue</Trans>
                                </Text>
                                <Input
                                    style={styles.emailInputStyle}
                                    onChangeText={onChangeEmail}
                                    placeholder={i18n._(INPUT_PLACEHOLDER)}
                                    placeholderTextColor={colors.darkerGrey}
                                    value={userInformation.email}
                                />
                            </View>
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
                            <EmployeeInputFields 
                                isVisible={userInformation.isEmployee}
                                userInformation={userInformation}
                                i18n={i18n}
                            />
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

const EmployeeInputFields = (props: { readonly isVisible: boolean, readonly userInformation: UserInformation, readonly i18n: I18n }): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
        <View>
            <Text style={[textStyles.headline6, { color: colors.black }]}>
                <Trans>Name</Trans>
            </Text>
            <Input
                style={styles.employeeInputStyle}
                placeholder={props.i18n._(NAME_PLACEHOLDER)}
                placeholderTextColor={colors.darkerGrey}
                value={props.userInformation.name}
            />
            <Text style={[textStyles.headline6, { color: colors.black, marginTop: 14 }]}>
                <Trans>Organization</Trans>
            </Text>
            <Input
                style={styles.employeeInputStyle}
                placeholder={props.i18n._(ORGANIZATION_PLACEHOLDER)}
                placeholderTextColor={colors.darkerGrey}
                value={props.userInformation.organizationName}
            />
             <Text style={[textStyles.headline6, { color: colors.black, marginTop: 14 }]}>
                <Trans>Job Title</Trans>
            </Text>
            <Input
                style={styles.employeeInputStyle}
                placeholder={props.i18n._(JOB_TITLE_PLACEHOLDER)}
                placeholderTextColor={colors.darkerGrey}
                value={props.userInformation.jobTitle}
            />
        </View>
    );
};