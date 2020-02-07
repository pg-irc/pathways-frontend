import React from 'react';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { textStyles, imageStyles, colors, bulletPoint } from '../../application/styles';
import { emptySearch } from '../../application/images';
import { Image, ScrollView } from 'react-native';

export interface EmptyComponentProps {
    readonly header?: JSX.Element;
}

export const EmptyComponent = (props: EmptyComponentProps): JSX.Element => (
    <ScrollView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
        {props.header}
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 50,
                paddingHorizontal: 20,
                backgroundColor: colors.lightGrey,
            }}
        >
            {renderImage()}
            {renderTitle()}
            {renderSuggestionsList()}
        </View>
    </ScrollView>
);

const renderImage = (): JSX.Element => (
    <Image
        source={emptySearch}
        resizeMode={'contain'}
        style={imageStyles.emptyOrErrorComponentImage}
    />
);

const renderTitle = (): JSX.Element => (
    <Text style={[textStyles.headlineH2StyleBlackCenter, {marginBottom: 20}]}>
            Need suggestions? Try:
        </Text>
);

const renderSuggestionsList = (): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>Search for a different keyword</Trans>
        </Text>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>Double check for spelling</Trans>
        </Text>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>Ensure your search is in English</Trans>
        </Text>
    </View>
);