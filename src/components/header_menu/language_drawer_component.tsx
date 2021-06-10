// tslint:disable: no-expression-statement
import React from 'react';
import { View, Header, Title } from 'native-base';
import { colors, textStyles } from '../../application/styles';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { isAndroid } from '../../application/helpers/is_android';

export const LanguageDrawerComponent = (): JSX.Element => (
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
            <Title style={textStyles.headlineH3StyleWhiteCenter}>Select Language</Title>
        </Header>
    </View>
);

const getViewBackgroundColorForPlatform = (): string => (
    isAndroid() ? colors.teal : colors.white
);