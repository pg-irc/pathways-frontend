import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Icon } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';

interface Props {
    readonly isEnabled: boolean;
    readonly onChangeText: (text: string) => void;
    readonly textValue: string;
    readonly children: JSX.Element;
}

export const SuggestUpdateComponent = (props: Props): JSX.Element => {
    const [isEditing, setIsEditing]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const onEditingTogglePress = (): void => setIsEditing(!isEditing);

    if (!props.isEnabled) {
        return props.children;
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', flex: 4, alignItems: 'center' }}>
                <View style={{ flex: 3 }}>
                    {props.children}
                </View>
                <View style={{ flex: 1 }}>
                    <ToggleInputComponent
                        onPress={onEditingTogglePress}
                        isEditing={isEditing}
                    />
                </View>
            </View>
            <InputComponent
                onChangeText={props.onChangeText}
                isEditing={isEditing}
                textValue={props.textValue}
             />
        </View>
    );

};

interface EditingToggleComponentProps {
    readonly onPress: () => void;
    readonly isEditing: boolean;
}

const ToggleInputComponent = (props: EditingToggleComponentProps): JSX.Element => {
    const iconName = props.isEditing ? 'check-square' : 'square-o';
    const color = props.isEditing ? colors.teal : colors.darkGreyWithAlpha;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <TouchableOpacity onPress={props.onPress}>
                <Icon
                    type={'FontAwesome'}
                    name={iconName}
                    style={{ padding: 5, color }}
                />
            </TouchableOpacity>
            <Text style={[textStyles.headline6, { textAlign: 'right', color }]}>
                <Trans>Suggest an update</Trans>
            </Text>
        </View>
    );
};

interface EditingInputComponentProps {
    readonly onChangeText: (text: string) => void;
    readonly isEditing: boolean;
    readonly textValue: string;
}

const InputComponent = (props: EditingInputComponentProps): JSX.Element => {
    const [textColor, setTextcolor]: readonly [string, Dispatch<SetStateAction<string>>] = useState(colors.black);
    const onBlur = (): void => setTextcolor(colors.teal);
    const onFocus = (): void => setTextcolor(colors.black);

    if (!props.isEditing) {
        return <EmptyComponent />;
    }

    return (
        <I18n>
        {
            (({ i18n }: { readonly i18n: I18n }): JSX.Element =>
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
                    }}
                />
            )
        }
        </I18n>
    );
};
