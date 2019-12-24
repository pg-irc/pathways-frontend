import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { values, applicationStyles, colors } from '../../application/styles';
import { LatLong } from '../../validation/latlong/types';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { ReactI18nRenderProp, ReactI18n } from '../../locale/types';
import { EmptyComponent } from '../empty_component/empty_component';
import { ClearInputButton } from './clear_input_button';

export interface Props {
    readonly currentRefinement: string;
    readonly location: string;
    readonly latLong: LatLong;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly setLocation: (s: string) => void;
}

const UseMyLocationButton = (): JSX.Element => {
    const icon = <Icon
        type={'MaterialIcons'} name={'my-location'}
        style={{ color: colors.greyishBrown, fontSize: 16, margin: 10 }}
    />;

    const text = <Text style={{
        color: colors.greyishBrown,
        fontSize: 12,
        marginVertical: 10,
        marginRight: 10,
        fontWeight: 'bold',
    }}><Trans>Use My Location</Trans></Text>;

    const button = (
        <TouchableOpacity style={applicationStyles.whiteButton}>
            {icon}{text}
        </TouchableOpacity>
    );
    return <View style={{ marginTop: 5, marginLeft: 5 }}>{button}</View>;
};

const renderUseMyLocationButton = (showUseMyLocationButton: boolean): JSX.Element => {
    if (!showUseMyLocationButton) {
        return <EmptyComponent />;
    }
    return <UseMyLocationButton />;
};

// tslint:disable:no-expression-statement
export const SearchInputComponent = (props: Props & Actions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [location, setLocation]: [string, (s: string) => void] = useState(props.location);
    useEffect(() => {
        debug(`SearchInput Component useEffect with '${props.currentRefinement}'`);
        props.refine(props.currentRefinement);
    }, [props.latLong]);
    const [locationInput, setLocationInput]: [boolean, (b: boolean) => void] = useState();
    const buildTranslatedPlaceholder = (i18n: ReactI18n, placeholder: string): string => {
        const _ = i18n._.bind(i18n);
        return _(placeholder);
    };
    const clearSearch = (): string => props.refine('');
    const clearLocation = (): void => setLocation('');

    return <I18n>
        {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (

            <View style={{ padding: 10, backgroundColor: colors.teal }}>
                <TouchableOpacity style={{ backgroundColor: colors.lightTeal, borderRadius: values.lessRoundedBorderRadius, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <InputIcon name='search' />
                    <TextInput
                        style={applicationStyles.searchInput}
                        onChangeText={(d: string): void => {
                            debug(`SearchInputComponent search text changed to '${d}'`);
                            props.refine(d);
                        }}
                        value={props.currentRefinement}
                        placeholder={buildTranslatedPlaceholder(i18nRenderProp.i18n, 'Search for services')} // TODO translate
                        placeholderTextColor={colors.white}
                    />
                    <ClearInputButton visible={props.currentRefinement !== ''} onPress={clearSearch} />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: colors.lightTeal, borderRadius: values.lessRoundedBorderRadius, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <InputIcon name='map-marker' />
                    <TextInput
                        style={applicationStyles.searchInput}
                        onChangeText={(d: string): void => {
                            debug(`SearchInputComponent location text changed to '${d}'`);
                            setLocation(d);
                        }}
                        onFocus={(): void => setLocationInput(true)}
                        onBlur={(): void => setLocationInput(false)}
                        value={location}
                        onEndEditing={(): void => props.setLocation(location)}
                        placeholder={buildTranslatedPlaceholder(i18nRenderProp.i18n, 'Near My location')} // TODO translate
                        placeholderTextColor={colors.white}
                    />
                    <ClearInputButton visible={location !== ''} onPress={clearLocation} />
                </TouchableOpacity>
                {renderUseMyLocationButton(locationInput)}
            </View >
        )}

    </I18n>;
};

interface IconProps {
    readonly name: string;
}

const InputIcon = ({ name }: IconProps): JSX.Element => (
    <Icon name={name}
        type='FontAwesome'
        style={{ color: colors.white, fontSize: values.smallIconSize, flex: .1, paddingLeft: 10 }}
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
