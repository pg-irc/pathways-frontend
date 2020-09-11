// tslint:disable:no-expression-statement
import React, { Dispatch, SetStateAction, useState } from 'react';
import { t } from '@lingui/macro';
import { I18n, Trans } from '@lingui/react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { colors, textStyles } from '../../application/styles';
import { CheckBox } from './check_box_component';
import { contactInformationStyles as styles } from './styles';
import { UserInformation } from '../../stores/feedback/types';
import { EmptyComponent } from '../empty_component/empty_component';
import { getEmptyUserInfo, BackFromContactInformationAction, FinishAction, SendFeedbackAction } from '../../stores/feedback';
import { otherRemoveServiceStyles } from './styles';
import { Header, Title, Button, Icon } from 'native-base';
import { getIconForBackButton } from '../header_button/back_button_component';
import { RouterProps, goBack, goBackToServiceDetailOnFeedbackSubmit } from '../../application/routing';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isAndroid } from '../../application/helpers/is_android';
import { useKeyboardIsVisible } from '../use_keyboard_is_visible';
import { memoryHistory } from '../../application';

export interface ContactInformationProps {
    readonly feedbackType: string;
    readonly isSendingFeedback: boolean;
}

export interface ContactInformationActions {
    readonly backFromContactInformation: () => BackFromContactInformationAction;
    readonly finishFeedback: (userInformation: UserInformation) => FinishAction;
    readonly sendFeedback: (serviceId: string) => SendFeedbackAction;
}

type Props = ContactInformationProps & ContactInformationActions & RouterProps;

const INPUT_PLACEHOLDER = t`Enter email`;
const NAME_PLACEHOLDER = t`Enter your name`;
const ORGANIZATION_PLACEHOLDER = t`Enter your organization name`;
const JOB_TITLE_PLACEHOLDER = t`Enter your job title`;

type SetUserInformation = Dispatch<SetStateAction<UserInformation>>;

export const ContactInformationComponent = ({
    feedbackType, isSendingFeedback, match, backFromContactInformation, finishFeedback, sendFeedback,
}: Props): JSX.Element => {
    const [userInformation, setUserInformation]: readonly [UserInformation, SetUserInformation] = useState(getEmptyUserInfo());
    const keyboardIsVisible = useKeyboardIsVisible();

    const serviceId = match.params.serviceId;

    const onPressIsEmployee = (): void =>
        setUserInformation({
            ...userInformation,
            isEmployee: !userInformation.isEmployee,
        });

    const onBackButtonPress = (): void => {
        goBack(memoryHistory);
        backFromContactInformation();
    };

    const onFinishPress = (): void => {
        finishFeedback(userInformation);
        sendFeedback(serviceId);
        goBackToServiceDetailOnFeedbackSubmit(memoryHistory);
    };

    return (
        <I18n>
            {({ i18n }: I18nProps): JSX.Element => (
                    <View style={styles.contactInformationContainer}>
                        <HeaderComponent feedbackType={feedbackType} onBackButtonPress={onBackButtonPress}/>
                        <KeyboardAwareScrollView
                            style={styles.contactInformationInnerContainer}
                            enableResetScrollToCoords={false}
                            extraHeight={50}
                            extraScrollHeight={isAndroid() ? 50 : 0}
                            enableOnAndroid={true}
                        >
                            <View style={{ paddingHorizontal: 15 }}>
                                <Text style={[textStyles.headlineH2StyleBlackLeft, { marginBottom: 15 }]}>
                                    <Trans>Contact information</Trans>
                                </Text>
                                <Text style={[textStyles.paragraphStyleBrown, { marginBottom: 10 }]}>
                                    <Trans>Enter your email if you would like to be contacted about this issue</Trans>
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
                        </KeyboardAwareScrollView>
                           <FinishButton
                                isVisible={!keyboardIsVisible}
                                userInformation={userInformation}
                                isSendingFeedback={isSendingFeedback}
                                onFinishPress={onFinishPress}
                           />
                    </View>
            )}
        </I18n>
    );
};

interface HeaderProps {
    readonly feedbackType: string;
    readonly onBackButtonPress: () => void;
}

const HeaderComponent = ({ feedbackType, onBackButtonPress }: HeaderProps): JSX.Element => {
    return (
        <Header style={otherRemoveServiceStyles.headerContainer} androidStatusBarColor={colors.teal}>
                <Button transparent onPress={onBackButtonPress}>
                    <Icon name={getIconForBackButton()} style={{ color: colors.teal, fontWeight: 'bold' }} />
                </Button>
                <Title>
                    <Text style={textStyles.headline6}>
                        <Trans id={headerLabelByType(feedbackType)} />
                    </Text>
                </Title>
    </Header>
    );
}

const headerLabelByType = (feedbackType: string): string => {
    switch (feedbackType) {
        case 'service_feedback':
            return 'Change name or other details';
        case 'remove_service':
            return 'This service no longer exists';
        default:
            return 'Other suggestions';
    }
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
        <View style={{ marginTop: 24, paddingHorizontal: 15 }}>
            <Text style={[textStyles.headlineH3StyleBlackLeft, { marginBottom: 5, lineHeight: 21 }]}>
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
            <Text style={[textStyles.headlineH3StyleBlackLeft, { marginTop: 20, marginBottom: 5, lineHeight: 21 }]}>
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
             <Text style={[textStyles.headlineH3StyleBlackLeft, { marginTop: 20,  marginBottom: 5, lineHeight: 21 }]}>
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

interface FinishProps {
    readonly isVisible: boolean;
    readonly userInformation: UserInformation;
    readonly isSendingFeedback: boolean;
    readonly onFinishPress: () => void;
}

const FinishButton = ({ isVisible, userInformation, isSendingFeedback, onFinishPress }: FinishProps): JSX.Element => {
    const buttonLabel = userInformation.email.length ? t`Email me updates` : t`Finish without email`;
    if (!isVisible) {
        return <EmptyComponent/>;
    }

    return (
        <TouchableOpacity
            onPress={onFinishPress}
            style={userInformation.email.length ? styles.finishButtonWithEmail : styles.finishButtonWithoutEmail}
            disabled={isSendingFeedback}
        >
            <Text style={userInformation.email.length ? styles.finishTextWithEmail : styles.finishTextWithoutEmail}>
                <Trans id={buttonLabel} />
            </Text>
        </TouchableOpacity>
    );
};