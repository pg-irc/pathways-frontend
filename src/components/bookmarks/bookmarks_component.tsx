import React from 'react';
import { TopicListItem } from '../../selectors/topics/topic_list_item';
import { RouterProps } from '../../application/routing';
import { ListActions } from './bookmarks_connected_component';
import { TopicBookmarksComponent } from './topic_bookmarks_component';
import { HumanServiceData } from '../../validation/services/types';
import { View, Text, Content, Tabs, Tab } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { colors, textStyles, values } from '../../application/styles';
import { ServiceBookmarksComponent } from './service_bookmarks_component';
import { ReactI18nRenderProp, ReactI18n } from '../../locale/types';
import { StyleSheet } from 'react-native';

export interface BookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

type Props = BookmarksProps & ListActions & RouterProps ;

export const BookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <Content style={{ backgroundColor: colors.lightGrey }}>
            <HeaderComponent/>
            <I18n>
                {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                    <TabSwitcher i18n={i18nRenderProp.i18n} {...props}/>
                )}
            </I18n>
        </Content>
    );
};

const HeaderComponent = (): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white, paddingHorizontal: values.backgroundTextPadding }}>
        <Text style={textStyles.headlineH1StyleBlackLeft} >
            <Trans>My bookmarks</Trans>
        </Text>
        <Text style={textStyles.paragraphStyle}>
            <Trans>Save important topics and services to build your personal plan for settlement.</Trans>
        </Text>
    </View>
);

export interface TabSwitcherProps {
    readonly i18n: ReactI18n;
}

const TabSwitcher = (props: Props & TabSwitcherProps): JSX.Element => {
    const _ = props.i18n._.bind(props.i18n);
    const topicTabHeading = _('Topics');
    const serviceTabHeading = _('Services');
    return (
        <View style={{backgroundColor: colors.white}}>
            <Tabs tabContainerStyle={{elevation: 0, width: '50%', marginHorizontal: 8}} tabBarUnderlineStyle={{width: 0}} scrollWithoutAnimation>
                <Tab heading={topicTabHeading} {...tabStyle}>
                    <TopicBookmarksComponent {...props} />
                </Tab>
                <Tab heading={serviceTabHeading} {...tabStyle}>
                    <ServiceBookmarksComponent {...props} />
                </Tab>
            </Tabs>
    </View>
    );
};

const tabStyle = StyleSheet.create({
    textStyle: {
        ...textStyles.headlineH4StyleBlackLeft,
        fontWeight: 'bold',
    },
    tabStyle: {
        backgroundColor: colors.white, borderBottomColor: colors.white, borderBottomWidth: 4,
    },
    activeTabStyle: {
        backgroundColor: colors.white, borderBottomColor: colors.teal, borderBottomWidth: 4,
    },
    activeTextStyle: {
        ...textStyles.headlineH4StyleBlackLeft,
        fontWeight: 'bold',
    },
  });

// This is here to be able to extract heading strings with yarn extract-strings-clean.
// These strings must match the strings within the TabSwitcher component.
export const extractBookmarkComponentStrings = (): JSX.Element => (
    <View>
        <Text>
            <Trans>Topics</Trans>
        </Text>
        <Text>
            <Trans>Services</Trans>
        </Text>
    </View>
);
