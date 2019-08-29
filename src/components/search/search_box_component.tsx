import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'native-base';
import { values, applicationStyles, colors } from '../../application/styles';

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
            {icon('search')}
            <TextInput
                style={applicationStyles.searchInput}
                onChangeText={props.refine}
                value={props.currentRefinement}
                placeholder='Search for services and organizations' // TODO translate
            />
        </View>
        <Separator />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {icon('map-marker')}
            <TextInput
                style={applicationStyles.searchInput}
                onChangeText={setLocation}
                value={location}
                onEndEditing={(): void => props.setLocation(location)}
                placeholder='Near My location' // TODO translate
            />
        </View>
        <Separator />
    </View>;
};

const icon = (name: string): JSX.Element => (
    <Icon name={name}
        type='FontAwesome'
        style={{ fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }}
    />
);

const Separator = (): JSX.Element => (
    <View style={{
        borderBottomWidth: 1,
        borderColor: colors.greyishBrown,
    }} />
);
