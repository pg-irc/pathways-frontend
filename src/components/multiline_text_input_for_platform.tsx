import React, { Dispatch, SetStateAction, useState } from 'react';
import * as constants from '../application/constants';
import { Trans } from '@lingui/react';
import { TextInput, StyleProp, TextStyle, View, InputAccessoryView, TouchableOpacity, Text, Keyboard } from 'react-native';
import { colors, getBoldFontStylesForOS } from '../application/styles';
import { isAndroid } from '../application/helpers/is_android';
import { useKeyboardIsVisible } from './use_keyboard_is_visible';
import { EmptyComponent } from './empty_component/empty_component';

export interface MultilineTextInputForPlatformProps {
    readonly i18n: I18n;
    readonly value: string;
    readonly numberOfLines: number;
    readonly placeholder: TemplateStringsArray;
    readonly style: StyleProp<TextStyle>;
    readonly onChangeText: (value: string) => void;
}

export const MultilineTextInputForPlatform = (props: MultilineTextInputForPlatformProps): JSX.Element => {
    const [textColor, setTextcolor]: readonly [string, Dispatch<SetStateAction<string>>] = useState(colors.teal);
    const onBlur = (): void => setTextcolor(colors.teal);
    const onFocus = (): void => setTextcolor(colors.black);

    return isAndroid() ?
        <AndroidMultilineTextInput
            i18n={props.i18n}
            value={props.value}
            numberOfLines={props.numberOfLines}
            placeholder={props.placeholder}
            style={[props.style, { color: textColor}]}
            onChangeText={props.onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
        /> :
        <IOSMultilineTextInput
            i18n={props.i18n}
            value={props.value}
            numberOfLines={props.numberOfLines}
            placeholder={props.placeholder}
            style={[props.style, { color: textColor}]}
            onChangeText={props.onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
        />;
};

interface TextInputProps {
    readonly onBlur: () => void;
    readonly onFocus: () => void;
}

const AndroidMultilineTextInput = (props: MultilineTextInputForPlatformProps & TextInputProps): JSX.Element => (
    <View style={{ flex: 2 }}>
        <TextInput
            multiline
            numberOfLines={props.numberOfLines}
            onChangeText={props.onChangeText}
            placeholder={props.i18n._(props.placeholder)}
            placeholderTextColor={colors.darkerGrey}
            style={props.style}
            textAlignVertical='top'
            value={props.value}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
        />
    </View>
);

const IOSMultilineTextInput = (props: MultilineTextInputForPlatformProps & TextInputProps): JSX.Element => {
    const keyboardIsVisible = useKeyboardIsVisible();
    return (
        <View>
            <TextInput
                multiline
                numberOfLines={props.numberOfLines}
                onChangeText={props.onChangeText}
                placeholder={props.i18n._(props.placeholder)}
                placeholderTextColor={colors.darkerGrey}
                style={props.style}
                textAlignVertical='top'
                value={props.value}
                inputAccessoryViewID={constants.FEEDBACK_INPUT_ID}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
            />
            <InputAccessoryView nativeID={constants.FEEDBACK_INPUT_ID}>
                <MultilineKeyboardDoneButton isVisible={keyboardIsVisible}/>
            </InputAccessoryView>
        </View>
    );
}

export interface MultilineKeyboardDoneButtonProps {
    readonly isVisible: boolean;
}

export const MultilineKeyboardDoneButton = ({isVisible}: MultilineKeyboardDoneButtonProps): JSX.Element => {
    if (!isVisible) {
        return <EmptyComponent />;
    }

    return (
        <View
            style={{
                flexDirection: 'row-reverse',
                alignContent: 'center',
                borderColor: colors.greyBorder,
                borderTopWidth: 1,
                backgroundColor: colors.white,
            }}
        >
            <TouchableOpacity
                style={{ marginRight: 12, marginVertical: 10 }}
                onPress={Keyboard.dismiss}
            >
                <Text style={{ color: colors.teal, fontSize: 18, ...getBoldFontStylesForOS() }}>
                    <Trans>Done</Trans>
                </Text>
            </TouchableOpacity>
        </View>
    );
};