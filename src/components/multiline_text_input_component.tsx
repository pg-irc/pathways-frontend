import React, { Dispatch, SetStateAction, useState } from 'react';
import * as constants from '../application/constants';
import { TextInput, StyleProp, TextStyle, View, InputAccessoryView, TouchableOpacity, Text, Keyboard } from 'react-native';
import { colors, getBoldFontStylesForOS } from '../application/styles';
import { isAndroid } from '../application/helpers/is_android';
import { useKeyboardIsVisible } from './use_keyboard_is_visible';
import { EmptyComponent } from './empty_component/empty_component';

export interface MultilineTextInputProps {
    readonly i18n: I18n;
    readonly value: string;
    readonly numberOfLines: number;
    readonly placeholder: TemplateStringsArray;
    readonly style: StyleProp<TextStyle>;
    readonly onChangeText: (value: string) => void;
}

export const MultilineTextInputComponent = (props: MultilineTextInputProps): JSX.Element => {
    const [textColor, setTextcolor]: readonly [string, Dispatch<SetStateAction<string>>] = useState(colors.teal);
    const onBlur = (): void => setTextcolor(colors.teal);
    const onFocus = (): void => setTextcolor(colors.black);

    if (isAndroid()) {
        return (
            <AndroidTextInput
                i18n={props.i18n}
                value={props.value}
                numberOfLines={props.numberOfLines}
                placeholder={props.placeholder}
                style={[props.style, { color: textColor}]}
                onChangeText={props.onChangeText}
                onBlur={onBlur}
                onFocus={onFocus}
            />
        );
    }

    return (
        <IOSTextInput
            i18n={props.i18n}
            value={props.value}
            numberOfLines={props.numberOfLines}
            placeholder={props.placeholder}
            style={[props.style, { color: textColor}]}
            onChangeText={props.onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    );
};

interface TextInputProps {
    readonly onBlur: () => void;
    readonly onFocus: () => void;
}

const AndroidTextInput = (props: MultilineTextInputProps & TextInputProps): JSX.Element => (
    <View style={{ flex: 2 }}>
        <TextInput
            multiline
            numberOfLines={5}
            onChangeText={props.onChangeText}
            placeholder={props.i18n._(props.placeholder)}
            placeholderTextColor={colors.darkerGrey}
            style={props.style}
            textAlignVertical='top'
            value={props.value}
        />
    </View>
);

const IOSTextInput = (props: MultilineTextInputProps & TextInputProps): JSX.Element => {
    const keyboardIsVisible = useKeyboardIsVisible();
    return (
        <View>
            <TextInput
                multiline
                numberOfLines={5}
                onChangeText={props.onChangeText}
                placeholder={props.i18n._(props.placeholder)}
                placeholderTextColor={colors.darkerGrey}
                style={props.style}
                textAlignVertical='top'
                value={props.value}
                inputAccessoryViewID={constants.FEEDBACK_INPUT_ID}
            />
            <InputAccessoryView nativeID={constants.FEEDBACK_INPUT_ID}>
                <MultilineKeyboardDoneButton isVisible={keyboardIsVisible}/>
            </InputAccessoryView>
        </View>
    );
}

interface MultilineKeyboardDoneButton {
    readonly isVisible: boolean;
}

const MultilineKeyboardDoneButton = ({isVisible}: MultilineKeyboardDoneButton): JSX.Element => {
    const onPress = (): void => {
        // tslint:disable-next-line: no-expression-statement
        Keyboard.dismiss();
    };

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
                onPress={onPress}
            >
                <Text style={{ color: colors.teal, fontSize: 18, ...getBoldFontStylesForOS() }}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};