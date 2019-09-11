import React, { useState } from 'react';
import { InstantSearch, Index, connectSearchBox, connectInfiniteHits, connectConfigure } from 'react-instantsearch-native';
import { SearchInputComponent } from './search_input_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors, textStyles } from '../../application/styles';
import { Content, Text } from 'native-base';
import { View } from 'react-native';
import { emptyComponent } from '../empty_component/empty_component';
import { Locale } from '../../locale';
import { LatLong } from './types';
import { useFetchLatLongFromLocation } from './api/use_fetch_lat_long_from_location';
import { toServiceSearchConfiguration } from './api/configuration';
import { useTraceUpdate as useTraceComponentUpdates } from '../../helpers/debug';
import { LinkTypes, AnalyticsLink } from '../link/link';
import { buildLinkContext } from '../../sagas/analytics/events';
import { ALGOLIA_SERVICES_INDEX, ALGOLIA_ORGANIZATIONS_INDEX } from 'react-native-dotenv';
import { Trans } from '@lingui/react';
import { SearchListSeparator } from './separators';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
    readonly currentLocale: Locale;
    readonly currentPath: string;
}

export interface SearchComponentActions {
    readonly openMenu: () => void;
}

type Props = SearchComponentProps & SearchComponentActions;

// TODO space to left and right of input fields
// TODO space below lower input field
// TODO Centre header text
// TODO show error condition

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: Props): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceComponentUpdates('SearchComponent', props);
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);

    // tslint:disable-next-line:no-expression-statement
    useFetchLatLongFromLocation(location, setLatLong);

    const SearchInputConnectedComponent = connectSearchBox(SearchInputComponent);
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <Content style={{ backgroundColor: colors.teal }}>
        <InstantSearch indexName={servicesIndex()} {...props} >
            <SearchInputConnectedComponent location={location} setLocation={setLocation} latLong={latLong} />
            <ConfigureConnectedComponent {...toServiceSearchConfiguration(latLong)} />
            <InformationOnlyInEnglishNotice {...props} />
            <InfiniteHitsConnectedComponent />
            <Index indexName={organizationsIndex()}>
                <InfiniteHitsConnectedComponent />
            </Index>
        </InstantSearch>
    </Content>;
};

const InformationOnlyInEnglishNotice = (props: Props): JSX.Element => {
    const phoneNumber: string = '211';
    const href = `tel: ${phoneNumber}`;
    const linkContext = buildLinkContext('Service', 'BC-211');

    return <View style={{ backgroundColor: colors.white }}>
        <Text style={[textStyles.paragraphStyle,
        {
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
        }]}>
            <Trans>Information about services is currently only available in English. For information in other languages, <AnalyticsLink
                href={href} currentPath={props.currentPath} linkContext={linkContext} linkType={LinkTypes.phone} style={{ color: colors.teal }}
            >please call BC211</AnalyticsLink>.</Trans>
        </Text>
        <SearchListSeparator />
    </View>;
};

const servicesIndex = (): string => (
    ALGOLIA_SERVICES_INDEX || 'dev_services'
);

const organizationsIndex = (): string => (
    ALGOLIA_ORGANIZATIONS_INDEX || 'dev_organizations'
);
