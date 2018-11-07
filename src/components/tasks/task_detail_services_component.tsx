// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { Service } from '../../stores/services';
import { TaskServices } from '../../selectors/services/task_services';
import { Task } from '../../selectors/tasks/task';
import { ServiceComponent } from '../services/service_component';
import { UpdateTaskServicesAsync } from '../../stores/services';
import { textStyles, colors } from '../../application/styles';
import { EmptyListComponent } from '../empty_component/empty_list_component';

export interface TaskDetailServicesProps {
    readonly task: Task;
    readonly taskServices: TaskServices;
}

export interface TaskDetailServicesActions {
    readonly requestUpdateOfServicesForTask: (task: Task) => UpdateTaskServicesAsync.Request;
}

export interface TaskServiceUpdater {
    readonly requestUpdateTaskServices: () => UpdateTaskServicesAsync.Request;
}

type Props = TaskDetailServicesProps & TaskDetailServicesActions & TaskServiceUpdater;

export class TaskDetailServicesComponent extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.requestUpdateTaskServices();
    }

    render(): JSX.Element {
        return (
            <View padder style={{ flex: 1, backgroundColor: colors.white }}>
                <Text style={[textStyles.headlineH1StyleBlackLeft, { marginBottom: 20 }]}>
                    {this.props.task.title} <Trans>services</Trans>
                </Text>
                <FlatList
                    ListEmptyComponent={ServiceListEmpty}
                    refreshing={this.props.taskServices.loading}
                    onRefresh={this.props.requestUpdateTaskServices}
                    data={this.props.taskServices.services}
                    keyExtractor={(service: Service): string => service.id}
                    renderItem={renderServiceListItem} />
            </View>
        );
    }
}

function ServiceListEmpty(): JSX.Element {
    return <EmptyListComponent message={<Trans>No related services found</Trans>} />;
}

interface ServiceItemInfo extends ListRenderItemInfo<Service> { }

function renderServiceListItem({ item }: ServiceItemInfo): JSX.Element {
    return (
        <View style={{ marginBottom: 15 }}>
            <ServiceComponent service={item} />
        </View>
    );
}