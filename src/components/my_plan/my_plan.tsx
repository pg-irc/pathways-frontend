// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import * as R from 'ramda';
import { I18nManager, StyleSheet } from 'react-native';
import { Content, Text, View, Icon, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { applicationStyles, colors, values } from '../../application/styles';
import { CollapsibleContent } from '../collapsible_content/collapsible_content';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import {
    TaskListComponent,
    noTasksAddedYetTextComponent,
    noTasksRecommendedTextComponent,
    noTasksCompletedTextComponent,
} from '../tasks/task_list';
import { TaskListItemActions } from '../tasks/task_list_item';
import { RouterProps } from '../../application/routing';
import { MyPlanIntroComponent, EmptyMyPlanIntroComponent } from './my_plan_intro_component';

export interface MyPlanProps {
    readonly savedTasks: ReadonlyArray<TaskListItem>;
    readonly recommendedTasks: ReadonlyArray<TaskListItem>;
    readonly completedTasks: ReadonlyArray<TaskListItem>;
}

interface MyPlanState {
    readonly savedTasksIsCollapsed: boolean;
    readonly recommendedTasksIsCollapsed: boolean;
    readonly completedTasksIsCollapsed: boolean;
}

type Props = MyPlanProps & TaskListItemActions & RouterProps;

interface HasScrollToEnd {
    readonly scrollToEnd: () => void;
}

interface ContentComponentRef extends Content {
    readonly _root: HasScrollToEnd;
}

export class MyPlanComponent extends React.Component<Props, MyPlanState> {
    contentComponent: ContentComponentRef;

    constructor(props: Props) {
        super(props);
        this.state = {
            savedTasksIsCollapsed: false,
            recommendedTasksIsCollapsed: false,
            completedTasksIsCollapsed: true,
        };
        this.getCompletedButtonOnPress = this.getCompletedButtonOnPress.bind(this);
        this.toggleSavedTasksCollapsed = this.toggleSavedTasksCollapsed.bind(this);
        this.toggleRecommendedTasksCollapsed = this.toggleRecommendedTasksCollapsed.bind(this);
        this.toggleCompletedTasksCollapsed = this.toggleCompletedTasksCollapsed.bind(this);
    }

    render(): JSX.Element {
        return (
            <Content padder ref={(component: ContentComponentRef): ContentComponentRef => this.contentComponent = component}>
                <Header
                    completedCount={this.props.completedTasks.length}
                    completedButtonOnPress={this.getCompletedButtonOnPress}
                />
                <Intro {...this.props} />
                <CollapsibleContent
                    collapsedHeader={this.getHeading(this.getSavedTasksHeading(), this.collapsedIcon())}
                    expandedHeader={this.getHeading(this.getSavedTasksHeading(), this.expandedIcon())}
                    content={this.getContent(this.props.savedTasks, noTasksAddedYetTextComponent())}
                    onHeaderPress={this.toggleSavedTasksCollapsed}
                    isCollapsed={this.state.savedTasksIsCollapsed}
                />
                <View style={applicationStyles.divider} />
                <CollapsibleContent
                    collapsedHeader={this.getHeading(this.getRecommendedTasksHeading(), this.collapsedIcon())}
                    expandedHeader={this.getHeading(this.getRecommendedTasksHeading(), this.expandedIcon())}
                    content={this.getContent(this.props.recommendedTasks, noTasksRecommendedTextComponent(), styles.greyBackground)}
                    onHeaderPress={this.toggleRecommendedTasksCollapsed}
                    isCollapsed={this.state.recommendedTasksIsCollapsed}
                    style={styles.greyBackground}
                />
                <View style={applicationStyles.divider} />
                <CollapsibleContent
                    collapsedHeader={this.getHeading(this.getCompletedTasksHeading(), this.collapsedIcon())}
                    expandedHeader={this.getHeading(this.getCompletedTasksHeading(), this.expandedIcon())}
                    content={this.getContent(this.props.completedTasks, noTasksCompletedTextComponent(), styles.greyBackground)}
                    onHeaderPress={this.toggleCompletedTasksCollapsed}
                    isCollapsed={this.state.completedTasksIsCollapsed}
                    style={styles.greyBackground}
                />
            </Content>
        );
    }

    private expandedIcon(): string {
        return 'arrow-dropdown';
    }

    private collapsedIcon(): string {
        return I18nManager.isRTL ? 'arrow-dropleft' : 'arrow-dropright';
    }

    private getSavedTasksHeading(): JSX.Element {
        return (
            <View>
                <Text style={[applicationStyles.bold]}><Trans>MY TASKS</Trans></Text>
            </View>
        );
    }

    private getRecommendedTasksHeading(): JSX.Element {
        return (
            <View style={[{ flexDirection: 'row' }]}>
                <Text style={[applicationStyles.bold]}><Trans>RECOMMENDED FOR ME</Trans></Text>
                <Icon style={styles.icon} name='star-circle' type='MaterialCommunityIcons' />
            </View>
        );
    }

    private getCompletedTasksHeading(): JSX.Element {
        return (
            <View>
                <Text style={[applicationStyles.bold]}><Trans>COMPLETED TASKS</Trans></Text>
            </View>
        );
    }

    private getHeading(heading: JSX.Element, icon: string): JSX.Element {
        return (
            <View style={[styles.heading]}>
                {heading}
                <Icon style={styles.icon} name={icon} />
            </View>
        );
    }

    private getContent(tasks: ReadonlyArray<TaskListItem>, emptyTaskListComponent: JSX.Element, style?: object): JSX.Element {
        return (
            <TaskListComponent
                {...this.props}
                tasks={tasks}
                emptyTaskListComponent={emptyTaskListComponent}
                listItemStyle={style}
                savedTasksIdList={R.map((item: TaskListItem) => item.id, this.props.savedTasks)}
            />
        );
    }

    private getCompletedButtonOnPress(): void {
        this.expandCompletedTasks();
        this.contentComponent._root.scrollToEnd();
    }

    private expandCompletedTasks(): void {
        this.setState({ ...this.state, completedTasksIsCollapsed: false });
    }

    private toggleSavedTasksCollapsed(): void {
        this.setState({ ...this.state, savedTasksIsCollapsed: !this.state.savedTasksIsCollapsed });
    }

    private toggleRecommendedTasksCollapsed(): void {
        this.setState({ ...this.state, recommendedTasksIsCollapsed: !this.state.recommendedTasksIsCollapsed });
    }

    private toggleCompletedTasksCollapsed(): void {
        this.setState({ ...this.state, completedTasksIsCollapsed: !this.state.completedTasksIsCollapsed });
    }
}

interface HeaderProps {
    readonly completedCount: number;
}

interface HeaderActions {
    readonly completedButtonOnPress: () => void;
}

const Header: React.StatelessComponent<HeaderProps & HeaderActions> = (props: HeaderProps & HeaderActions): JSX.Element => {
    return (
        <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={[applicationStyles.pageTitle]}><Trans>My Plan</Trans></Text>
            <Button onPress={(): void => props.completedButtonOnPress()} rounded small style={[{ backgroundColor: colors.darkGrey }]}>
                <Text><Trans>COMPLETED</Trans> {props.completedCount}</Text>
            </Button>
        </View>
    );
};

const Intro: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    R.isEmpty(props.recommendedTasks) ? <EmptyMyPlanIntroComponent {...props} /> : <MyPlanIntroComponent {...props} />
);

const styles = StyleSheet.create({
    heading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        fontSize: values.smallIconSize,
    },
    greyBackground: {
        backgroundColor: colors.lighterGrey,
    },
});
