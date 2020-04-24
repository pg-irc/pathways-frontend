// tslint:disable:no-expression-statement
import React, { useState, Dispatch, SetStateAction, useEffect  } from 'react';
import { View, TextInput, Text, TouchableOpacity, TextStyle, StyleProp } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Icon } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { stripMarkdown } from '../strip_markdown/strip_markdown';
import { FeedbackField } from '../../stores/feedback/types';

interface Props {
    readonly isEditableService: boolean;
    readonly feedbackField: FeedbackField;
    readonly setFeedbackField: (field: FeedbackField) => void;
    readonly fieldLabel: JSX.Element;
    readonly fieldValue: string;
    readonly feedbackDisabledComponent: JSX.Element;
}

export const FeedbackComponent = (props: Props): JSX.Element => {
    const [isEditing, setIsEditing]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    useEffect((): void => {
        props.setFeedbackField({ ...props.feedbackField, shouldSend: isEditing });
    }, [isEditing]);

    const onEditingTogglePress = (): void => setIsEditing(!isEditing);

    if (!props.isEditableService) {
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
                setFeedbackField={props.setFeedbackField}
                feedbackField={props.feedbackField}
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
    readonly setFeedbackField: Props['setFeedbackField'];
    readonly feedbackField: Props['feedbackField'];
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
            setFeedbackField={props.setFeedbackField}
            isEditing={props.isEditing}
            feedbackField={props.feedbackField}
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
    readonly setFeedbackField: Props['setFeedbackField'];
    readonly isEditing: boolean;
    readonly feedbackField: Props['feedbackField'];
}

const TextInputComponent = (props: InputComponentProps): JSX.Element => {
    const [textColor, setTextcolor]: readonly [string, Dispatch<SetStateAction<string>>] = useState(colors.teal);

    const onBlur = (): void => setTextcolor(colors.teal);

    const onFocus = (): void => setTextcolor(colors.black);

    const onChangeText = (value: string): void => props.setFeedbackField({ ...props.feedbackField, value });

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
                    value={props.feedbackField.value}
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

const getEditingColor = (isEditing: boolean): string => (
    isEditing ? colors.teal : colors.grey
);

const getEditingIcon = (isEditing: boolean): string => (
    isEditing ? 'check-square' : 'square-o'
);
