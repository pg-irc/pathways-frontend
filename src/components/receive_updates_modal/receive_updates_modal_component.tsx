import React, { Dispatch, SetStateAction, useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text } from 'native-base';
import { textStyles, colors } from '../../application/styles';
import { Trans, I18n } from '@lingui/react';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { TextInput } from 'react-native';
import { ReactI18nRenderProp } from '../../locale/types';

export interface ReceiveUpdatesModalProps {
    readonly isVisible: boolean;
}

export interface ReceiveUpdatesModalActions {
    readonly setIsVisible: (isVisible: boolean) => void;
}

type Props = ReceiveUpdatesModalProps & ReceiveUpdatesModalActions;

export const ReceiveUpdatesModalComponent = (props: Props): JSX.Element => {
    const [email, setEmail]: readonly [string, Dispatch<SetStateAction<string>>] = useState('');
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
                        <InputComponent inputFieldText={email} onChangeFieldText={setEmail} placeholder={'Enter Email'} i18n={i18nRenderProp.i18n} />
                    </View>
                    ))
                }
            </I18n>
       </Modal>
    );
};

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
                    marginTop: 10,
                    borderBottomColor: colors.grey,
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                }}
            />
    );
};

export const extractTextInputStrings = (): JSX.Element => (
    <View>
        <Text><Trans>Enter email</Trans></Text>
    </View>
);