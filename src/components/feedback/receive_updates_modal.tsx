// tslint:disable:no-expression-statement
import React, { Dispatch, SetStateAction, useState } from 'react';
import { t } from '@lingui/macro';
import { I18n, Trans } from '@lingui/react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { colors, textStyles } from '../../application/styles';
import { CheckBox } from './check_box_component';
import { receiveUpdatesStyles as styles } from './styles';
import { UserInformation } from '../../stores/feedback/types';
import { EmptyComponent } from '../empty_component/empty_component';

interface ReceiveUpdatesProps {
    readonly isSendingFeedback: boolean;
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
    readonly userInformation: UserInformation;
    readonly onFinishPress: () => void;
    readonly onModalHide: (i18n: I18n) => () => void;
}

const INPUT_PLACEHOLDER = t`Enter email`;
const NAME_PLACEHOLDER = t`Enter your name`;
const ORGANIZATION_PLACEHOLDER = t`Enter your organization name`;
const JOB_TITLE_PLACEHOLDER = t`Enter your job title`;

export const ReceiveUpdatesModal =
({ onFinishPress, isSendingFeedback, userInformation, setUserInformation, onModalHide }: ReceiveUpdatesProps): JSX.Element => {

    const onPressIsEmployee = (): void =>
        setUserInformation({
            ...userInformation,
            isEmployee: !userInformation.isEmployee,
        });

    const buttonLabel = userInformation.email.length ? t`Email me updates` : t`Finish without email`;

    const minHeight = userInformation.isEmployee ? 550 : 315;
    return (
        <I18n>
            {({ i18n }: I18nProps): JSX.Element => (
                <Modal isVisible={true} backdropTransitionOutTiming={0} onModalHide={onModalHide(i18n)}>
                    <View style={[styles.receiveUpdatesContainer, { minHeight }]}>
                        <View style={styles.receiveUpdatesInnerContainer}>
                            <View>
                                <Text style={textStyles.headlineH2StyleBlackLeft}>
                                    <Trans>Receiving Updates</Trans>
                                </Text>
                                <Text style={textStyles.paragraphStyleBrown}>
                                    <Trans>Enter your email if you would like to receive updates about this issue</Trans>
                                </Text>
                                <TextInputComponent
                                    userInformation={userInformation}
                                    fieldName={'email'}
                                    value={userInformation.email}
                                    placeholder={INPUT_PLACEHOLDER}
                                    i18n={i18n}
                                    setUserInformation={setUserInformation}
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
                                setUserInformation={setUserInformation}
                            />
                        </View>
                        <View style={styles.finishButtonContainer}>
                            <TouchableOpacity
                                onPress={onFinishPress}
                                style={userInformation.email.length ? styles.finishButtonWithEmail : styles.finishButtonWithoutEmail}
                                disabled={isSendingFeedback}
                            >
                                <Text style={userInformation.email.length ? styles.finishTextWithEmail : styles.finishTextWithoutEmail}>
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

const EmployeeInputFields = (props: {
    readonly isVisible: boolean,
    readonly userInformation: UserInformation,
    readonly i18n: I18n,
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
}): JSX.Element => {

    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
        <View>
            <Text style={[textStyles.headline6, { color: colors.black }]}>
                <Trans>Name</Trans>
            </Text>
            <TextInputComponent
                userInformation={props.userInformation}
                fieldName={'name'}
                placeholder={NAME_PLACEHOLDER}
                i18n={props.i18n}
                value={props.userInformation.name}
                setUserInformation={props.setUserInformation}
            />
            <Text style={[textStyles.headline6, { color: colors.black, marginTop: 14 }]}>
                <Trans>Organization</Trans>
            </Text>
            <TextInputComponent
                userInformation={props.userInformation}
                fieldName={'organizationName'}
                placeholder={ORGANIZATION_PLACEHOLDER}
                i18n={props.i18n}
                value={props.userInformation.organizationName}
                setUserInformation={props.setUserInformation}
            />
             <Text style={[textStyles.headline6, { color: colors.black, marginTop: 14 }]}>
                <Trans>Job Title</Trans>
            </Text>
            <TextInputComponent
                userInformation={props.userInformation}
                fieldName={'jobTitle'}
                placeholder={JOB_TITLE_PLACEHOLDER}
                i18n={props.i18n}
                value={props.userInformation.jobTitle}
                setUserInformation={props.setUserInformation}
            />
        </View>
    );
};

export interface TextInputProps {
    readonly userInformation: UserInformation;
    readonly fieldName: keyof UserInformation;
    readonly placeholder: TemplateStringsArray;
    readonly value: string;
    readonly i18n: I18n;
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
}

const TextInputComponent = (props: TextInputProps): JSX.Element => {
    const [textColor, setTextcolor]: readonly [string, Dispatch<SetStateAction<string>>] = useState(colors.teal);

    const onBlur = (): void => setTextcolor(colors.teal);

    const onFocus = (): void => setTextcolor(colors.black);

    const onChangeText = (value: string): void => props.setUserInformation({ ...props.userInformation, [props.fieldName]: value });

    return (
        <TextInput
            onChangeText={onChangeText}
            value={props.value}
            placeholder={props.i18n._(props.placeholder)}
            onFocus={onFocus}
            onBlur={onBlur}
            style={[styles.employeeInputStyle, { color: textColor }]}
        />
    );
};
