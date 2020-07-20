// tslint:disable:no-expression-statement
import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput, Text, TouchableOpacity, TextStyle, StyleProp } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Icon } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { stripMarkdown } from '../strip_markdown/strip_markdown';
import { FeedbackField } from '../../stores/feedback/types';

interface Props {
    readonly inputField: FeedbackField;
    readonly setText: (field: FeedbackField, value: string) => void;
    readonly toggleShouldSend: (field: FeedbackField) => void;
    readonly label: JSX.Element;
    readonly body: string;
    readonly isEnabled: boolean;
    readonly disabledComponent: JSX.Element;
}

export const FeedbackComponent = (props: Props): JSX.Element => {
    if (!props.isEnabled) {
        return props.disabledComponent;
    }

    return (
        <View style={{ marginVertical: 10 }}>
            <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                <FieldLabel fieldLabel={props.label} />
                <FieldValue fieldValue={props.body} />
            </View>
            <ToggleInputComponent
                onPress={(): void => props.toggleShouldSend(props.inputField)}
                isEditing={props.inputField.shouldSend}
                setTextForField={props.setText}
                inputField={props.inputField}
            />
        </View>
    );

};

const FieldLabel = (props: { readonly fieldLabel: Props['label'] }): JSX.Element => (
    <Text style={[textStyles.headline6, { color: colors.black, textAlign: 'left' }]}>
        {props.fieldLabel}
    </Text>
);

const FieldValue = (props: { readonly fieldValue: Props['body'] }): JSX.Element => (
    <Text style={textStyles.suggestionText}>
        {props.fieldValue && stripMarkdown(props.fieldValue)}
    </Text>
);

interface ToggleInputComponentProps {
    readonly onPress: () => void;
    readonly isEditing: boolean;
    readonly setTextForField: (field: FeedbackField, value: string) => void;
    readonly inputField: FeedbackField;
}

const ToggleInputComponent = (props: ToggleInputComponentProps): JSX.Element => (
    <View
        style={{
            borderColor: getEditingColor(props.isEditing),
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginTop: 5,
        }}
    >
        <ToggleTextInputComponent
            onPress={props.onPress}
            isEditing={props.isEditing}
        />
        <TextInputComponent
            setText={props.setTextForField}
            isEditing={props.isEditing}
            inputField={props.inputField}
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
                style={{ padding: 0, color: getEditingColor(props.isEditing) }}
            />
        </View>
    </TouchableOpacity>
);

interface InputComponentProps {
    readonly setText: (field: FeedbackField, value: string) => void;
    readonly isEditing: boolean;
    readonly inputField: FeedbackField;
}

const TextInputComponent = (props: InputComponentProps): JSX.Element => {
    const [textColor, setTextcolor]: readonly [string, Dispatch<SetStateAction<string>>] = useState(colors.teal);
    const onBlur = (): void => setTextcolor(colors.teal);
    const onFocus = (): void => setTextcolor(colors.black);
    const onChangeText = (value: string): void => props.setText(props.inputField, value);

    if (!props.isEditing) {
        return <EmptyComponent />;
    }

    return (
        <I18n>
        {
            (({ i18n }: I18nProps): JSX.Element =>
                <TextInput
                    multiline={true}
                    onChangeText={onChangeText}
                    value={props.inputField.value}
                    textAlignVertical={'top'}
                    placeholder={i18n._(t`Comment or suggest edits`)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    style={{
                        color: textColor,
                        marginTop: 10,
                        marginBottom: 5,
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

const getEditingColor = (isEditing: boolean): string => (
    isEditing ? colors.teal : colors.darkerGrey
);

const getEditingIcon = (isEditing: boolean): string => (
    isEditing ? 'check-square' : 'square-o'
);
