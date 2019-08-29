import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'native-base';
import { values } from '../../application/styles';

export interface Props {
    readonly currentRefinement: string;
    readonly location: string;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly setLocation: (s: string) => void;
}

export const SearchBoxComponent = (props: Props & Actions): JSX.Element => {
    const [location, setLocation]: [string, (s: string) => void] = useState(props.location);

    return <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={'search'} type='FontAwesome' style={{ fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }} />
            <TextInput
                style={{
                    flex: 1,
                    height: 48,
                    padding: 12,
                    fontSize: 16,
                }}
                onChangeText={props.refine}
                value={props.currentRefinement}
                placeholder='Search for services and organizations' // TODO translate
            />
        </View>
        <View style={{
            borderBottomWidth: 1,
            borderColor: '#ddd',
        }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={'map-marker'} type='FontAwesome' style={{ fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }} />
            <TextInput
                style={{
                    flex: 1,
                    height: 48,
                    padding: 12,
                    fontSize: 16,
                }}
                onChangeText={setLocation}
                value={location}
                onEndEditing={(): void => props.setLocation(location)}
                placeholder='Near My location' // TODO translate
            />
        </View>
        <View style={{
            borderBottomWidth: 1,
            borderColor: '#ddd',
        }} />
    </View>;
};
