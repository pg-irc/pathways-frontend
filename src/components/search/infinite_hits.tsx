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

export interface HasId {
    readonly objectID: string;
}

export interface Props {
    readonly hits: ReadonlyArray<HasId>;
    readonly hasMore: boolean;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
}

export const InfiniteHits = (props: Partial<Props & Actions>): JSX.Element => (
    <FlatList
        data={props.hits}
        keyExtractor={(item: HasId): string => item.objectID}
        ItemSeparatorComponent={(): JSX.Element => <View style={styles.separator} />}
        onEndReached={(): boolean => props.hasMore}
        renderItem={({ item }: ListRenderItemInfo<HasId>): JSX.Element => (
            <View style={styles.item}>
                <Text>{JSON.stringify(item).slice(0, 100)}</Text>
            </View>
        )}
    />
);
