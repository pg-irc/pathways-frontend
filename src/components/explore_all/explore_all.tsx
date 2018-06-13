import React from 'react';
import { Content, Grid, Row, Col, Button, Icon, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore';
import { Trans } from '@lingui/react';
import { paginate } from './paginate';

const ExploreButton = (props: ExploreSection): JSX.Element => (
    <Col>
        <Content style={{ width: 100, margin: 15 }}>
            <Button block rounded style={{ height: 100, width: 100 }}>
                <Icon type='MaterialCommunityIcons' name={props.icon} style={{ fontSize: 60 }} />
            </Button>
            <Text style={{ width: 80, textAlign: 'center' }}><Trans>{props.name}</Trans></Text>
        </Content>
    </Col >
);

interface ButtonRowProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

const ButtonRow = (props: ButtonRowProps): JSX.Element => (
    <Row>
        {props.sections.map((section: ExploreSection) => (
            <ExploreButton key={section.name} name={section.name} icon={section.icon} />
        ))}
    </Row>
);

export interface ExploreAllProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

export interface ExploreAllActions {
}

export const ExploreAllComponent: React.StatelessComponent<ExploreAllProps & ExploreAllActions> =
    (props: ExploreAllProps & ExploreAllActions): JSX.Element => {
        const sectionsGroupedIntoThrees = paginate(3, props.sections);
        return <Content>
            <Text>Learn about</Text>
            <Grid>
                {sectionsGroupedIntoThrees.map((sections: ReadonlyArray<ExploreSection>) => (
                    <Row>
                        <ButtonRow sections={sections} />
                    </Row>
                ))}
            </Grid>
        </Content>;
    };
