// tslint:disable: no-expression-statement
import React from 'react';
import { View, Header, Title, Icon } from 'native-base';
import { colors, textStyles } from '../../application/styles';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { isAndroid } from '../../application/helpers/is_android';
import { I18nManager, TouchableOpacity } from 'react-native';
import { Trans } from '@lingui/react';
import { CloseRegionDrawerAction } from '../../stores/user_experience/actions';
import { RegionCode } from '../../validation/region/types';

export interface RegionDrawerProps {
    readonly currentRegion: RegionCode;
}

export interface RegionDrawerActions {
    readonly closeRegionDrawer: () => CloseRegionDrawerAction;
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
    </View>
);

const getViewBackgroundColorForPlatform = (): string => (
    isAndroid() ? colors.teal : colors.white
);