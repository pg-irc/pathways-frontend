import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { View, Button, Content, Text } from 'native-base';
import { applicationStyles, colors } from '../../application/styles';
import { SetExploreSectionPageAction, SetExplorePageAction, SetTaskDetailPageAction, SetPlanPageAction } from '../../stores/page_switcher';
import { Id as TaskId, AddToSavedListAction } from '../../stores/tasks';
import { computeUniqueKeyForSections } from '../explore/compute_unique_key_for_sections';
import { ExploreSection } from '../../selectors/explore';
import { TaskListItem } from '../../selectors/tasks';
import { ExploreAllProps, ExploreAllActions, RowOfSectionButtons, SectionButton } from '../explore/explore_all';
import { TaskListComponent } from '../tasks/task_list';
import { CopyrightComponent } from '../copyright/copyright';

export interface HomePageProps extends ExploreAllProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
}
export interface HomePageActions extends ExploreAllActions {
    readonly goToExplorePage: () => SetExplorePageAction;
    readonly goToPlanPage: () => SetPlanPageAction;
    readonly goToTaskDetail: (taskId: TaskId) => SetTaskDetailPageAction;
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
}
type AllHomePageProps = I18nProps & HomePageProps & HomePageActions;

export const HomePageComponent: React.StatelessComponent<AllHomePageProps> = (props: AllHomePageProps): JSX.Element => {
    return (
        <Content padder>
            <Text style={applicationStyles.pageTitle}><Trans>How can we help you?</Trans></Text>
            <View style={applicationStyles.hr} />
            <Text style={applicationStyles.bold}><Trans>LEARN ABOUT</Trans></Text>
            <LearnSectionComponent {...props} />
            <View style={applicationStyles.hr} />
            <Text style={[applicationStyles.bold, { marginBottom: 10 }]}><Trans>PLAN FOR SUCCESS</Trans></Text>
            <TaskListComponent
                tasks={props.tasks}
                goToTaskDetail={props.goToTaskDetail}
                addToSavedList={props.addToSavedList}
                listItemStyle={{ backgroundColor: colors.lighterGrey }} />
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }]}>
                <Button
                    style={[{ backgroundColor: colors.darkGrey }]}
                    onPress={props.goToPlanPage}>
                    <Text><Trans>SEE MORE TASKS IN MY PLAN</Trans></Text>
                </Button>
            </View>
            <View style={applicationStyles.hr} />
            <CopyrightComponent />
        </Content>
    );
};

const LearnSectionComponent: React.StatelessComponent<AllHomePageProps> = (props: AllHomePageProps): JSX.Element => {
    const sectionsGroupedIntoFour = R.splitEvery(4, R.slice(0, 8, props.sections));
    return <View>
        {sectionsGroupedIntoFour.map((sections: ReadonlyArray<ExploreSection>) => (
            <RowOfSectionButtons
                key={computeUniqueKeyForSections(sections)}
                sections={sections}
                goToExploreSection={props.goToExploreSection}
                renderSectionButton={renderButton(props)}
            />
        ))}
    </View>;
};

const renderButton = R.curry((props: AllHomePageProps, section: ExploreSection): JSX.Element => {
    // TODO Improve the "more" functionality once designs are nailed down
    return section.id === 's8' ? renderMoreButton(props) : renderSectionButton(props, section);
});

const renderSectionButton = (props: AllHomePageProps, section: ExploreSection): JSX.Element => {
    const goToExploreSection = (): SetExploreSectionPageAction => props.goToExploreSection(section.id);
    const style = { height: 70 };
    const buttonProps = { onPress: goToExploreSection, buttonStyle: style, ...section };
    return <SectionButton {...buttonProps} />;
};

const renderMoreButton = (props: AllHomePageProps): JSX.Element => {
    const i18n = props.i18n;
    const goToExplorePage = (): SetExplorePageAction => props.goToExplorePage();
    const style = { height: 70 };
    const buttonProps = { onPress: goToExplorePage, icon: 'apps', name: i18n.t`More`, buttonStyle: style };
    return <SectionButton {...buttonProps} />;
};
