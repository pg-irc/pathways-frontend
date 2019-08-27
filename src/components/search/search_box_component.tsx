import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

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
    readonly setLocation: (location: string) => void;
}

export const SearchBoxComponent = (props: Props & Actions): JSX.Element => (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={(searchTerms: string): string => props.refine(searchTerms)}
            value={props.currentRefinement}
            placeholder='Search for services and organizations' // TODO translate
        />
        <TextInput
            style={styles.input}
            onChangeText={(location: string): void => props.setLocation(location)}
            value={props.location}
            placeholder='Near My location' // TODO translate
        />
    </View>
);
