import React from 'react';
import { FlatList, ListRenderItemInfo, Dimensions, Image } from 'react-native';
import { View, Text, Button } from 'native-base';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { onBoardingPhoto } from '../../application/images';
import { Trans } from '@lingui/react';

export interface OnBoardingPageProps {
    readonly key: string;
    readonly title: string;
    readonly subtitle: string;
    readonly image: any;
}

const pages: ReadonlyArray<OnBoardingPageProps> = [
    {
        key: '1',
        title: 'Get trusted information',
        subtitle: 'Learn about employment, health care, and everything else to start your new life in British Columbia',
        image: onBoardingPhoto,
    },
    {
        key: '2',
        title: 'Find helpful services nearby',
        subtitle: 'Find organizations that can help you settle into your new community.',
        image: onBoardingPhoto,
    },
    {
        key: '3',
        title: 'Get information based on your needs',
        subtitle: 'Answer a few questions about your situation to get personalized recommendations of\
        topics and services to help you settle in British Columbia.',
        image: onBoardingPhoto,
    },
];

const arrivalAdvisorLogoSize = Dimensions.get('screen').width / 1.5;

export const OnBoardingComponent = (): JSX.Element => (
    <View>
        <FlatList
            data = {pages}
            renderItem={({ item }: ListRenderItemInfo<OnBoardingPageProps>): JSX.Element => renderOnBoardingPage(item)}
            keyExtractor={(page: OnBoardingPageProps): string => page.key}
            extraData={1}
            horizontal
        />
    </View>
);

const renderOnBoardingPage = (item: OnBoardingPageProps): JSX.Element => (
    <OnBoardingPage
        key={item.key}
        title={item.title}
        subtitle={item.subtitle}
        image={item.image}
    />
);

const OnBoardingPage = (props: OnBoardingPageProps): JSX.Element => (
    <View style={{
            backgroundColor: colors.white,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            marginHorizontal: 25,
            marginVertical: 25,

        }}>
    <Image
        source={props.image}
        resizeMode={'contain'}
        style={{
            width: arrivalAdvisorLogoSize,
            height: arrivalAdvisorLogoSize,
            marginBottom: 20,
            marginVertical: 15,
            alignSelf: 'center',
        }}
    />
    <Text style={textStyles.headlineH2StyleBlackCenter}><Trans>{props.title}</Trans></Text>
    <Text style={{
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 21,
        marginTop: 22,
        marginBottom: 30,
    }}><Trans>{props.subtitle}</Trans></Text>
    <View>
        <Button
            full
            style={[applicationStyles.tealButton, { paddingHorizontal: 30, paddingVertical: 30, marginBottom: 50 }]}
        >
            <Text style={textStyles.button}>
                <Trans>Start personalization</Trans>
            </Text>
        </Button>
    </View>
    <Text style={{color: colors.sunshine, fontSize: 16, fontFamily: 'AvenirBlack',
 }}><Trans>Skip personalization</Trans></Text>
</View>
);