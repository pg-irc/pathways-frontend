import React from 'react';
import { Content } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { CopyrightComponent } from './copyright';
import { IntroComponent } from './intro';
import { PersonalizeComponent } from './personalize';
import { MyToolsComponent } from './my_tools';
import { History } from 'history';

export interface HomePageProps {
    readonly history: History;
}

export const HomePageComponent: React.StatelessComponent<HomePageProps> = (props: HomePageProps): JSX.Element => {
    return (
        <Content padder style={applicationStyles.body} >
            <IntroComponent />
            <PersonalizeComponent history={props.history} />
            <MyToolsComponent history={props.history} />
            <CopyrightComponent />
        </Content >
    );
};
