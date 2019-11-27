import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { Text, View } from 'native-base';
import { TopicListItem } from '../../selectors/topics/topic_list_item';
import { NoTasksAddedComponent, TaskListComponent } from '../topics/task_list_component';
import { RouterProps } from '../../application/routing';
import { textStyles, colors, values } from '../../application/styles';
import { HumanServiceData, ServiceListData } from '../../validation/services/types';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { ServiceListHeaderComponent, ServiceItemInfo } from '../services/service_list_component';
import { FlatList } from 'react-native';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { ListActions } from './bookmarked_topics_connected_component';
import { getSavedServicesIds } from './get_saved_services_ids';

export interface BookmarkedTopicsProps {
    readonly bookmarkedServices: ServiceListData;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
    readonly currentPath: string;
}

type Props = BookmarkedTopicsProps & ListActions & RouterProps ;

export const BookmarkedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <React.Fragment>
            <TaskListComponent
                {...props}
                tasks={props.bookmarkedTopics}
                savedTasksIdList={R.map((topic: TopicListItem) => topic.id, props.bookmarkedTopics)}
                emptyTaskListContent={<NoTasksAddedComponent />}
                headerContent={<TaskListHeaderComponent />}
            />
            <FlatList
                style={{ backgroundColor: colors.lightGrey }}
                data={props.bookmarkedServices}
                keyExtractor={(service: HumanServiceData): string => service.id}
                renderItem={renderServiceItems(props)}
                ListEmptyComponent={<EmptyListComponent message={<Trans>No services to show</Trans>}/>}
                ListHeaderComponent={<ServiceListHeaderComponent title={'Services'} />}
    />
        </React.Fragment>
    );
};

const TaskListHeaderComponent = (): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white, paddingHorizontal: values.backgroundTextPadding }}>
        <Text style={textStyles.headlineH1StyleBlackLeft} >
            <Trans>My bookmarks</Trans>
        </Text>
        <Text style={textStyles.paragraphStyle}>
            <Trans>Save important topics to build your personal plan for settlement.</Trans>
        </Text>
    </View>
);

export const renderServiceItems = (props: Props): ({ item }: ServiceItemInfo) => JSX.Element => {
    return ({ item }: ServiceItemInfo): JSX.Element => (
        <ServiceListItemComponent
        service={item}
        currentPath={props.currentPath}
        isBookmarked={R.contains(item.id, getSavedServicesIds(props.bookmarkedServices))}
        addServiceToSavedList={props.addServiceToSavedList}
        removeServiceFromSavedList={props.removeServiceFromSavedList}
        />
    );
};