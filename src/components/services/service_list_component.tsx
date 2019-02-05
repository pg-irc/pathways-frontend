// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import { Service } from '../../stores/services';
import { TaskServices } from '../../selectors/services/task_services';
import { Task } from '../../selectors/tasks/task';
import { ServiceListItemComponent } from './service_list_item_component';
import { UpdateTaskServicesAsync } from '../../stores/services';
import { textStyles, colors, values } from '../../application/styles';
import { EmptyListComponent } from '../empty_component/empty_list_component';

export interface ServiceListProps {
    readonly task: Task;
    readonly taskServices: TaskServices;
}

export interface ServiceListActions {
    readonly requestUpdateOfServicesForTask: (task: Task) => UpdateTaskServicesAsync.Request;
}

export interface TaskServiceUpdater {
    readonly requestUpdateTaskServices: () => UpdateTaskServicesAsync.Request;
}

type Props = ServiceListProps & ServiceListActions & TaskServiceUpdater;

export class ServiceListComponent extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.requestUpdateTaskServices();
    }

    render(): JSX.Element {
        return (
            <View style={{ flex: 1, backgroundColor: colors.lightGrey }}>
                <View style={{
                    backgroundColor: colors.teal,
                    marginHorizontal: -10,
                    marginTop: -10,
                    padding: 20,
                }}
                >
                    <Icon
                        type={'FontAwesome'}
                        name={'map-marker'}
                        style={{
                            color: colors.white,
                            padding: 5,
                            fontSize: values.smallIconSize,
                        }}
                    />
                    <Text style={[textStyles.headlineH5StyleBlackLeft, { color: colors.white }]}>
                        <Trans>FIND A SERVICE NEAR YOU</Trans>
                    </Text>
                    <Text style={textStyles.headlineH2StyleWhiteLeft}>
                        {this.props.task.title}
                    </Text>
                </View>
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
        <ServiceListItemComponent service={item} />
    );
}