import React, { useState, Dispatch, SetStateAction  } from 'react';
import { View, TextInput, Text, TouchableOpacity, TextStyle, StyleProp } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Icon } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { stripMarkdown } from '../strip_markdown/strip_markdown';

interface Props {
    readonly feedbackEnabled: boolean;
    readonly feedbackText: string;
    readonly onChangeFeedbackText: (text: string) => void;
    readonly fieldLabel: JSX.Element;
    readonly fieldValue: string;
    readonly feedbackDisabledComponent: JSX.Element;
}

export const FeedbackComponent = (props: Props): JSX.Element => {
    const [isEditing, setIsEditing]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const onEditingTogglePress = (): void => setIsEditing(!isEditing);

    if (!props.feedbackEnabled) {
        return props.feedbackDisabledComponent;
    }

    return (
        <View style={{ marginVertical: 10 }}>
            <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
                <FieldLabel fieldLabel={props.fieldLabel} />
                <FieldValue fieldValue={props.fieldValue} />
            </View>
            <ToggleInputComponent
                onPress={onEditingTogglePress}
                isEditing={isEditing}
                onChangeFeedbackText={props.onChangeFeedbackText}
                feedbackText={props.feedbackText}
            />
        </View>
    );

};

const FieldLabel = (props: { readonly fieldLabel: Props['fieldLabel'] }): JSX.Element => (
    <Text style={[textStyles.headline6, { color: colors.black }]}>
        {props.fieldLabel}
    </Text>
);

const FieldValue = (props: { readonly fieldValue: Props['fieldValue'] }): JSX.Element => (
    <Text style={textStyles.suggestionText}>
        {props.fieldValue && stripMarkdown(props.fieldValue)}
    </Text>
);

interface ToggleInputComponentProps {
    readonly onPress: () => void;
    readonly isEditing: boolean;
    readonly onChangeFeedbackText: (text: string) => void;
    readonly feedbackText: string;
}

const ToggleInputComponent = (props: ToggleInputComponentProps): JSX.Element => (
    <View
        style={{
            borderColor: getEditingColor(props.isEditing),
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
        }}
    >
        <ToggleTextInputComponent
            onPress={props.onPress}
            isEditing={props.isEditing}
        />
        <TextInputComponent
            onChangeFeedbackText={props.onChangeFeedbackText}
            isEditing={props.isEditing}
            feedbackText={props.feedbackText}
        />
    </View>
);

interface ToggleButtonComponentProps {
    readonly onPress: () => void;
    readonly isEditing: boolean;
}

const ToggleTextInputComponent = (props: ToggleButtonComponentProps): JSX.Element => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={getEditingTextStyle(props.isEditing)}>
                <Trans>Suggest an update</Trans>
            </Text>
            <Icon
                type={'FontAwesome'}
                name={getEditingIcon(props.isEditing)}
                style={{ padding: 5, color: getEditingColor(props.isEditing) }}
            />
        </View>
    </TouchableOpacity>
);

interface InputComponentProps {
    readonly onChangeFeedbackText: (text: string) => void;
    readonly isEditing: boolean;
    readonly feedbackText: string;
}

const TextInputComponent = (props: InputComponentProps): JSX.Element => {
    const [textColor, setTextcolor]: readonly [string, Dispatch<SetStateAction<string>>] = useState(colors.teal);
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
                    multiline={true}
                    onChangeText={props.onChangeFeedbackText}
                    value={props.feedbackText}
                    textAlignVertical={'top'}
                    placeholder={i18n._(t`Comment or suggest edits`)}
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
            )
        }
        </I18n>
    );
};

const getEditingTextStyle = (isEditing: boolean): StyleProp<TextStyle> => (
    isEditing ?
        [ textStyles.paragraphBoldBlackLeft, { color: getEditingColor(isEditing) }]
        :
        [ textStyles.paragraphStyle, { color: getEditingColor(isEditing) }]
);

export const getEditingColor = (isEditing: boolean): string => (
    isEditing ? colors.teal : colors.grey
);

export const getEditingIcon = (isEditing: boolean): string => (
    isEditing ? 'check-square' : 'square-o'
);