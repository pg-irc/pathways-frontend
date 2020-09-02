// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text, TouchableOpacity, TextStyle, StyleProp } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Icon } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles, getTextAlignForLanguage } from '../../application/styles';
import { stripMarkdown } from '../strip_markdown/strip_markdown';
import { FeedbackField } from '../../stores/feedback/types';
import { MultilineTextInputForPlatform } from '../multiline_text_input_for_platform';

interface Props {
    readonly inputField: FeedbackField;
    readonly setText: (field: FeedbackField, value: string) => void;
    readonly toggleShouldSend: (field: FeedbackField) => void;
    readonly label: JSX.Element;
    readonly body: string;
    readonly isFeedbackInputEnabled: boolean;
    readonly nonFeedbackComponent: JSX.Element;
}

export const FeedbackComponent = (props: Props): JSX.Element => {
    if (!props.isFeedbackInputEnabled) {
        return props.nonFeedbackComponent;
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
    const onChangeText = (value: string): void => props.setText(props.inputField, value);

    if (!props.isEditing) {
        return <EmptyComponent />;
    }

    return (
        <I18n>
        {
            (({ i18n }: I18nProps): JSX.Element =>
                <MultilineTextInputForPlatform
                    i18n={i18n}
                    value={props.inputField.value}
                    numberOfLines={1}
                    placeholder={t`Comment or suggest edits`}
                    style={{
                        marginTop: 10,
                        marginBottom: 5,
                        borderBottomColor: colors.grey,
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                        ...getTextAlignForLanguage()}}
                    onChangeText={onChangeText}
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
