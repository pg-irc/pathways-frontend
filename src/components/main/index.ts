import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { back, canGoBack } from 'redux-first-router';
import { Store } from '../../application/store';
import * as main from './main';
import { LoaderProps, withLoader } from './loader';
import { isApplicationLoading } from '../../selectors/application_loading';
import * as pageSwitcher from '../../stores/page_switcher';
import { selectLocale } from '../../selectors/locale';

const mapStateToProps = (store: Store): LoaderProps & main.Props => ({
    currentLocale: selectLocale(store),
    loading: isApplicationLoading(store),
    locale: selectLocale(store),
    currentPageInProps: store.applicationState.currentPageInStore.currentPage,
    currentPageParameters: store.applicationState.currentPageInStore.pageParameters,
    tasksStore: store.applicationState.tasksInStore,
    appStore: store,
    canGoBack: canGoBack(),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): main.Actions => ({
    goToQuestionnaire: (): pageSwitcher.SetQuestionnairePageAction => dispatch(pageSwitcher.setQuestionnairePage()),
    goToPlan: (): pageSwitcher.SetPlanPageAction => dispatch(pageSwitcher.setPlanPage()),
    goToExplore: (): pageSwitcher.SetExplorePageAction => dispatch(pageSwitcher.setExplorePage()),
    goBack: (): void => back(),
});

type MainComponentProps = main.Props & main.Actions;
const MainComponent = withLoader<MainComponentProps>(main.Component);
const connector = connect(mapStateToProps, mapDispatchToProps);
export const ConnectedComponent = connector(MainComponent);
