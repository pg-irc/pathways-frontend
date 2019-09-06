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

// tslint:disable:no-expression-statement

export const SearchBoxComponent = (props: Props & Actions): JSX.Element => {
    const [location, setLocation]: [string, (s: string) => void] = useState(props.location);
    return <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InputIcon name='search' />
            <TextInput
                style={applicationStyles.searchInput}
                onChangeText={(s: string): void => {
                    console.log(`Refine called, search string updated to ${s}`);
                    props.refine(s);
                }}
                value={props.currentRefinement}
                placeholder='Search for services and organizations' // TODO translate
            />
        </View>
        <Separator />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InputIcon name='map-marker' />
            <TextInput
                style={applicationStyles.searchInput}
                onChangeText={setLocation}
                value={location}
                onEndEditing={(): void => {
                    console.log(`Refine called, search location updated to ${location} and search to ${props.currentRefinement}`);
                    props.setLocation(location);
                    props.refine(props.currentRefinement);
                }}
                placeholder='Near My location' // TODO translate
            />
        </View>
        <Separator />
    </View>;
};

interface IconProps {
    readonly name: string;
}

const InputIcon = ({ name }: IconProps): JSX.Element => (
    <Icon name={name}
        type='FontAwesome'
        style={{ color: colors.white, fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }}
    />
);

const Separator = (): JSX.Element => (
    <View style={{
        borderBottomWidth: 1,
        borderColor: colors.white,
    }} />
);
