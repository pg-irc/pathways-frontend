import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { back, canGoBack } from 'redux-first-router';
import { Store } from '../../application/store';
import * as main from './main';
import * as pageSwitcher from '../../stores/page_switcher';
import { LoaderProps, withLoader } from './loader';
import { isApplicationLoading } from '../../selectors/application_loading';

const mapStateToProps = (store: Store): LoaderProps & main.Props => ({
    loading: isApplicationLoading(store),
    mainPageInProps: store.applicationState.mainPageInStore.mainPage,
    canGoBack: canGoBack(),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): main.Actions => ({
    goToQuestionnaire: (): pageSwitcher.SetMainPageAction => dispatch(pageSwitcher.setMainPage(pageSwitcher.Page.Questionnaire)),
    goToPlan: (): pageSwitcher.SetMainPageAction => dispatch(pageSwitcher.setMainPage(pageSwitcher.Page.MyPlan)),
    goToExplore: (): pageSwitcher.SetMainPageAction => dispatch(pageSwitcher.setMainPage(pageSwitcher.Page.ExploreAll)),
    goBack: (): void => back(),
});

type MainComponentProps = main.Props & main.Actions;
const MainComponent = withLoader<LoaderProps & MainComponentProps, MainComponentProps>(main.Component);
const connector = connect(mapStateToProps, mapDispatchToProps);
export const ConnectedComponent = connector(MainComponent);