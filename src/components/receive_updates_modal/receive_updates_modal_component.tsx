import React, { Dispatch, SetStateAction, useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, Icon, Button } from 'native-base';
import { textStyles, colors, applicationStyles } from '../../application/styles';
import { Trans, I18n } from '@lingui/react';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { TextInput, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ReactI18nRenderProp } from '../../locale/types';
import { getEditingColor, getEditingIcon } from '../feedback/feedback_component';
import { EmptyComponent } from '../empty_component/empty_component';
import * as R from 'ramda';
import { DividerComponent } from '../content_layout/divider_component';
import { FeedbackModalProps } from '../feedback/feedback_options_modal_component';

export interface ServiceProviderDetails {
    readonly name: string;
    readonly organization: string;
    readonly jobTitle: string;
}

export const ReceiveUpdatesModalComponent = (props: FeedbackModalProps): JSX.Element => {
    const [email, setEmail]: readonly [string, Dispatch<SetStateAction<string>>] = useState('');
    const [isServiceProvider, setIsServiceProvider]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const onServiceProviderTogglePress = (): void => setIsServiceProvider(!isServiceProvider);
    const [serviceProviderDetails, setServiceProviderDetails]: readonly [ServiceProviderDetails, Dispatch<SetStateAction<ServiceProviderDetails>>] =
        useState(getDefaultServiceProviderDetails());
    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={(): void => props.setIsVisible(false)}
        >
            <I18n>
                {
                    ((i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                    <View padder style={{backgroundColor: colors.white, borderRadius: 10}}>
                        <HeaderComponent setIsVisible={props.setIsVisible} />
                        <InstructionsComponent />
                        <InputComponent
                            inputFieldText={email}
                            onChangeFieldText={setEmail}
                            placeholder={'Enter Email'}
                            i18n={i18nRenderProp.i18n}
                        />
                        <ToggleServiceProviderInputComponent
                            isServiceProvider={isServiceProvider}
                            onPress={onServiceProviderTogglePress}
                        />
                        <ServiceProviderInputComponent
                            isServiceProvider={isServiceProvider}
                            serviceProviderDetails={serviceProviderDetails}
                            setServiceProviderDetails={setServiceProviderDetails}
                            i18n={i18nRenderProp.i18n}
                        />
                        <DividerComponent />
                        <View style={{ flexDirection: 'row-reverse'}}>
                            <SubmitButton email={email}/>
                        </View>
                    </View>
                    ))
                }
            </I18n>
       </Modal>
    );
};

const getDefaultServiceProviderDetails = (): ServiceProviderDetails => ({
    name: '',
    organization: '',
    jobTitle: '',
});

const HeaderComponent = (props: { readonly setIsVisible: (b: boolean) => void }): JSX.Element => (
    <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10}}>
        <Text style={textStyles.headlineH3StyleBlackLeft}>
            <Trans>Receiving Updates</Trans>
        </Text>
        <CloseButtonComponent color={colors.greyishBrown} additionalStyle={{ paddingTop: 0 }} onPress={(): void => props.setIsVisible(false)}/>
    </View>
);

const InstructionsComponent = (): JSX.Element => (
    <Text style={[textStyles.headlineH4StyleBlackLeft, { marginHorizontal: 10 }]}>
        <Trans>Enter your email if you would like to receive updates about this issue.</Trans>
    </Text>
);

export interface ToggleServiceProviderInputComponentProps {
    readonly isServiceProvider: boolean;
    readonly onPress: () => void;
}

const ToggleServiceProviderInputComponent = (props: ToggleServiceProviderInputComponentProps): JSX.Element => (
    <View style={{flexDirection: 'row', margin: 10, alignItems: 'center' }}>
        <Text style={[textStyles.headlineH4StyleBlackLeft, { fontSize: 14, flexBasis: '75%' }]}>
            <Trans>Do you work at this service or organization?</Trans>
        </Text>
        <ToggleTextInputComponent
            isServiceProvider={props.isServiceProvider}
            onPress={props.onPress}
        />
    </View>
);

interface ToggleButtonComponentProps {
    readonly isServiceProvider: boolean;
    readonly onPress: () => void;
}

const ToggleTextInputComponent = (props: ToggleButtonComponentProps): JSX.Element => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
                type={'FontAwesome'}
                name={getEditingIcon(props.isServiceProvider)}
                style={{ color: getEditingColor(props.isServiceProvider) }}
            />
            <Text style={[textStyles.headlineH4StyleBlackLeft, { paddingLeft: 5 }]}>
                <Trans>Yes</Trans>
            </Text>
        </View>
    </TouchableOpacity>
);

export interface ServiceProviderInputComponent {
    readonly isServiceProvider: boolean;
    readonly serviceProviderDetails: ServiceProviderDetails;
    readonly setServiceProviderDetails: Dispatch<SetStateAction<ServiceProviderDetails>>;
}

const ServiceProviderInputComponent = (props: ServiceProviderInputComponent & ReactI18nRenderProp): JSX.Element => {
    const setServiceProviderDetailsForField = R.curry((field: keyof ServiceProviderDetails, value: string): void => (
        props.setServiceProviderDetails({...props.serviceProviderDetails, [field]: value})
    ));

    if (!props.isServiceProvider) {
        return <EmptyComponent />;
    }
    return (
        <View>
            <InputLabel label={<Trans>Name</Trans>} />
            <InputComponent
                onChangeFieldText={setServiceProviderDetailsForField('name')}
                inputFieldText={props.serviceProviderDetails.name}
                placeholder={'Enter your name'}
                i18n={props.i18n}
            />
            <InputLabel label={<Trans>Organization</Trans>} />
            <InputComponent
                onChangeFieldText={setServiceProviderDetailsForField('organization')}
                inputFieldText={props.serviceProviderDetails.organization}
                placeholder={'Enter your organization name'}
                i18n={props.i18n}
            />
            <InputLabel label={<Trans>Job Title</Trans>} />
            <InputComponent
                onChangeFieldText={setServiceProviderDetailsForField('jobTitle')}
                inputFieldText={props.serviceProviderDetails.jobTitle}
                placeholder={'Enter your job title'}
                i18n={props.i18n}
            />
        </View>
    );
};

interface InputComponentProps {
    readonly onChangeFieldText: (text: string) => void;
    readonly inputFieldText: string;
    readonly placeholder: string;
}

const InputComponent = (props: InputComponentProps & ReactI18nRenderProp): JSX.Element => {
    const [textColor, setTextcolor]: readonly [string, Dispatch<SetStateAction<string>>] = useState(colors.teal);
    const onBlur = (): void => setTextcolor(colors.teal);
    const onFocus = (): void => setTextcolor(colors.black);
    const _ = props.i18n._.bind(props.i18n);
    return (
            <TextInput
                multiline={true}
                onChangeText={props.onChangeFieldText}
                value={props.inputFieldText}
                textAlignVertical={'top'}
                placeholder={_(props.placeholder)}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{
                    color: textColor,
                    margin: 10,
                    borderBottomColor: colors.grey,
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                }}
            />
    );
};

const InputLabel = (props: { readonly label: JSX.Element }): JSX.Element => (
    <Text style={[textStyles.headlineH3StyleBlackLeft, { fontSize: 14, marginHorizontal: 10 }]}>
        {props.label}
    </Text>
);

export const extractTextInputStrings = (): JSX.Element => (
    <View>
        <Text><Trans>Enter email</Trans></Text>
        <Text><Trans>Enter your name</Trans></Text>
        <Text><Trans>Enter your organization name</Trans></Text>
        <Text><Trans>Enter your job title</Trans></Text>
    </View>
);

const SubmitButton = (props: { readonly email: string }): JSX.Element => (
    <Button style={getButtonStyle(props.email)}>
        <Text style={getTextStyle(props.email)}>
            {
                props.email ? <Trans>Email me updates</Trans> : <Trans>Finish without email</Trans>
            }
        </Text>
    </Button>
);

const getButtonStyle = (email: string): StyleProp<ViewStyle> => {
    if (!email) {
        return applicationStyles.whiteTealButton;
    }
    return applicationStyles.tealButton;
};

const getTextStyle = (email: string): StyleProp<TextStyle> => {
    if (!email) {
        return textStyles.whiteTealButton;
    }
    return textStyles.tealButton;
};