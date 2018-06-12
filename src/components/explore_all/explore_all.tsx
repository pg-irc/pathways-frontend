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

interface ExploreButtonRowProps {
    readonly sections: ReadonlyArray<ExploreButtonProps>;
}

const ExploreButtonRow = (props: ExploreButtonRowProps): JSX.Element => (
    <Row>
        {props.sections.map((section: ExploreButtonProps) => {
            return <ExploreButton key={section.name} name={section.name} icon={section.icon} />;
        })}
    </Row>
);

export interface Props {
}

export interface Actions {
}

export const Component: React.StatelessComponent<Props & Actions> = (_: Props & Actions): JSX.Element => (
    <Content>
        <Grid>
            <Row>
                <ExploreButtonRow sections={[
                    { name: 'Settling in', icon: 'sign-direction' },
                    { name: 'Education', icon: 'book-open-variant' },
                    { name: 'Health care', icon: 'medical-bag' },
                ]} />
            </Row>
            <Row>
                <ExploreButtonRow sections={[
                    { name: 'Money & banking', icon: 'currency-usd' },
                    { name: 'Housing', icon: 'home' },
                    { name: 'Employment', icon: 'briefcase' },
                ]} />
            </Row>
            <Row>
                <ExploreButtonRow sections={[
                    { name: 'Legal system & immigration', icon: 'gavel' },
                    { name: 'Driving', icon: 'car' },
                    { name: 'Help for individuals & families', icon: 'account-group' },
                ]} />
            </Row>
        </Grid>
    </Content>
);
