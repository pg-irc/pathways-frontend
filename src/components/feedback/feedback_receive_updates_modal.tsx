import { t } from '@lingui/macro';
import { I18n, Trans } from '@lingui/react';
import { Input } from 'native-base';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity } from 'react-native';

import { colors, textStyles } from '../../application/styles';
import { CheckBox } from './check_box_component';

import { receiveUpdatesStyles as styles } from './styles';

interface FeedbackReceiveUpdatesProps {
    readonly isVisible: boolean;
}

const INPUT_PLACEHOLDER = t`Enter email`;

const useToggleState = (initialValue: boolean = false): readonly[boolean, () => void] => {
    const [state, setState]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(initialValue);

    const toggle = useCallback<() => void>(
        (): void => setState(!state),
        [state, setState],
    );

    return [state, toggle];
};

const useEmailInputControl = (): readonly [string, (value: string) => void] => {
    const [emailInput, setEmailInput]: readonly [string, Dispatch<SetStateAction<string>>]
        = useState<string>('');

    const onInputChange = useCallback<(value: string) => void>(
        (value: string): void => setEmailInput(value),
        [setEmailInput],
    );

    return [emailInput, onInputChange];
};

export const FeedbackReceiveUpdatesModal = (props: FeedbackReceiveUpdatesProps): JSX.Element => {
    const [checked, toggleChecked]: readonly[boolean, () => void]
        = useToggleState();

    const [emailInput, onInputChange]: readonly [string, (value: string) => void]
        = useEmailInputControl();

    const buttonLabel = emailInput.length ? t`Finish` : t`Finish without email`;

    return (
        <Modal isVisible={props.isVisible}>
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
                                    onChangeText={onInputChange}
                                    placeholder={i18n._(INPUT_PLACEHOLDER)}
                                    placeholderTextColor={colors.darkerGrey}
                                    value={emailInput}
                                />
                                <View style={styles.checkboxContainer}>
                                    <Text style={[textStyles.captionStyleLeft, styles.checkBoxDescription]}>
                                        <Trans>Do you work at this service or organization?</Trans>
                                    </Text>
                                    <View style={styles.checkBox}>
                                        <CheckBox checked={checked} iconStyle={styles.checkBoxIcon} onPress={toggleChecked} />
                                        <Text style={textStyles.paragraphStyleBrown}><Trans>Yes</Trans></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.finishButtonContainer}>
                                <TouchableOpacity onPress={() => {}} style={styles.finishButton}>
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
}
