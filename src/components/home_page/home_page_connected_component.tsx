import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { HomePageProps, HomePageActions, HomePageComponent } from './home_page';
import { selectExploreSections } from '../../selectors/explore';
import { selectRecommendedTasks } from '../../selectors/tasks';
import { Id as SectionId } from '../../stores/explore';
import { Id as TaskId } from '../../stores/tasks';
import {
    SetTaskDetailPageAction,
    setTaskDetailPage,
    SetExploreSectionPageAction,
    setExploreSectionPage,
    SetExplorePageAction,
    setExplorePage,
    SetPlanPageAction,
    setPlanPage,
    SetQuestionnairePageAction,
    setQuestionnairePage,
} from '../../stores/page_switcher';
import { AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { withI18n } from '@lingui/react';

const mapStateToProps = (store: Store): HomePageProps => ({
    tasks: selectRecommendedTasks(store),
    sections: selectExploreSections(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): HomePageActions => ({
    goToExploreSection: (sectionId: SectionId): SetExploreSectionPageAction => dispatch(setExploreSectionPage(sectionId)),
    goToExplorePage: (): SetExplorePageAction => dispatch(setExplorePage()),
    goToPlanPage: (): SetPlanPageAction => dispatch(setPlanPage()),
    goToQuestionnaire: (): SetQuestionnairePageAction => dispatch(setQuestionnairePage()),
    goToTaskDetail: (taskId: TaskId): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
    addToSavedList: (taskId: TaskId): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const HomePageConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withI18n()(HomePageComponent));
