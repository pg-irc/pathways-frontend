import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { Text, View } from 'native-base';
import { TopicListItem } from '../../selectors/topics/topic_list_item';
import { TaskListActions, NoTasksAddedComponent, TaskListComponent } from '../topics/task_list_component';
import { RouterProps } from '../../application/routing';
import { textStyles, colors, values } from '../../application/styles';
import { HumanServiceData } from '../../validation/services/types';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { ServiceListHeaderComponent, ServiceItemInfo } from '../services/service_list_component';

import { FlatList } from 'react-native';

export interface BookmarkedTopicsProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

type Props = BookmarkedTopicsProps & TaskListActions & RouterProps;

export const BookmarkedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <View>
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
                renderItem={renderFoo(props)}
                ListEmptyComponent={<EmptyListComponent message={<Trans>No services to show</Trans>}/>}
                ListHeaderComponent={<ServiceListHeaderComponent title={'Services'} />}
    />
        </View>
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

export const renderFoo = (_props: Props): ({ item }: ServiceItemInfo) => JSX.Element => {
    return ({ item }: ServiceItemInfo): JSX.Element => (
       <Foo service={item}/>
    );
};

// const getIds = (bookmarkedServices: ReadonlyArray<HumanServiceData>): ServiceList => (
//     bookmarkedServices.map((service: HumanServiceData) => service.id)
// );

export interface FooProps {
    readonly service: HumanServiceData;
}

export const Foo: React.StatelessComponent<FooProps> =
    (props: FooProps): JSX.Element => {
        const serviceName = buildServiceName(props.service.organizationName, props.service.name);
        return (
            <View style={{ backgroundColor: colors.white, padding: 10, marginTop: 10 }}>
                {renderName(serviceName)}
            </View>
        );
    };

    const buildServiceName = (organizationName: string, serviceName: string): string => (
        `${organizationName} - ${serviceName}`
    );
    const renderName = (name: string): JSX.Element => (
        <Text style={[textStyles.headlineH3StyleBlackLeft, textStyles.alwaysLeftAlign]}>{name}</Text>
    );