import React from 'react';
import { Content, Grid, Row, Col, Button, Icon, Text } from 'native-base';
import { Trans } from '@lingui/react';

interface ExploreButtonProps {
    readonly name: string;
    readonly icon: string;
}

const ExploreButton = (props: ExploreButtonProps): JSX.Element => (
    <Col>
        <Content style={{ width: 100, margin: 15 }}>
            <Button block rounded style={{ height: 100, width: 100 }}>
                <Icon type='MaterialCommunityIcons' name={props.icon} style={{ fontSize: 60 }} />
            </Button>
            <Text style={{ width: 80, textAlign: 'center' }}><Trans>{props.name}</Trans></Text>
        </Content>
    </Col >
);

export interface Props {
}

export interface Actions {
}

export const Component: React.StatelessComponent<Props & Actions> = (_: Props & Actions): JSX.Element => (
    <Content>
        <Grid>
            <Row>
                <ExploreButton name='Settling in' icon='sign-direction' />
                <ExploreButton name='Education' icon='book-open-variant' />
                <ExploreButton name='Health care' icon='medical-bag' />
            </Row>
            <Row>
                <ExploreButton name='Money & banking' icon='currency-usd' />
                <ExploreButton name='Housing' icon='home' />
                <ExploreButton name='Employment' icon='briefcase' />
            </Row>
            <Row>
                <ExploreButton name='Legal system & immigration' icon='gavel' />
                <ExploreButton name='Driving' icon='car' />
                <ExploreButton name='Help for individuals & families' icon='account-group' />
            </Row>
        </Grid>
    </Content>
);
