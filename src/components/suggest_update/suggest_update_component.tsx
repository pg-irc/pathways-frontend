import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Icon } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';

interface Props {
    readonly isEnabled: boolean;
    readonly suggestionText: string;
    readonly onChangeSuggestionText: (text: string) => void;
    readonly fieldLabel: JSX.Element;
    readonly style?: ViewStyle;
}

export const SuggestUpdateComponent = (props: Props): JSX.Element => {
    const [isEditing, setIsEditing]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const onEditingTogglePress = (): void => setIsEditing(!isEditing);

    if (!props.isEnabled) {
        return <EmptyComponent />;
    }

    return (
        <View style={props.style}>
            <ToggleInputComponent
                onPress={onEditingTogglePress}
                isEditing={isEditing}
                label={props.fieldLabel}
            />
            <InputComponent
                onChangeText={props.onChangeSuggestionText}
                isEditing={isEditing}
                textValue={props.suggestionText}
             />
        </View>
    );

};

interface ToggleInputComponentProps {
    readonly onPress: () => void;
    readonly isEditing: boolean;
    readonly label: JSX.Element;
}

const ToggleInputComponent = (props: ToggleInputComponentProps): JSX.Element => {
    const iconName = props.isEditing ? 'check-square' : 'square-o';
    const color = props.isEditing ? colors.teal : colors.darkGreyWithAlpha;
    const textStyle = [textStyles.headline6, { color }];

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
            <Text style={textStyle}>
                {props.label}
            </Text>
            <TouchableOpacity onPress={props.onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={textStyle}>
                        <Trans>Suggest an update</Trans>
                    </Text>
                    <Icon
                        type={'FontAwesome'}
                        name={iconName}
                        style={{ padding: 5, color }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

interface InputComponentProps {
    readonly onChangeText: (text: string) => void;
    readonly isEditing: boolean;
    readonly textValue: string;
}

const InputComponent = (props: InputComponentProps): JSX.Element => {
    const [textColor, setTextcolor]: readonly [string, Dispatch<SetStateAction<string>>] = useState(colors.black);
    const onBlur = (): void => setTextcolor(colors.teal);
    const onFocus = (): void => setTextcolor(colors.black);

    if (!props.isEditing) {
        return <EmptyComponent />;
    }

    return (
        <I18n>
        {
            (({ i18n }: I18nProps): JSX.Element =>
                <TextInput
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={props.onChangeText}
                    value={props.textValue}
                    textAlignVertical={'top'}
                    placeholder={i18n._(t`Comment or suggest edits (optional)`)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    style={{
                        borderColor: colors.teal,
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 5,
                        color: textColor,
                        marginBottom: 10,
                    }}
                />
            )
        }
        </I18n>
    );
};
