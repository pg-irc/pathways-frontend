import React from 'react';
import { Text, SectionList, SectionBase } from 'react-native';
import { Trans } from '@lingui/react';
import { LocaleInfo } from '../../locale/types';
import { ListItem, Container, Content, Header, Title, Body, Left, Right, Icon } from 'native-base';
import { colors } from '../../application/styles';

export interface Props {
    readonly currentLocale: LocaleInfo;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
}

export interface Actions {
    setLocale(locale: string): void;
}

export type LanguageSwitcherProps = Props & Actions;

export const LanguageSwitcher = (props: LanguageSwitcherProps): JSX.Element => {
    const { currentLocale, availableLocales, setLocale }: LanguageSwitcherProps = props;
    const localeListItemBuilder = createLocaleListItemBuilder(setLocale);
    const currentLocaleSection = buildLocaleSectionListData(currentLocale, availableLocales, localeListItemBuilder);

    return (
        <Container style={{ height: '100%', backgroundColor: colors.lightGrey }}>
            <Header>
                <Body><Title><Trans>Select language</Trans></Title></Body>
            </Header>
            <Content>
                <SectionList
                    stickySectionHeadersEnabled={true}
                    keyExtractor={(item: LocaleInfo): string => item.code}
                    sections={[currentLocaleSection]}
                    renderItem={renderLocaleListItem}
                    renderSectionHeader={renderSectionHeader} />
            </Content>
        </Container>
    );
};

type SectionHeaderInfo = {
    readonly section: SectionListData;
};

type SectionItemInfo = {
    readonly item: LocaleListItem;
};

type SectionListData = LocaleInfo & SectionBase<LocaleListItem>;

type LocaleListItem = LocaleInfo & {
    readonly onPress: () => void;
};

type LocaleListItemBuilder = (locale: LocaleInfo) => LocaleListItem;

function renderSectionHeader({ section }: SectionHeaderInfo): JSX.Element {
    return (
        <ListItem key={section.code} itemDivider>
            <Left>
                <Text style={{ fontWeight: 'bold' }}>{section.label}</Text>
            </Left>
            <Right><Icon name='checkmark' /></Right>
        </ListItem>
    );
}

function renderLocaleListItem({ item }: SectionItemInfo): JSX.Element {
    return (
        <ListItem key={item.code} onPress={item.onPress}>
            <Text>{item.label}</Text>
        </ListItem>
    );
}

function createLocaleListItemBuilder(onPress: (code: string) => void): LocaleListItemBuilder {
    return (locale: LocaleInfo): LocaleListItem => {
        return { ...locale, onPress: (): void => onPress(locale.code) };
    };
}

function buildLocaleSectionListData(
    sectionLocale: LocaleInfo,
    locales: ReadonlyArray<LocaleInfo>,
    itemBuilder: LocaleListItemBuilder,
): SectionListData {
    return { ...sectionLocale, data: [...locales.map(itemBuilder)] };
}