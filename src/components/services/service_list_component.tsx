// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import { Service } from '../../stores/services';
import { SelectorTaskServices, SelectorTaskServicesError, SelectorTaskServicesOrError } from '../../selectors/services/types';
import { isSelectorTaskServices } from '../../selectors/services/is_selector_task_services';
import { Task } from '../../selectors/tasks/task';
import { ServiceListItemComponent } from './service_list_item_component';
import { SendTaskServicesRequestAction } from '../../stores/services';
import { textStyles, colors, values } from '../../application/styles';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { ServiceListErrorComponent } from './service_list_error_component';
import { isSelectorTaskServicesError } from '../../selectors/services/is_selector_task_services_error';
import { EmptyComponent } from '../empty_component/empty_component';
import * as constants from '../../application/constants';

export interface ServiceListProps {
    readonly task: Task;
    readonly taskServicesOrError: SelectorTaskServicesOrError;
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
        if (isSelectorTaskServices(this.props.taskServicesOrError)) {
            return this.renderServiceList(this.props.taskServicesOrError);
        }
        if (isSelectorTaskServicesError(this.props.taskServicesOrError)) {
            return this.renderServiceListError(this.props.taskServicesOrError);
        }
        // TODO render loading here
        return <EmptyComponent />;
    }

    renderServiceList(selectorTaskServices: SelectorTaskServices): JSX.Element {
        return (
            <FlatList
                style={{ backgroundColor: colors.lightGrey }}
                refreshing={this.props.taskServicesOrError.type === constants.TASK_SERVICES_LOADING}
                onRefresh={this.props.requestUpdateTaskServices}
                data={selectorTaskServices.services}
                keyExtractor={(service: Service): string => service.id}
                renderItem={this.renderServiceListItem}
                ListEmptyComponent={ServiceListEmpty}
                ListHeaderComponent={< ServiceListHeaderComponent {...this.props} />}
            />
        );
    }

    renderServiceListItem({ item }: ServiceItemInfo): JSX.Element {
        return (
            <ServiceListItemComponent service={item} />
        );
    }

    renderServiceListError(selectorTaskServicesError: SelectorTaskServicesError): JSX.Element {
        return (
            <ServiceListErrorComponent error={selectorTaskServicesError} />
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
