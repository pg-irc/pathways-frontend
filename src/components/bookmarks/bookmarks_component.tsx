import React from 'react';
import { TopicListItem } from '../../selectors/topics/topic_list_item';
import { RouterProps } from '../../application/routing';
import { ListActions } from './bookmarks_connected_component';
import { TopicBookmarksComponent } from './topic_bookmarks_component';
import { HumanServiceData } from '../../validation/services/types';
import { View, Text, Content, Tabs, Tab, TabHeading } from 'native-base';
import { Trans } from '@lingui/react';
import { colors, textStyles, values } from '../../application/styles';
import { ServiceBookmarksComponent } from './service_bookmarks_component';

export interface BookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

type Props = BookmarksProps & ListActions & RouterProps ;

export const BookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <Content style={{ backgroundColor: colors.lightGrey }}>
            <HeaderComponent/>
            <TabSwitcher {...props}/>
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

const TabSwitcher = (props: Props): JSX.Element => (
    <Tabs>
        <Tab
            heading={
                <TabHeading>
                    <Text>Topics</Text>
                </TabHeading>
            }
            >
                <TopicBookmarksComponent {...props} />
            </Tab>
            <Tab
                heading={
                    <TabHeading>
                        <Text>Services</Text>
                    </TabHeading>
                }
            >
                <ServiceBookmarksComponent {...props} />
            </Tab>
    </Tabs>
);