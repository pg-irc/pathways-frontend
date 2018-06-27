// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { I18nManager } from 'react-native';
import { Container, Content, Text, View, Col, Row, Grid, Button, Icon } from 'native-base';
import { ConnectedSavedTasks } from '../tasks/connected_saved_tasks';
import { ConnectedSuggestedTasks } from '../tasks/connected_suggested_tasks';
import { Trans } from '@lingui/react';
import { applicationStyles } from '../../application/styles';
import { myPlanStyles } from './styles';
import { Collapser } from '../collapser/collapser';
import { taskStyles } from '../tasks/styles';

export const MyPlan: React.StatelessComponent = (): JSX.Element => (
    <Container>
        <Content padder>
            <Text style={applicationStyles.pageTitle}><Trans>My Plan</Trans></Text>
            <Collapser
                collapsedHeader={getHeaderForSavedTasks(true)}
                expandedHeader={getHeaderForSavedTasks(false)}
                content={<ConnectedSavedTasks />}
                initiallyCollapsed={false}
            />
            <View style={myPlanStyles.divider} />
            <Collapser
                collapsedHeader={getHeaderForSuggestedTasks(true)}
                expandedHeader={getHeaderForSuggestedTasks(false)}
                content={<ConnectedSuggestedTasks style={taskStyles.suggestedListItem}/>}
                initiallyCollapsed={true}
                style={myPlanStyles.suggestedTasks}
            />
        </Content>
    </Container>
);

const getHeaderForSavedTasks = (collapsed: boolean): JSX.Element => (
    <Grid>
        <Row>
            <Col size={85} >
                <Row style={myPlanStyles.listItemLabel}>
                    <Text style={applicationStyles.bold}><Trans>TASKS I PLAN TO DO</Trans></Text>
                    <Icon style={myPlanStyles.icon} name={getIconNameForCollapsible(collapsed)} />
                </Row>
            </Col>
            <Col size={15}>
                <Button dark transparent><Icon name='more' /></Button>
            </Col>
        </Row>
    </Grid>
);

const getHeaderForSuggestedTasks = (collapsed: boolean): JSX.Element => (
    <Grid>
        <Row>
            <Col size={85} >
                <Row style={myPlanStyles.listItemLabel}>
                    <Text style={applicationStyles.bold}><Trans>RECOMMENDED FOR ME</Trans></Text>
                    <Icon style={myPlanStyles.icon} name='star-circle' type='MaterialCommunityIcons'/>
                    <Icon style={myPlanStyles.icon} name={getIconNameForCollapsible(collapsed)} />
                </Row>
            </Col>
            <Col size={15}>
                <Button dark transparent><Icon name='more' /></Button>
            </Col>
        </Row>
        <Row>
            <Col size={85}>
                <Row>
                    <Text style={myPlanStyles.recommendedText}>Important for all newcomers to BC:</Text>
                </Row>
            </Col>
            <Col size={15}>
                <Icon style={myPlanStyles.infoIcon} name='information-outline' type='MaterialCommunityIcons'/>
            </Col>
        </Row>
    </Grid>
);

const getIconNameForCollapsible = (collapsed: boolean): string => {
    if (collapsed) {
        return I18nManager.isRTL ? 'arrow-dropleft' : 'arrow-dropright';
    }

    return 'arrow-dropdown';
};