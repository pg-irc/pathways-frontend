import React from 'react';
import { SetPartialLocalizationMessageAction } from '../../stores/user_profile';
import { View, Text } from 'native-base';
import { textStyles, colors } from '../../application/styles';
import { Trans } from '@lingui/react';
import { TouchableOpacity } from 'react-native';
import { openURL } from '../link/link';
import { EmptyComponent } from '../empty_component/empty_component';

export interface PartialLocalizationMessageComponentProps {
    readonly showPartialLocalizationMessage: boolean;
}

export interface PartialLocalizationMessageComponentActions {
    readonly setPartialLocalizationMessage: () => SetPartialLocalizationMessageAction;
}

type Props = PartialLocalizationMessageComponentProps & PartialLocalizationMessageComponentActions;

export const PartialLocalizationMessageComponent = (props: Props): JSX.Element => {
    const onPressRemovebutton = (): SetPartialLocalizationMessageAction => (
        props.setPartialLocalizationMessage()
    );

    if (!props.showPartialLocalizationMessage) {
        return <EmptyComponent />;
    }

    return (
        <View style={{ backgroundColor: colors.lightGrey }}>
            <View style={{ backgroundColor: colors.white, paddingVertical: 19, paddingHorizontal: 24, marginBottom: 8 }}>
                {renderMessage()}
                {renderRemoveButton(onPressRemovebutton)}
            </View>
        </View>
    );
};

const renderMessage = (): JSX.Element => (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text style={[textStyles.listItemDetail, { fontSize: 14 }]}>
            <Trans>
                Information about services is currently only available in English. For support in other languages, please
                </Trans> <Text onPress={onPressForPhoneNumber} style={[textStyles.listItemDetail, { color: 'teal', fontWeight: 'bold'}]}>
                <Trans>call BC211.</Trans>
            </Text>
        </Text>
    </View>
);

const onPressForPhoneNumber = (): void => {
    const linkValue = 'tel: ' + '211';
    // tslint:disable-next-line: no-expression-statement
    openURL(linkValue);
};

const renderRemoveButton = (onPress: () => void): JSX.Element => (
    <View style={{ marginTop: 10, flexDirection: 'row-reverse' }}>
        <TouchableOpacity onPress={onPress}>
            <Text style={[textStyles.listItemDetail, {fontSize: 16, color: 'teal', fontWeight: 'bold'}]}>
                <Trans>Don't show again</Trans>
            </Text>
        </TouchableOpacity>
    </View>
);