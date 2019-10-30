import React, { useState } from 'react';
import { Icon } from 'native-base';
import { View, Text } from 'native-base';
import { TouchableOpacity, Modal, TextInput } from 'react-native';
import { Trans } from '@lingui/react';
import { colors } from '../../application/styles';
import { BackButton } from './back_button';
import { ClearInputButton } from './clear_input_button';

interface Props {
    readonly visible: boolean;
    readonly placeholder: string;
    readonly onEndEditing: (s: string) => void;
    readonly onUseMyLocation: () => void;
}

export const LocationInputModal: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const onEndEditing = (): void => props.onEndEditing(location);
    const clearContent = (): void => setLocation('');

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
                <BackButton onPress={onEndEditing} />
                <TextInput
                    value={location}
                    onChangeText={setLocation}
                    onEndEditing={onEndEditing}
                    placeholder={props.placeholder}
                    style={{
                        flex: 1,
                        paddingTop: 15,
                        paddingBottom: 15,
                    }}
                />
                <ClearInputButton visible={location !== ''} onPress={clearContent} />
            </View>
            <UseMyLocationButton />
        </View>
    </Modal >;
};
