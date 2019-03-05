// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import { Service, TaskServicesError } from '../../stores/services';
import { TaskServices } from '../../selectors/services/task_services';
import { Task } from '../../selectors/tasks/task';
import { ServiceListItemComponent } from './service_list_item_component';
import { SendTaskServicesRequestAction } from '../../stores/services';
import { textStyles, colors, values } from '../../application/styles';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { ServiceListErrorComponent } from './service_list_error_component';

export interface ServiceListProps {
    readonly task: Task;
    readonly taskServices: TaskServices;
    readonly taskServicesError: TaskServicesError;
}

export interface ServiceListActions {
    readonly requestUpdateOfServicesForTask: (task: Task) => SendTaskServicesRequestAction;
}

export interface TaskServiceUpdater {
    readonly requestUpdateTaskServices: () => SendTaskServicesRequestAction;
}

type Props = ServiceListProps & ServiceListActions & TaskServiceUpdater;

interface ServiceItemInfo extends ListRenderItemInfo<Service> { }

export class ServiceListComponent extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.renderServiceListItem = this.renderServiceListItem.bind(this);
    }

    componentDidMount(): void {
        this.props.requestUpdateTaskServices();
    }

    render(): JSX.Element {
        return (
            this.props.taskServicesError ?
            <ServiceListErrorComponent error={this.props.taskServicesError} />
            :
            <FlatList
                style={{ backgroundColor: colors.lightGrey }}
                refreshing={this.props.taskServices.loading}
                onRefresh={this.props.requestUpdateTaskServices}
                data={this.props.taskServices.services}
                keyExtractor={(service: Service): string => service.id}
                renderItem={this.renderServiceListItem}
                ListEmptyComponent={ServiceListEmpty}
                ListHeaderComponent={<ServiceListHeaderComponent {...this.props} />}
            />
        );
    }

    renderServiceListItem({ item }: ServiceItemInfo): JSX.Element {
        return (
            <ServiceListItemComponent service={item} />
        );
    }
}

const ServiceListHeaderComponent = (props: Props): JSX.Element => (
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
            {props.task.title}
        </Text>
    </View>
);

function ServiceListEmpty(): JSX.Element {
    return <EmptyListComponent message={<Trans>No related services found</Trans>} />;
}
