import React from 'react';
import { StyleSheet, Text, View, FlatList, ListRenderItemInfo } from 'react-native';
import { colors } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';

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
}

export interface Props {
    readonly hits: ReadonlyArray<Prediction>;
    readonly currentRefinement: string;
}

export interface Actions {
    readonly refine: (value?: string) => void;
}

export const AutoCompleteComponent = (props: Props & Actions): JSX.Element => {
    // tslint:disable-next-line:no-empty
    const onRefresh = (): void => { };
    const refreshing = false;
    const listEmptyComponent = <EmptyComponent />;
    const listHeaderComponent = <EmptyComponent />;

    return <FlatList
        style={{ backgroundColor: colors.lightGrey }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={props.hits}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
    />;
};

const renderItem = (prediction: ListRenderItemInfo<Prediction>): JSX.Element => {
    return <View style={styles.item}>
        <Text>Suggestion: {JSON.stringify(prediction.item).slice(0, 100)}</Text>
    </View>;
};

const keyExtractor = (item: Prediction): string => item.objectID;
