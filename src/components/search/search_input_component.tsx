import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { values, applicationStyles, colors } from '../../application/styles';
import { LatLong } from './types';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { InputFormSeparator } from './separators';
import { ReactI18nRenderProp } from '../../locale/types';

export interface Props {
    readonly currentRefinement: string;
    readonly location: string;
    readonly latLong: LatLong;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly setLocation: (s: string) => void;
}

// tslint:disable:no-expression-statement
export const SearchInputComponent = (props: Props & Actions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [location, setLocation]: [string, (s: string) => void] = useState(props.location);
    useEffect(() => {
        debug(`SearchInput Component useEffect with '${props.currentRefinement}'`);
        props.refine(props.currentRefinement);
    }, [props.latLong]);

    return <I18n>
        {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => {
            const _ = i18nRenderProp.i18n._.bind(i18nRenderProp.i18n);
            return <View style={{ paddingHorizontal: 20, paddingBottom: 20, backgroundColor: colors.teal }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <InputIcon name='search' />
                    <TextInput
                        style={applicationStyles.searchInput}
                        onChangeText={(d: string): void => {
                            debug(`SearchInputComponent search text changed to '${d}'`);
                            props.refine(d);
                        }}
                        value={props.currentRefinement}
                        placeholder={_('Search for services')}
                        placeholderTextColor={colors.white}
                    />
                </View>
                <InputFormSeparator />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <InputIcon name='map-marker' />
                    <TextInput
                        style={applicationStyles.searchInput}
                        onChangeText={(d: string): void => {
                            debug(`SearchInputComponent location text changed to '${d}'`);
                            setLocation(d);
                        }}
                        value={location}
                        onEndEditing={(): void => props.setLocation(location)}
                        placeholder={_('Near My location')}
                        placeholderTextColor={colors.white}
                    />
                </View>
                <InputFormSeparator />
            </View >;
        }}
    </I18n>;
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

export const extractSearchStrings = (): JSX.Element => (
    <div>
        <Text><Trans>Search for services</Trans></Text>
        <Text>
            <Trans>Near My location</Trans>
        </Text>
    </div>
);