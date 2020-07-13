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
import { Header, Title, Button, Icon, Left, Content, Container } from 'native-base';
import { getIconForBackButton } from '../header_button/back_button_component';
import { goToRouteWithParameter, Routes, RouterProps } from '../../application/routing';
import { useHistory } from 'react-router-native';

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
    const history = useHistory();

    const serviceId = match.params.serviceId;

    const onPressIsEmployee = (): void =>
        setUserInformation({
            ...userInformation,
            isEmployee: !userInformation.isEmployee,
        });

    const onBackButtonPress = (): void => {
        if (isOtherRemoveServiceFeedback(feedbackType)) {
            goToRouteWithParameter(Routes.OtherFeedback, serviceId, history)();
        } else {
            goToRouteWithParameter(Routes.ServiceDetail, serviceId, history)();
        }
        backFromContactInformation();
    };

    const onFinishPress = (): void => {
        finishFeedback(userInformation);
        sendFeedback(serviceId);
    };

    const buttonLabel = userInformation.email.length ? t`Email me updates` : t`Finish without email`;

    return (
        <I18n>
            {({ i18n }: I18nProps): JSX.Element => (
                    <Container style={styles.contactInformationContainer}>
                        <HeaderComponent feedbackType={feedbackType} onBackButtonPress={onBackButtonPress}/>
                        <Content style={styles.contactInformationInnerContainer}>
                            <View>
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
                        </Content>
                            <TouchableOpacity
                                onPress={onFinishPress}
                                style={userInformation.email.length ? styles.finishButtonWithEmail : styles.finishButtonWithoutEmail}
                                disabled={isSendingFeedback}
                            >
                                <Text style={userInformation.email.length ? styles.finishTextWithEmail : styles.finishTextWithoutEmail}>
                                    <Trans id={buttonLabel} />
                                </Text>
                            </TouchableOpacity>
                    </Container>
            )}
        </I18n>
    );
};

const isOtherRemoveServiceFeedback = (feedbackType: string): boolean => feedbackType !== 'service_feedback';

interface HeaderProps {
    readonly feedbackType: string;
    readonly onBackButtonPress: () => void;
}

const HeaderComponent = ({ feedbackType, onBackButtonPress }: HeaderProps): JSX.Element => {
    return (
        <Header style={otherRemoveServiceStyles.headerContainer}>
            <Left style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>

                <Button transparent onPress={onBackButtonPress}>
                    <Icon name={getIconForBackButton()} style={{ color: colors.teal, fontWeight: 'bold' }} />
                </Button>
                <Title>
                    <Text style={textStyles.headline6}>
                        <Trans id={headerLabelByType(feedbackType)} />
                    </Text>
                </Title>
            </Left>
    </Header>
    );
}

const headerLabelByType = (feedbackType: string): string => {
    if (feedbackType === 'service_feedback') {
        return 'Change name or other details';
    }

    if (feedbackType === 'remove_service') {
        return 'This service no longer exists';
    }

    return 'Other suggestions';
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
        <View style={{ marginTop: 24 }}>
            <Text style={[textStyles.headline6, { color: colors.black,  marginBottom: 5 }]}>
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
            <Text style={[textStyles.headline6, { color: colors.black, marginTop: 20, marginBottom: 5 }]}>
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
             <Text style={[textStyles.headline6, { color: colors.black, marginTop: 20,  marginBottom: 5 }]}>
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