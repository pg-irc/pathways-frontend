import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Trans } from '@lingui/react';
import { Icon } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';

interface Props {
    readonly isEnabled: boolean;
    readonly onChangeText: (text: string) => void;
    readonly textValue: string;
    readonly children: JSX.Element;
}

type StateAndSetState = readonly [boolean, Dispatch<SetStateAction<boolean>>];

export const SuggestUpdateComponent = (props: Props): JSX.Element => {
    const [isEditing, setIsEditing]: StateAndSetState = useState(false);
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
    if (!props.isEditing) {
        return <EmptyComponent />;
    }
    return (
        <TextInput
            numberOfLines={5}
            multiline={true}
            onChangeText={props.onChangeText}
            value={props.textValue}
            textAlignVertical={'top'}
            style={{
                borderColor: colors.teal,
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
            }}
        />
    );
};
