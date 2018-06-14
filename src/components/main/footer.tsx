import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import * as store from '../../stores/page_switcher';

export interface Props {
    readonly currentPageInProps: store.Store;
}

export interface Actions {
    readonly goToQuestionnaire: () => void;
    readonly goToPlan: () => void;
    readonly goToExplore: () => void;
}

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    const { goToQuestionnaire, goToPlan, goToExplore, currentPageInProps }: Props & Actions = props;
    return (
        <Footer>
            <FooterTab>
                <Button vertical active={currentPageInProps.pageType === store.Page.Questionnaire} onPress={goToQuestionnaire}>
                    <Icon name='apps' />
                    <Text>Questionnaire</Text>
                </Button>
                <Button vertical active={currentPageInProps.pageType === store.Page.MyPlan} onPress={goToPlan}>
                    <Icon name='camera' />
                    <Text>My plan</Text>
                </Button>
                <Button vertical active={currentPageInProps.pageType === store.Page.ExploreAll} onPress={goToExplore}>
                    <Icon active name='apps' />
                    <Text>Learn</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};
