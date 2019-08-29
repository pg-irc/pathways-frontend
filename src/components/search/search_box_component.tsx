import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Icon } from 'native-base';
import { values } from '../../application/styles';

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 48,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});

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

    return <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={'search'} type='FontAwesome' style={{ fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }} />
            <TextInput
                style={[styles.input, { flex: 1 }]}
                onChangeText={props.refine}
                value={props.currentRefinement}
                placeholder='Search for services and organizations' // TODO translate
            />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={'map-marker'} type='FontAwesome' style={{ fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }} />
            <TextInput
                style={[styles.input, { flex: 1 }]}
                onChangeText={setLocation}
                value={location}
                onEndEditing={(): void => props.setLocation(location)}
                placeholder='Near My location' // TODO translate
            />
        </View>
    </View>;
};
