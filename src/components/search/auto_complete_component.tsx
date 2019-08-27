import React from 'react';
import { StyleSheet, Text, View, FlatList, ListRenderItemInfo } from 'react-native';

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        padding: 10,
        flexDirection: 'column',
    },
    titleText: {
        fontWeight: 'bold',
    },
});

export interface Prediction {
    readonly objectID: string;
    readonly name: string;
}

export interface Props {
    readonly hits: ReadonlyArray<Prediction>;
    readonly currentRefinement: string;
}

export interface Actions {
    readonly refine: (value?: string) => void;
}

export const AutoCompleteComponent = (props: Props & Actions): JSX.Element => (
    <FlatList
        data={props.hits}
        keyExtractor={(item: Prediction): string => item.objectID}
        ItemSeparatorComponent={(): JSX.Element => <View style={styles.separator} />}
        onEndReached={(): boolean => true}
        renderItem={({ item }: ListRenderItemInfo<Prediction>): JSX.Element => (
            <View style={styles.item}>
                <Text>Suggestion: {JSON.stringify(item).slice(0, 100)}</Text>
            </View>
        )}
    />
);
