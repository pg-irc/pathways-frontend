import React, { useState } from 'react';
import { Icon } from 'native-base';
import { View, Text } from 'native-base';
import { TouchableOpacity, Modal, TextInput } from 'react-native';
import { Trans } from '@lingui/react';
import { applicationStyles } from '../../application/styles';
import { BackButton } from './back_button';
import { ClearInputButton } from './clear_input_button';

interface Props {
    readonly placeholder: string;
    readonly onEndEditing: (s: string) => void;
    readonly onUseMyLocation: () => void;
}

// tslint:disable-next-line:no-any
const padding15: any = {
    paddingTop: 15,
    paddingBottom: 15,
};

const UseMyLocationButton = (props: Props): JSX.Element => (
    <TouchableOpacity
        onPress={props.onUseMyLocation}
        style={{ flexDirection: 'row', alignItems: 'center', ...applicationStyles.thinGreyBorderBelow }}
    >
        <Icon name={'compass'} type='FontAwesome' style={{ padding: 15 }} />
        <Text style={padding15} ><Trans>My location</Trans></Text>
    </TouchableOpacity>
);

export const LocationInputModal = (props: Props): JSX.Element => {
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const onEndEditing = (): void => props.onEndEditing(location);
    const clearContent = (): void => setLocation('');

    return <Modal visible={true} transparent={false} presentationStyle={'fullScreen'} >
        <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', ...applicationStyles.thinGreyBorderBelow }}>
                <BackButton onPress={onEndEditing} />
                <TextInput
                    autoFocus
                    value={location}
                    onChangeText={setLocation}
                    onEndEditing={onEndEditing}
                    placeholder={props.placeholder}
                    style={{ flex: 1, ...padding15 }}
                />
                <ClearInputButton visible={location !== ''} onPress={clearContent} />
            </View>
            <UseMyLocationButton {...props} />
        </View>
    </Modal >;
};
