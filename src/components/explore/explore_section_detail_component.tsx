import React from 'react';
import { Container, Content, View, Icon, Text } from 'native-base';
import { ImageBackground } from 'react-native';
import { Trans } from '@lingui/react';
import { ExploreSection } from '../../selectors/explore/types';
import { TaskListComponent, noTasksAddedYetTextComponent } from '../tasks/task_list_component';
import { RouterProps } from '../../application/routing';
import { colors } from '../../application/styles';
import { Id as TaskId, AddToSavedListAction } from '../../stores/tasks';
import { EmptyComponent } from '../empty_component/empty_component';
import { Task } from '../../selectors/tasks/task';
import { ExpandableText } from '../expandable_text/expandable_text';

export interface ExploreSectionDetailProps {
    readonly section: ExploreSection;
    readonly tasks: ReadonlyArray<Task>;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
}

export interface ExploreSectionDetailActions {
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
}

type Props = ExploreSectionDetailProps & ExploreSectionDetailActions & RouterProps;

export const ExploreSectionDetailComponent: React.StatelessComponent<Props> =
    (props: Props): JSX.Element => {
        return <Container>
            <Content padder>
                <View style={[
                    { flexDirection: 'column' },
                    { alignItems: 'stretch' },
                ]} >
                    <TitleComponent {...props} />
                    <IntroductionComponent {...props} />
                    <Text style={[{ fontWeight: 'bold', textAlign: 'left', fontSize: 20 }]}>
                        <Trans>Tasks:</Trans>
                    </Text>
                    <TaskListComponent {...props} tasks={props.tasks} emptyTaskListComponent={noTasksAddedYetTextComponent()} />
                </View>
            </Content>
        </Container >;
    };

// tslint:disable-next-line:no-var-requires
const sectionImage = require('../../../assets/images/icon.png');

const TitleComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View>
        <ImageBackground
            source={sectionImage}
            style={[
                { width: '100%' },
            ]}>
            <View style={[
                { flexDirection: 'row' },
                { alignItems: 'stretch' },
                { marginTop: 120 },
                { backgroundColor: colors.darkGreyWithAlpha },
            ]}>
                <IconComponent {...props} />
                <TitleTextComponent {...props} />
                {false ? <HeartButton /> : <EmptyComponent />}
                {false ? <ShareButton /> : <EmptyComponent />}
            </View>
        </ImageBackground>
    </View>
);

const IconComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <Icon type='FontAwesome' name={props.section.icon} style={[
        { color: colors.white },
        { fontSize: 40 },
        { marginTop: 20 },
        { marginLeft: 20 },
        { marginRight: 20 },
        { marginBottom: 20 },
        { alignSelf: 'center' },
    ]} />
);

const TitleTextComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View style={[
        { flex: 1 },
        { flexDirection: 'column' },
        { alignItems: 'flex-start' },
        { marginTop: 20 },
        { marginLeft: 0 },
        { marginRight: 20 },
        { marginBottom: 20 },
    ]}>
        <Text style={[
            { color: colors.white },
            { fontWeight: 'bold' },
            { textAlign: 'left' },
        ]}><Trans>LEARN ABOUT</Trans></Text>
        <Text style={[
            { color: colors.white },
            { fontSize: 30 },
            { fontWeight: 'bold' },
            { textAlign: 'left' },
        ]}>{props.section.name}</Text>
    </View>
);

const HeartButton: React.StatelessComponent = (): JSX.Element => (
    <Icon type='MaterialCommunityIcons' name='heart-outline' style={[
        { color: colors.white },
        { marginTop: 20 },
        { marginLeft: 0 },
        { marginRight: 20 },
        { marginBottom: 20 },
        { alignSelf: 'flex-end' },
    ]} />
);

const ShareButton: React.StatelessComponent = (): JSX.Element => (
    <Icon name='share' style={[
        { color: colors.white },
        { marginTop: 20 },
        { marginLeft: 0 },
        { marginRight: 20 },
        { marginBottom: 20 },
        { alignSelf: 'flex-end' },
    ]} />
);

const IntroductionComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View style={[
        { marginTop: 20 },
        { marginLeft: 20 },
        { marginRight: 20 },
        { marginBottom: 20 },
    ]}>
        <ExpandableText text={props.section.introduction} />
    </View>
);
