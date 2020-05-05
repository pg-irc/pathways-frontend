// tslint:disable:no-expression-statement
import React, { useEffect, Dispatch, SetStateAction, useState } from 'react';
import { SearchResultsComponent } from './search_results_component';
import { colors, textStyles } from '../../application/styles';
import { View, Text } from 'native-base';
import { useTraceUpdate } from '../../application/helpers/use_trace_update';
import { SearchInputComponent } from './search_input_component';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction, BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { RouterProps } from '../../application/routing';
import { DisableAnalyticsAction } from '../../stores/user_profile';
import { Id } from '../../stores/services';
import { DISABLE_ANALYTICS_STRING, ENABLE_ANALYTICS_STRING } from 'react-native-dotenv';
import * as actions from '../../stores/search';
import { useOnlineStatus } from './use_online_status';
import { SearchServiceData } from '../../validation/search/types';
import { LatLong } from '../../validation/latlong/types';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { renderHeader } from '../main/render_header';
import { Trans } from '@lingui/react';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import { MenuAndBackButtonHeaderProps } from '../menu_and_back_button_header/menu_and_back_button_header_component';

export interface SearchComponentProps {
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly searchLatLong: LatLong;
    readonly searchPage: number;
    readonly numberOfSearchPages: number;
    readonly searchOffset: number;
    readonly searchResults: ReadonlyArray<SearchServiceData>;
    readonly collapseSearchInput: boolean;
    readonly isSearchLoading: boolean;
}

export interface SearchComponentActions {
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly disableAnalytics: (disable: boolean) => DisableAnalyticsAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly saveSearchTerm: (searchTerm: string) => actions.SaveSearchTermAction;
    readonly saveSearchLocation: (searchLocation: string) => actions.SaveSearchLocationAction;
    readonly saveSearchOffset: (index: number) => actions.SaveSearchOffsetAction;
    readonly setCollapseSearchInput: (collapseSearchInput: boolean) => actions.SetCollapseSearchInputAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly searchRequest: (searchTermInput: string, searchLocationInput: string) => actions.SearchRequestAction;
    readonly loadMoreRequestAction: () => actions.LoadMoreRequestAction;
}

export type StringSetterFunction = Dispatch<SetStateAction<string>>;
export type BooleanSetterFunction = Dispatch<SetStateAction<boolean>>;

type Props = SearchComponentProps & SearchComponentActions & RouterProps;

export const SearchComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchComponent', props);
    const [scrollOffset, setScrollOffset]: readonly [number, (n: number) => void] = useState(props.searchOffset);
    const onlineStatus = useOnlineStatus();
    useDisableAnalyticsOnEasterEgg(props.searchLocation, props.disableAnalytics);

    const onSearchRequest = async (searchTerm: string, location: string): Promise<void> => {
        props.searchRequest(searchTerm, location);
    };

    const onLoadMore = async (): Promise<void> => {
       props.loadMoreRequestAction();
    };

    const searchResultsProps = { ...props, onlineStatus, scrollOffset, setScrollOffset, onSearchRequest, onLoadMore };
    return (
        <View style={{ backgroundColor: colors.pale, flex: 1 }}>
            <Header
                {...props}
                {...{ textColor: colors.white, backgroundColor: colors.teal }}
                title={<Text style={[textStyles.headlineH5StyleBlackCenter, { color: colors.white }]}><Trans>FIND A SERVICE</Trans></Text>}
            />
            <SearchInputComponent
                searchTerm={props.searchTerm}
                searchLocation={props.searchLocation}
                saveSearchTerm={props.saveSearchTerm}
                saveSearchLocation={props.saveSearchLocation}
                collapseSearchInput={props.collapseSearchInput}
                setCollapseSearchInput={props.setCollapseSearchInput}
                onSearchRequest={onSearchRequest}
            />
            <SearchResultsComponent {...searchResultsProps} />
        </View>
    );
};

const useDisableAnalyticsOnEasterEgg = (location: string, disableAnalytics: (disable: boolean) => DisableAnalyticsAction): void => {
    const effect = (): void => {
        if (location === DISABLE_ANALYTICS_STRING) {
            disableAnalytics(true);
            alert('Analytics disabled');
        } else if (location === ENABLE_ANALYTICS_STRING) {
            disableAnalytics(false);
            alert('Analytics enabled');
        }
    };
    useEffect(effect, [location]);
};

const Header = (props: MenuAndBackButtonHeaderProps): JSX.Element => {
    const rightButton =
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={props.textColor}
        />;
    return renderHeader({ ...props, rightButtons: [rightButton] });
};
