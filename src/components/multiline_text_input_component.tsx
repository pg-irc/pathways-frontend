import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextInput, StyleProp, TextStyle, View } from 'react-native';
import { colors } from '../application/styles';

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