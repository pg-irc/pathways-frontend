import React from 'react';
import { Text, I18nManager, SectionList, SectionBase } from 'react-native';
import { Trans } from '@lingui/react';
import { LocaleInfo } from '../../locale/types';
import { ListItem, Left, Right, Icon, Container, Content, Header, Title, Body } from 'native-base';

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
    const currentLocaleSection: SectionListData = {
        ...currentLocale,
        data: [ ...availableLocales.map((locale: LocaleInfo) => ({ ...locale, setLocale })) ]
    };

    return (
        <Container style={{ height: '100%', backgroundColor: '#FFF' }}>
            <Header>
                <Body><Title><Trans>Select language</Trans></Title></Body>
            </Header>
            <Content>
                <SectionList
                    initialNumToRender={10}
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
    readonly setLocale: (code: string) => void;
};

function renderSectionHeader({ section }: SectionHeaderInfo): JSX.Element {
    return (
        <ListItem key={section.code} itemDivider>
            <Text style={{ fontWeight: 'bold' }}>{section.label}</Text>
        </ListItem>
    );
}

function renderLocaleListItem({ item }: SectionItemInfo): JSX.Element {
    return (
        <ListItem key={item.code} onPress={(): void => item.setLocale(item.code)}>
            <Left><Text>{item.label}</Text></Left>
            <Right><Icon name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} /></Right>
        </ListItem>
    );
}