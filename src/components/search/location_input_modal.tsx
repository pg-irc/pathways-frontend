import React, { useState } from 'react';
import { Icon } from 'native-base';
import { View, Text } from 'native-base';
import { TouchableOpacity, Modal, TextInput } from 'react-native';
import { Trans } from '@lingui/react';
import { colors } from '../../application/styles';

interface Props {
    readonly visible: boolean;
    readonly placeholder: string;
    readonly onEndEditing: (s: string) => void;
    readonly onUseMyLocation: () => void;
}

export const LocationInputModal: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const [location, setLocation]: [string, (s: string) => void] = useState('');

    const BackButton = (): JSX.Element => (
        <TouchableOpacity onPress={onEndEditing} style={{ padding: 15 }} >
            <Icon name={'arrow-back'} style={{}} />
        </TouchableOpacity >);

    const onEndEditing = (): void => props.onEndEditing(location);

    const ClearInputButton = (): JSX.Element => (
        <TouchableOpacity onPress={clearLocation} style={{ padding: 15 }}>
            <Icon name={'window-close'} type='MaterialCommunityIcons' style={{ fontSize: 25 }} />
        </TouchableOpacity>);

    const clearLocation = (): void => setLocation('');

    const UseMyLocationButton = (): JSX.Element => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: colors.darkerGrey,
            }}
            onPress={props.onUseMyLocation}
        >
            <Icon name={'compass'} type='FontAwesome' style={{ padding: 15 }} />
            <Text style={{ paddingTop: 15, paddingBottom: 15 }} ><Trans>My location</Trans></Text>
        </TouchableOpacity>
    );

    return <Modal visible={props.visible} transparent={false} presentationStyle={'fullScreen'} >
        <View style={{ flexDirection: 'column' }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: colors.darkerGrey,
            }}>
                <BackButton />
                <TextInput
                    value={location}
                    onChangeText={setLocation}
                    onEndEditing={onEndEditing}
                    placeholder={props.placeholder}
                    style={{ flex: 1, paddingTop: 15, paddingBottom: 15 }}
                />
                <ClearInputButton />
            </View>
            <UseMyLocationButton />
        </View>
    </Modal >;
};
