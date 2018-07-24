import React from 'react';
import { Container, Content, View, Icon, Text } from 'native-base';
import { ImageBackground } from 'react-native';
import { Trans } from '@lingui/react';
import { ExploreSection } from '../../selectors/explore';
import { TaskListComponent } from '../tasks/task_list';
import { Task } from '../../selectors/tasks';
import { RouterProps } from '../../application/routing';
import { colors } from '../../application/styles';
import { Id as TaskId, AddToSavedListAction } from '../../stores/tasks';

export interface ExploreSectionProps {
    readonly section: ExploreSection;
    readonly tasks: ReadonlyArray<Task>;
}

export interface ExploreSectionActions {
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
}

type AllExploreSectionProps = ExploreSectionProps & ExploreSectionActions & RouterProps;

export const ExploreSectionComponent: React.StatelessComponent<AllExploreSectionProps> =
    (props: AllExploreSectionProps): JSX.Element => {
        return <Container>
            <Content padder>
                <View style={[
                    {
                        flexDirection: 'column',
                        alignItems: 'stretch',
                    }]} >
                    <TitleComponent {...props} />
                    <IntroductionComponent {...props} />
                    <TaskListComponent {...props} tasks={props.tasks} />
                </View>
            </Content>
        </Container >;
    };

// tslint:disable-next-line:no-var-requires
const sectionImage = require('../../../assets/images/icon.png');

const TitleComponent: React.StatelessComponent<AllExploreSectionProps> = (props: AllExploreSectionProps): JSX.Element => (
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
                { backgroundColor: 'rgba(0,0,0,0.4)' },
            ]}>
                <IconComponent {...props} />
                <TitleTextComponent {...props} />
                <HeartButton />
                <ShareButton />
            </View>
        </ImageBackground>
    </View>
);

const IconComponent: React.StatelessComponent<AllExploreSectionProps> = (props: AllExploreSectionProps): JSX.Element => (
    <Icon type='MaterialCommunityIcons' name={props.section.icon} style={[
        { color: colors.white },
        { fontSize: 40 },
        { marginTop: 20 },
        { marginLeft: 20 },
        { marginRight: 20 },
        { marginBottom: 20 },
        { alignSelf: 'center' },
    ]} />
);

const TitleTextComponent: React.StatelessComponent<AllExploreSectionProps> = (props: AllExploreSectionProps): JSX.Element => (
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
        ]}><Trans>LEARN ABOUT</Trans></Text>
        <Text style={[
            { color: colors.white },
            { fontSize: 30 },
            { fontWeight: 'bold' },
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

const IntroductionComponent: React.StatelessComponent<AllExploreSectionProps> = (props: AllExploreSectionProps): JSX.Element => (
    <Text style={[
        { marginTop: 20 },
        { marginLeft: 20 },
        { marginRight: 20 },
        { marginBottom: 20 },
    ]}>{props.section.introduction}</Text>
);
