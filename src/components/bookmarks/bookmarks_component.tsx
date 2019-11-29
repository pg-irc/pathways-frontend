import React from 'react';
import { TopicListItem } from '../../selectors/topics/topic_list_item';
import { RouterProps } from '../../application/routing';
import { ServiceListData, ServiceList } from '../../validation/services/types';
import { ListActions } from './bookmarks_connected_component';
import { TopicBookmarksComponent } from './topic_bookmarks_component';
import { ServiceBookmarksComponent } from './service_bookmarks_component';

export interface BookmarksProps {
    readonly bookmarkedServices: ServiceListData;
    readonly savedServicesIds: ServiceList;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
    readonly currentPath: string;
}

type Props = BookmarksProps & ListActions & RouterProps ;

export const BookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <React.Fragment>
            <TopicBookmarksComponent {...props} />
            <ServiceBookmarksComponent {...props} />
        </React.Fragment>
    );
};