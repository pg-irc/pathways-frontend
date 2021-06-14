// tslint:disable: no-expression-statement
import React from 'react';
import { View, Header, Title, Icon, Text } from 'native-base';
import { applicationStyles, colors, textStyles } from '../../application/styles';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { isAndroid } from '../../application/helpers/is_android';
import { I18nManager, TouchableOpacity } from 'react-native';
import { Trans } from '@lingui/react';
import { CloseRegionDrawerAction } from '../../stores/user_experience/actions';
import { RegionCode, regionCodeToLabel } from '../../validation/region/types';
import { SaveRegionAction } from '../../stores/user_profile';

export interface RegionDrawerProps {
    readonly currentRegion: RegionCode;
}

export interface RegionDrawerActions {
    readonly closeRegionDrawer: () => CloseRegionDrawerAction;
    readonly saveRegion: (region: RegionCode) => SaveRegionAction;
}

type Props = RegionDrawerProps & RegionDrawerActions;

export const RegionDrawerComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1, backgroundColor: getViewBackgroundColorForPlatform() }}>
        <Header
            style={{
                backgroundColor: colors.lightTeal,
                marginTop: getStatusBarHeightForPlatform(),
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
            androidStatusBarColor={colors.teal}
        >
            <TouchableOpacity onPress={props.closeRegionDrawer} style={{ padding: 15 }} >
                <Icon name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'} style={{ color: colors.white }} />
            </TouchableOpacity >
            <Title style={textStyles.headlineH3StyleWhiteCenter}><Trans>SELECT YOUR REGION</Trans></Title>
        </Header>
        <RegionSection {...props} />
    </View>
);

const RegionSection = (props: Props): JSX.Element => {
    const otherRegion = props.currentRegion === RegionCode.BC ? RegionCode.MB : RegionCode.BC;
    return (
        <View>
            <SelectedRegionItem {...props} />
            <OtherRegion
                region={otherRegion}
                saveRegion={props.saveRegion} />
        </View>
    );
};

const SelectedRegionItem = (props: Props): JSX.Element => {
    return (
        <View key={props.currentRegion} style={applicationStyles.listItem}>
            <View style={{ marginLeft: 12, marginRight: 7 }}>
                <Icon
                    name='check'
                    type='FontAwesome'
                    style={{ fontSize: 22, color: colors.teal, marginHorizontal: -2, marginVertical: -2 }}
                />
            </View>
            <Text style={[textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold', marginLeft: 12 }]}>
                {regionCodeToLabel(props.currentRegion)}
            </Text>
        </View>
    );
};

const OtherRegion = (props: { readonly region: RegionCode, readonly saveRegion: (region: RegionCode) => SaveRegionAction }): JSX.Element => (
    <TouchableOpacity key={props.region} style={applicationStyles.listItem} onPress={(): SaveRegionAction => props.saveRegion(props.region)}>
        <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 50 }]}>{regionCodeToLabel(props.region)}</Text>
    </TouchableOpacity>
);

const getViewBackgroundColorForPlatform = (): string => (
    isAndroid() ? colors.teal : colors.white
);