import { View, Text } from 'native-base';
import { Trans } from '@lingui/react';
import { ReactI18nRenderProp } from '../../locale/types';

interface LocalizedPlaceHolders {
    readonly searchTermPlaceHolder: string;
    readonly locationPlaceHolder: string;
    readonly nearMyLocationPlaceHolder: string;
}

export const DummyComponentForLinguiToPickUpStringsForTranslation = (): JSX.Element => {
    return <View>
        <Text><Trans>Search for services</Trans></Text>
        <Text><Trans>City, address or postal code</Trans></Text>
        <Text><Trans>Near My location</Trans></Text>
    </View>;
};

export const localizedPlaceHolders = (reactI18nRenderProp: ReactI18nRenderProp): LocalizedPlaceHolders => {
    const _ = reactI18nRenderProp.i18n._.bind(reactI18nRenderProp.i18n);
    return {
        searchTermPlaceHolder: _('Search for services'),
        locationPlaceHolder: _('City, address or postal code'),
        nearMyLocationPlaceHolder: _('Near My location'),
    };
};
