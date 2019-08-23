import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { connectSearchBox } from 'react-instantsearch-native';

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

interface Props {
    readonly currentRefinement: string;
}

interface Actions {
    readonly refine: (searchTerm: string) => string;
}

const SearchBox = (props: Props & Actions): JSX.Element => (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={(value: string): string => props.refine(value)}
            value={props.currentRefinement}
            placeholder=''
        />
    </View>
);

export const SearchBoxConnectedComponent = connectSearchBox(SearchBox);
